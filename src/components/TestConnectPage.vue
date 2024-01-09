<template>
  <div>
    <h1>Socket 테스트</h1>
    <p>
      <button @click="startSocket">Socket 시작</button>
    </p>
    <p>
      연결 상태: {{ controllerStore.connected }}
    </p>
    <p>
      메시지: {{ controllerStore.wsmsg }}
    </p>
    <div class="msgbox"></div>
    <button @click="sendX100">x : 100</button>
    <button @click="sendMX100">x : -100</button>
    <button @click="sendZ100">z : 100</button>
    <button @click="sendMZ100">z : -100</button>
    <button @click="sendMZ100">reset</button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useControllerStore } from '@/stores/controller';

export default defineComponent({
  name: 'SocketTest',
  setup() {
    const controllerStore = useControllerStore();
    let messageInput = '';

    const startSocket = async () => {
      controllerStore.startSocket();
    };

    const sendX100 = () => {
    if (controllerStore.connected && controllerStore.wsSource) {
            controllerStore.sendCommand("J=G53X100Y0Z0F10000");
          } else {
            console.error('WebSocket is not connected.');
          }
    };
    const sendMX100 = () => {
    if (controllerStore.connected && controllerStore.wsSource) {
            controllerStore.sendCommand("J=G53X-100Y0Z0F10000");
          } else {
            console.error('WebSocket is not connected.');
          }
    };
    const sendZ100 = () => {
    if (controllerStore.connected && controllerStore.wsSource) {
            controllerStore.sendCommand("J=G53X0Y0Z100F10000");
          } else {
            console.error('WebSocket is not connected.');
          }
    };
    const sendMZ100 = () => {
    if (controllerStore.connected && controllerStore.wsSource) {
            controllerStore.sendCommand("J=G53X0Y0Z-100F10000");
          } else {
            console.error('WebSocket is not connected.');
          }
    };
    const sendReset = () => {
    if (controllerStore.connected && controllerStore.wsSource) {
            controllerStore.sendCommand("$J=G28");
          } else {
            console.error('WebSocket is not connected.');
          }
    };


    

    return {
      controllerStore,
      messageInput,
      startSocket,
      sendX100,
      sendMX100,
      sendZ100,
      sendMZ100,
      sendReset,
    };
  },
});
</script>
