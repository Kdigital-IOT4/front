<template>
    <div class="container-hed">
        <router-link to="/CocktailMachinePreviewPage" class="HedBtn1">칵테일 미리보기</router-link>
        <router-link to="/BaseRegistrationPage" class="HedBtn2">베이스 등록</router-link>
        <router-link to="/StuffRegistrationPage" class="HedBtn3">재료 등록</router-link>
        <div></div>
        <button class="HedBtn4" @click="OnModal"></button>
    </div>

    <machine-start-modal class = "Modal" v-show="show" v-on:close="OnModal"></machine-start-modal>
</template>

<script>
import MachineStartModal from './MachineStartModal.vue';
export default {
  components: { MachineStartModal },
  data() {
    return {
      BaseSeq:'',
      Machine_Base_Line:'',
      BaseList: [],
      show : false
    };
  },
  methods: {
    OnModal(){
        this.show = !this.show;
    },
  },
};
</script>
<style>
  .container-hed {
    display: flex;
    align-items: center;
    background-color: #4CAF50;
    padding: 0 10px;
}

.HedBtn1 {
  color: white;
  line-height : 3em;
  text-decoration: none;
}

.HedBtn2 {
  color: white;
    line-height : 3em;
    margin-left: 2em;
    text-decoration: none;
}
.HedBtn3 {
  color: white;
  line-height : 3em;
  margin-left: 2em;
  text-decoration: none;
}


.HedBtn4 {
  background: none;
  border: none;
   margin-left: auto; 
}

.HedBtn4:before {
  content: '개시';
  line-height : 3em;
  text-decoration-color: black;
  font-size: 17px;
  color: white;
}

</style>