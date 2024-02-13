<template>
  <div class="container-hed">
    <router-link to="/CocktailMachinePreviewPage" class="HedBtn1"></router-link>
    <router-link to="/BaseRegistrationPage" class="HedBtn2"></router-link>
    <router-link to="/StuffRegistrationPage" class="HedBtn3"></router-link>
    <div></div>
    <button class="HedBtn4" @click="OnModal"></button>
  </div>
 
    <div class="MachinInfo_container">
      <div class="machine_id">
        <h1>{{ machineInfo.name }}</h1>
      </div>
      
      <ul class="baseList_container">
        <li v-for="base in machineData.baseList" :key="base.base_seq" class="baseList_box">
            <div class="baseList_box_img">
              <img :src="base.imgURL" alt="Base Image" width="200" height="200">
            </div>
            <div class="baseList_box_content">
              <div class="baseList_box_content_name">
                <span class="base_name">{{ base.kr_Name }} - {{ base.en_Name }}</span>
              </div>
              <div class="baseList_box_content_content">
                <p>Price: {{ base.price }}</p>
                <p>Alcohol: {{ base.alcohol }}</p>
                <p> Amount: {{ base.amount }}</p>
                <p>{{ base.content }}</p>
                <p></p>
              </div>
          </div>
        </li>
      </ul>
    </div>


  <router-link to="/" class="HomeBtn">홈</router-link>
  <machine-start-modal class = "Modal" v-show="show" v-on:close="OnModal"></machine-start-modal>
</template>

<script>
import { useMachineStore } from "@/stores/store";
import { useCartStore } from "@/stores/cart";
import { usePhoneStore } from "@/stores/phoneNumberStore";

import axios from 'axios';
import MachineStartModal from './MachineStartModal.vue';

export default {
  components: { MachineStartModal },

  data() {
    return {
      show: false,
      machineId: useMachineStore().machineId,
      machineData: {},
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
        useCartStore()
        usePhoneStore()
        useMachineStore().setMachineId(useMachineStore().machineId);
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
.baseList_container{
  display: flex;
  flex-direction: row;
  width: 100%;
}

.machine_id {
  flex: 2; /* 2:8 비율로 설정 */
  color: wheat;
}

.baseList_container {
  flex: 8; /* 2:8 비율로 설정 */
  overflow-y: auto; /* 만약 내용이 넘칠 경우 스크롤 허용 */
}

li{
  list-style-type: none;
}
.baseList_box {
  margin-top:2rem;
  width: 25%;
  height: 400px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  background-color: white ;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
}
.baseList_box_img{
  margin-top:20px;
  width: 100%;
  height: 70%;
  object-fit: cover;
}
.baseList_box_content_name{
  margin-bottom: 2rem;
}
.baseList_box_content{
  margin-top:10px ;
}
.base_name{
  font-size: 24px;
} 
.baseList_box_content_content p {
  margin: 0.5rem;
}

.MachinInfo_container {
  background-image: url('../assets/img/machine_back.jpg'); 
  background-size: cover;
  background-position: center;
  width: 100%;
  max-width: 1800px; /* 최대 너비 설정 (선택 사항) */
  height: 700px;
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
}

.HomeBtn{
  position:fixed;
  left:85em;
  top:45em;
  border: 1px solid rgba(0, 0, 0, 0.8);
  transform: translate(-50%, -50%);
  background-color:  white;
  width: 5em;
  height: 3em;
  padding-top: 2em;
}
</style>