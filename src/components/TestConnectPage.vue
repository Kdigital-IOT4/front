<template>
  <div>
    <h1>Socket 테스트</h1>

    <input v-model="machineIp" type="text" class="input-field" placeholder="머신 IP를 입력하세요" />
    
    <button @click="setIp" class="button">등록</button>

    <p>
      <button @click="startSocket">Socket 시작</button>
    </p>

    <div class="msgbox"></div>
    <button @click="send1">1 Y 0</button>
    <button @click="send1Y">1 올리기</button>
    <button @click="send2">2 Y 0</button>
    <button @click="send2Y">2 올리기</button>
    <button @click="send3">3 Y 0</button>
    <button @click="send3Y">3 올리기</button>
    <button @click="send4">4 Y 0</button>
    <button @click="send4Y">4 올리기</button>
    <button @click="sendReset">원점</button>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import { useControllerStore } from '@/stores/controller';

export default defineComponent({
  name: 'SocketTest',
  data() {
    return {
      machineIp: '',
    };
  },
  methods: {
    setIp() {
      useControllerStore().setMachineIp(this.machineIp);
    },
    startSocket() {
      useControllerStore().startSocket();
    },
    sendCommand(command) {
      const controllerStore = useControllerStore();
      if (controllerStore.connected && controllerStore.wsSource) {
        controllerStore.sendCommand(command);
      } else {
        console.error('WebSocket is not connected.');
      }
    },
    send1() {
      this.sendCommand('$J=G53X0Y1100Z0F20000');
    },
    send1Y() {
      this.sendCommand('J=G53X0Y1100Z900F15000');
    },
    send2() {
      this.sendCommand('J=G53X800Y1100Z0F20000');
    },
    send2Y() {
      this.sendCommand('J=G53X800Y1100Z900F15000');
    },
    send3() {
      this.sendCommand('J=G53X1600Y1100Z0F20000');
    },
    send3Y() {
      this.sendCommand('J=G53X1600Y1100Z900F15000');
    },
    send4() {
      this.sendCommand('J=G53X2350Y1100Z0F20000');
    },
    send4Y() {
      this.sendCommand('J=G53X2350Y1100Z900F15000');
    },
    sendReset() {
      this.sendCommand('$J=G53X0Y0Z0F20000');
    },
  },
});

</script>
