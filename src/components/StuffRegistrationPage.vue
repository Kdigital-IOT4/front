<template>
    <div class="container-hed">
        <router-link to="/CockTailPage" class="HedBtn1">칵테일 미리보기</router-link>
        <router-link to="/CockTailPage" class="HedBtn2">베이스 등록</router-link>
        <router-link to="/CockTailPage" class="HedBtn3">재료 등록</router-link>
        <div></div>
        <button class="HedBtn4" @click="OnModal">개시</button>
    </div>

   
    <div class="container-StuffInput">
        <machine-start-modal v-show="show" v-on:close="OnModal"></machine-start-modal>
        <p>등록된 재료 목록</p>
        <div class="BaseList">
            <div v-for="x in 5" v-bind:key="x">
                <p>{{ x }}.귤</p>
            </div>
        </div>
        <div class="InputGroup">
            <input class="InputStuffName" v-model="Stuff_Name" placeholder="등록할 재료 이름을 입력하세요">
        </div>

        <button class="RegistrationBtn" @click="submitBase">등록하기</button>
    </div>

</template>

<script>
import MachineStartModal from './MachineStartModal.vue';
//import axios from 'axios';
//현재 들어가있는 재료 리스트를 보여주면 좋을 것 같음

export default {
  components: { MachineStartModal },
  data() {
    return {
      Stuff_Name:'',
      show : false
    };
  },
  mounted() {
  },
  methods: {
    OnModal(){
        this.show = !this.show;
    },
    submitBase(){
        //axios.post('');
        //json으로 보내야함
    },
  },
};
</script>

<style>
.container-hed{
    position:fixed;
    left:0;
    top:0;
    display: grid;
    grid-template-rows: 100px;
    grid-template-columns: 10em 10em 10em 50em 10em;
    background-color: aqua;
  }
  
  .HedBtn1{
    background-color: brown;
    padding-top: 2em;
  }
  .HedBtn2{
    background-color: rgb(130, 245, 84);
    padding-top: 2em;
  }
  .HedBtn3{
    background-color: rgb(107, 189, 255);
    padding-top: 2em;
  }
  .HedBtn4{
    background-color: rgb(240, 86, 245);
    padding-top: 2em;
  }

.container-StuffInput{
    background: gray;
    position:fixed;
    left: 45em;
    top: 30em;
    width: 40em;
    height: 45em;
    transform: translate(-50%, -50%);
}

.InputGroup{
    margin: 5em;
}

.InputStuffName{
    margin-top: 13em;
}

.RegistrationBtn{
    background-color: rgb(239, 255, 95);
    width: 10em;
    height: 5em;
}

</style>