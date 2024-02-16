import { defineStore } from "pinia";

export const useControllerStore = defineStore("controllerStore", {
  state: () => {
    return {
      machineIp: "",
      port: 81,
      wsSource: null,
      wsmsg: "",
      xPos: 0,
      yPos: 0,
      zPos: 0,
      feedrate: 70000,
      xLength: 50,
      yLength: 50,
      zLength: 50,
      msgData: null,
      connected: true,
      positionNo: 0,
      positionList: [],
    };
  },
  actions: {
    setMachineIp(machineIp) {
      this.machineIp = machineIp;
    },

    onOpen(e) {
      console.log("Connected");
      this.connected = true;
      console.log(e);
    },

    async startSocket() {
      // this.ip = localStorage.ip
      try {
        console.log("Socket is " + this.machineIp + ":" + this.port);
        this.wsSource = await new WebSocket(
          "ws://" + this.machineIp + ":" + this.port,
          ["arduino"]
        );
      } catch (exception) {
        console.error(exception);
      }
      this.wsSource.binaryType = "arraybuffer";
      this.wsSource.onopen = this.onOpen;
      this.wsSource.onclose = function (e) {
        console.log("Disconnected");
        this.connected = false;
        console.log(e);
        // setTimeout(this.startSocket, 3000);
      };
      this.wsSource.onerror = function (e) {
        console.log("ws error", e);
      };
      this.wsSource.onmessage = this.onMessage;
      console.log(this.wsSource);
    },
    async sendCommand(value) {
      console.log(this.ip);
      await fetch(
        `http://${this.machineIp}/command?` +
          new URLSearchParams({
            commandText: value,
          })
      )
        .then((response) => {
          const reader = response.body.getReader();
          if (response.body.locked) {
            console.log("Response body is locked!");
          }
          return new ReadableStream({
            start(controller) {
              return pump();
              function pump() {
                return reader.read().then(({ done, value }) => {
                  // When no more data needs to be consumed, close the stream
                  if (done) {
                    controller.close();
                    return;
                  }
                  // Enqueue the next data chunk into our target stream
                  controller.enqueue(value);
                  return pump();
                });
              }
            },
          });
        })
        .catch((error) => {
          // Log and handle the error
          console.error("Error occurred:", error);
        });
    },
  },
});
