<template>
  <div class="root_container">
    <div class="card">
    <h1 class="neon-text">머신 IP 설정</h1>
    <p v-if="!machineIp">머신 IP를 등록하세요</p>
    <p v-else>현재 머신 IP: {{ machineIp }}</p>
    
    <input v-model="machineIp" type="text" class="input-field" placeholder="머신 IP를 입력하세요" />
    
    <button @click="setIp" class="button">등록</button>
    <button @click="backMainPage()" class="button">돌아가기</button>
  </div>
  </div>

</template>

<script>
import { useControllerStore } from "@/stores/controller";

export default {
  data() {
    return {
      show: false,
      machineIp:"",
    };
  },
  methods: {
    backMainPage(){
      this.$router.push('/machine');
    },
    getIp(){
        this.machineIp = useControllerStore().machineIp;
    },
    setIp(){
        useControllerStore().setMachineIp(this.machineIp);
    },
  },
  mounted() {
    this.getIp();
  },
};
</script>


<style>

.root_container{
  display: flex;
  align-items: center;
  justify-content: center;  
  max-height: 600px;
}
.card {
  background-color: #282c34;
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  margin: 0 auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  text-align: center;
}

/* 네온 테두리 */
.card::before,
.card::after {
  content: "";
  position: absolute;
  top: -10px;
  left: -10px;
  width: calc(100% + 20px);
  height: calc(100% + 20px);
  border-radius: 10px;
  box-shadow: 0 0 20px 5px rgba(0, 255, 255, 0.8);
  z-index: -1;
}

.neon-text {
  color: #00ff00;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.8);
}


.input-field {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
}


.button {
  margin: 10px 0;
  padding: 10px 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #333;
  color: #fff;
  cursor: pointer;
}
.button{
  margin-right: 1rem;
}
.button:hover {
  background-color: #444;
}
</style>