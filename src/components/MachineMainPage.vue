<template>
    <div class="MachinInfo_container">
      <div class="machine_id">
        <h1>{{ machineInfo.name }}</h1>
      </div>
      
      <ul class="baseList_container">
        <li v-for="base in machineData.baseList" :key="base.base_seq" class="baseList_box">
            <div class="baseList_box_img">
              <img :src="base.imgURL" alt="Base Image">
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

  <router-link to="/cocktail/make" class="makeCocktailBtn">칵테일 만들기</router-link>
  <router-link to="/" class="HomeBtn">홈</router-link>
  <machine-start-modal class = "Modal" v-show="show" v-on:close="OnModal"></machine-start-modal>
  <MachineHeader></MachineHeader>
</template>

<script>
import { useMachineStore } from "@/stores/store";
import { useCartStore } from "@/stores/cart";
import { usePhoneStore } from "@/stores/phoneNumberStore";

import axios from 'axios';
import MachineStartModal from './MachineStartModal.vue';
import MachineHeader from "@/components/CocktailMachineHeader.vue"

export default {
  components: { MachineStartModal ,MachineHeader},

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
        const response = await axios.post('http://3.38.22.113:8080/api/v1/machine/data/read', {
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
  width: 18%;
  height: 400px;
  border-radius: 15px;
  box-sizing: border-box;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  background-color: rgb(255, 255, 255) ;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
}
.baseList_box_img{
  margin-top:20px;
  width: 70%;
  height: 50%;
  object-fit: cover;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin-left: auto;
  margin-right: auto;
  display: block;
}
.baseList_box_img img{
  max-height: 200px;
  max-width: 120px;
}
.baseList_box_content_name{
  margin-bottom: 2rem;
}
.baseList_box_content{
  background: rgba(1, 100, 31, 0.1);
  border-top: 1px solid rgba(1, 100, 31, 0.1); 
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  margin-top:10px ;
}
.base_name{
  font-size: 24px;
} 
.baseList_box_content_content {
  overflow-y: scroll;
}
.baseList_box_content_content::-webkit-scrollbar{
  width: 3px;
}
.baseList_box_content_content p {
  margin-bottom: 0.02rem;
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
  color:white;
  position:fixed;
  left:90%;
  top:85%;
  display: inline-block;
  width: 5em;
  height: 5em;
  --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2048 2048'%3E%3Cpath fill='%23000' d='m1024 165l941 942l-90 90l-83-82v805h-640v-640H896v640H256v-805l-83 82l-90-90zm640 1627V987l-640-640l-640 640v805h384v-640h512v640z'/%3E%3C/svg%3E");
  background-color: currentColor;
  -webkit-mask-image: var(--svg);
  mask-image: var(--svg);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
}

.makeCocktailBtn{
  position:fixed;
  right:0;
  bottom: 8rem;
  border: 1px solid rgba(0, 0, 0, 0.8);
  transform: translate(-50%, -50%);
  background-color:  white;
  width: 10rem;
  height: 3rem;
  padding-top: 1.2rem;
  text-decoration: none;
  color:rgba(0, 0, 0, 0.8);
  background: linear-gradient(360deg, #b6b5b5, #696868);
  font-size: 20px;
}

.makeCocktailBtn:hover{
  padding-top: 1.5rem;
  font-size: 24px;
  width: 11rem;
  height: 3.5rem;
  transition-delay: 0.2s;
  background: linear-gradient(360deg, #e7e7e7, #9e9e9e);
}
</style>