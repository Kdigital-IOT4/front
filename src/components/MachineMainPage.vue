<template>
  <div class="container-hed">
    <router-link to="/CocktailMachinePreviewPage" class="HedBtn1"></router-link>
    <router-link to="/BaseRegistrationPage" class="HedBtn2"></router-link>
    <router-link to="/StuffRegistrationPage" class="HedBtn3"></router-link>
    <div></div>
    <button class="HedBtn4" @click="OnModal"></button>
  </div>
 
  <div class="container-MachineInfo">
    <div class="MachinInfo">
      <h1>{{ machineInfo.name }}</h1>
      <p>{{ machineInfo.info }}</p>
    </div>
    <machine-start-modal class="Modal" v-show="show" v-on:close="OnModal"></machine-start-modal>
  </div>

  <router-link to="/" class="HomeBtn">홈</router-link>
</template>

<script>
import MachineStartModal from './MachineStartModal.vue';
import axios from 'axios';
import { useMachineStore } from "@/stores/store";

export default {
  components: { MachineStartModal },
  data() {
    return {
      show: false,
      machineId: useMachineStore().machineId,
      machineData: null, // machineData를 초기화
    };
  },
  computed: {
    machineInfo() {
      // 여기에 다른 필요한 로직 추가
      return {
        name: this.machineId || "Default Machine Name",
        info: "Machine Information",
      };
    },
  },
  methods: {
    OnModal() {
      this.show = !this.show;
    },

    async getMachineData() {
      try {
        // 수정된 부분: 데이터를 서버에 보냅니다.
        const response = await axios.post('http://localhost:8080/api/v1/machine/data/read', {
          machineId: this.machineId,
        });

        // 응답을 콘솔에 출력합니다.
        console.log('Server Response:', response.data);

        // 응답 데이터를 컴포넌트 상태에 저장합니다.
        this.machineData = response.data;
      } catch (error) {
        console.error('Error:', error);
      }
    },
  },
  mounted() {
    // 컴포넌트가 마운트되면서 바로 getMachineData를 호출합니다.
    this.getMachineData();
  },
};

</script>

<style>

.MachinInfo{
  background: gray;
  position:fixed;
  left: 45em;
  top:25em;
  width: 50%;
  height: 50%;
  transform: translate(-50%, -50%);
}

.HomeBtn{
  position:fixed;
  left:85em;
  top:45em;
  background: gray;
  transform: translate(-50%, -50%);
  width: 5em;
  height: 3em;
  padding-top: 2em;
}
</style>