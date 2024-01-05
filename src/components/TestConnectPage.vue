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
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useControllerStore } from '@/stores/controller'; // 정확한 store 경로로 수정

export default defineComponent({
  name: 'SocketTest',
  setup() {
    const controllerStore = useControllerStore();

    const startSocket = async () => {
      // 사용할 경우: await controllerStore.startSocket();
      controllerStore.startSocket(); // 비동기 처리가 필요하지 않다면 이것으로 충분
    };

    return {
      controllerStore,
      startSocket,
    };
  },
});
</script>