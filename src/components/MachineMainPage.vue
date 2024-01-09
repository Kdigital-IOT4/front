<template>
  <div class="container-hed">
    <router-link to="/CocktailMachinePreviewPage" class="HedBtn1">칵테일 미리보기</router-link>
    <router-link to="/BaseRegistrationPage" class="HedBtn2">베이스 등록</router-link>
    <router-link to="/StuffRegistrationPage" class="HedBtn3">재료 등록</router-link>
    <div></div>
    <button class="HedBtn4" @click="OnModal">개시</button>
  </div>
 
  <div class="container-MachineInfo">
    <div class="MachinInfo">
        <h1>MachinName</h1>
        <p>MachinInfo</p>
    </div>
    <machine-start-modal class = "Modal" v-show="show" v-on:close="OnModal"></machine-start-modal>
  </div>

  <router-link to="/CockTailPage" class="HomeBtn">홈</router-link>
</template>

<script>
import MachineStartModal from './MachineStartModal.vue';
export default {
  components: { MachineStartModal },
  data(){
    return{
      show : false
    };
  },

  methods:{
    OnModal(){
        this.show = !this.show;
    },
  }
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