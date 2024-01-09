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
    <input v-model="messageInput" placeholder="Enter message" />
    <button @click="sendMessage">Send Message</button>
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

    const sendMessage = () => {
      // Directly handle sending the message without using controllerStore.sendMessage
      if (controllerStore.connected && controllerStore.wsSource) {
        controllerStore.sendCommand("J=G53X100Y0Z0F10000");
      } else {
        console.error('WebSocket is not connected.');
      }
      // Clear the input field after sending the message
      messageInput = '';
    };

    return {
      controllerStore,
      messageInput,
      startSocket,
      sendMessage,
    };
  },
});
</script>
