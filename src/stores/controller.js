
import { defineStore } from 'pinia'
// import {
  // addDoc,
  // collection,
  // getDocs,
  // query,
  // where,
  // doc,
  // deleteDoc,
  // getDoc,
  // updateDoc,
  // setDoc,
  // serverTimestamp
// } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { db, auth, storage } from "../firebaseConfig";
// import router from "../router";
// import { useUserStore } from "@/stores/user";
// import { cloneDeep } from "lodash"
// import { useOrderStore } from "@/stores/order";

export const useControllerStore = defineStore('controllerStore', {
  state: () => ({
    documents: [
      { no: 1, x: 1, y: 1, load: false, empty: true, bottle: null, selected: false },
      { no: 2, x: 2, y: 1, load: false, empty: true, bottle: null, selected: false },
      { no: 3, x: 3, y: 1, load: false, empty: true, bottle: null, selected: false },
      { no: 4, x: 4, y: 1, load: false, empty: true, bottle: null, selected: false },
      { no: 5, x: 5, y: 1, load: false, empty: true, bottle: null, selected: false },
      { no: 6, x: 6, y: 1, load: false, empty: true, bottle: null, selected: false },
      { no: 7, x: 7, y: 1, load: false, empty: true, bottle: null, selected: false },
      { no: 8, x: 8, y: 1, load: false, empty: true, bottle: null, selected: false },
      { no: 9, x: 9, y: 1, load: false, empty: true, bottle: null, selected: false },
      { no: 10, x: 10, y: 1, load: false, empty: true, bottle: null, selected: false },
      { no: 11, x: 1, y: 2, load: false, empty: true, bottle: null, selected: false },
      { no: 12, x: 2, y: 2, load: false, empty: true, bottle: null, selected: false },
      { no: 13, x: 3, y: 2, load: false, empty: true, bottle: null, selected: false },
      { no: 14, x: 4, y: 2, load: false, empty: true, bottle: null, selected: false },
      { no: 15, x: 5, y: 2, load: false, empty: true, bottle: null, selected: false },
      { no: 16, x: 6, y: 2, load: false, empty: true, bottle: null, selected: false },
      { no: 17, x: 7, y: 2, load: false, empty: true, bottle: null, selected: false },
      { no: 18, x: 8, y: 2, load: false, empty: true, bottle: null, selected: false },
      { no: 19, x: 9, y: 2, load: false, empty: true, bottle: null, selected: false },
      { no: 20, x: 10, y: 2, load: false, empty: true, bottle: null, selected: false },
    ],
    xTotal: 10,
    yTotal: 2,
    /*    ip: '192.168.45.77', */
    ip: null,
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
    positionList: [
    ]
  }),
  actions: {

    async controlPositionNext() {
      this.positionNo++
      if (this.positionNo < this.positionList.length) {
        const value = `$J=G53X${this.positionList[this.positionNo].x}Y${this.positionList[this.positionNo].y}Z${this.positionList[this.positionNo].z}F${this.positionList[this.positionNo].feedrate}`
        this.sendCommand(value)
        if (this.positionList[this.positionNo].pauseTime > 0) {
          const value = `$J=G53X${this.positionList[this.positionNo].x}Y${this.positionList[this.positionNo].y}Z${this.positionList[this.positionNo].z - 1}F${100}`
          this.sendCommand(value)
        }
      } else if (this.positionNo == this.positionList.length) {
        // const value = `$J=G53X0Y0Z0F10000`
        const value = `$J=G28` // 홈으로 이동
        this.sendCommand(value)
      } else {
        console.log('end')
        this.positionNo = 0
        return
      }
    },

    async onMessage(e) {
      console.log(e.data)
      this.msgData = e.data
      var msg = "";
      if (e.data instanceof ArrayBuffer) {
        /* console.log("arrayBuffer") */
        var bytes = new Uint8Array(e.data);
        for (var i = 0; i < bytes.length; i++) {
          msg += String.fromCharCode(bytes[i]);
          if (bytes[i] == 10 || bytes[i] == 13) {
            this.wsmsg = msg.replace("\r", "");
            if (this.wsmsg.startsWith("<")) {
              console.log(this.wsmsg)
              var tempV1 = this.wsmsg.substring(1, this.wsmsg.length - 2)
              // console.log(tempV1)
              var tempV2 = tempV1.split("|");
              // console.log(tempV2)
              var tempV3 = tempV2[1].split("MPos:")
              // console.log(tempV3)
              var tempV4 = tempV3[1].split(",")
              // console.log(tempV4)
              this.xPos = Number(tempV4[0])
              this.yPos = Number(tempV4[1])
              this.zPos = Number(tempV4[2])
            }
          } else {
            this.wsmsg = msg.replace("\r", "");
            // console.log(this.wsmsg)
          }
        }
        console.log(this.wsmsg)
        if (this.wsmsg.startsWith('o')) {
          this.controlPositionNext()
        }
      }
    },

    onOpen(e) {
      console.log("Connected");
      this.connected = true
      console.log(e)
    },


    async startSocket() {
      // this.ip = localStorage.ip
      try {
        console.log("Socket is " + "172.30.1.78" + ":" + this.port);
        this.wsSource = await new WebSocket("ws://" + "172.30.1.78" + ":" + this.port, [
          "arduino",
        ]);
      } catch (exception) {
        console.error(exception);
      }
      this.wsSource.binaryType = "arraybuffer";
      this.wsSource.onopen = this.onOpen
      this.wsSource.onclose = function (e) {
        console.log("Disconnected");
        this.connected = false
        console.log(e)
        // setTimeout(this.startSocket, 3000);
      };
      this.wsSource.onerror = function (e) {
        console.log("ws error", e);
      };
      this.wsSource.onmessage = this.onMessage
      console.log(this.wsSource)
    },
    async sendCommand(value) {
      console.log(this.ip)
      await fetch(`http://${this.ip}/command?` + new URLSearchParams(
        {
          commandText: value
        }))
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
    },
    async controlPosition(x, y, z, feedrate) {
      this.positionList = []
      const value = `$J=G53X${x}Y${y}Z${z}F${feedrate}` // G53 절대좌표계 기준값으로 이동 / G91 주는 값만큼 이동

      await this.sendCommand(value)
    },



    async controlPositionFirst() {
      const value = `$J=G53X${this.positionList[0].x}Y${this.positionList[0].y}Z${this.positionList[0].z}F${this.positionList[0].feedrate}`
      await this.sendCommand(value)
    },


    async chainingChangePosition(item) {
      this.positionList = []
      this.positionList.push(
        { x: 0, y: 0, z: 0, feedrate: this.feedrate, pauseTime: 0 })
      item.cocktailDetailList.forEach(async (item) => {
        var result = this.documents.filter(doc => doc.bottle?.code == item.code)[0]
        if (result) {
          this.positionList.push(
            { x: result.x*800, y: result.y*0, z: 0, feedrate: this.feedrate, pauseTime: 0 })
          this.positionList.push(
            { x: result.x*800, y: result.y*0, z: -300, feedrate: this.feedrate, pauseTime: 0 })
          this.positionList.push(
            { x: result.x*800, y: result.y*0, z: 0, feedrate: this.feedrate, pauseTime: 0 })
        }
      })
      this.positionList.push(
        { x: 0, y: 0, z: 0, feedrate: this.feedrate, pauseTime: 0 })
        console.log(this.positionList)
      await this.controlPositionNext()
     // await this.controlPosition(0, 0, 0, this.feedrate)
      
    }
    
  },
});
