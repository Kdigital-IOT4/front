<template>
    <div class="container-hed">
        <router-link to="/CocktailMachinePreviewPage" class="HedBtn1"></router-link>
        <router-link to="/BaseRegistrationPage" class="HedBtn2"></router-link>
        <router-link to="/StuffRegistrationPage" class="HedBtn3"></router-link>
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
.container-hed{
    display: grid;
    grid-template-rows: 6em;
    grid-template-columns: repeat(5, 20%);
    background-color: beige;
    position:fixed;
    left:0;
    top:0;
    width: 100%;
  }
  
  .HedBtn1:before {
    content: '칵테일 미리보기';
    color: white;
    background: #333;
    line-height : 4em;
    display: block;
    width: 8em;
    height: 4em;
    padding: 4px 12px;
    border-radius: 5px;
    transition: all 0.2s ;
    margin-left: 5em;
    margin-top:0.5em;
}
.HedBtn1:hover:before {
  margin-top:0.5em;
  margin-left: 5em;
  transform: scale(1.1,1.1);
  -ms-transform: scale(1.1,1.1);
  -webkit-transform: scale(1.1,1.1);
  box-shadow: 0px 5px 5px -2px rgba(0, 0, 0, 0.25);
}

.HedBtn2:before {
  content: '베이스 등록';
  color: white;
    background: #333;
    line-height : 4em;
    display: block;
    width: 8em;
    height: 4em;
    padding: 4px 12px;
    border-radius: 5px;
    transition: all 0.2s ;
    margin-left: 5em;
    margin-top:0.5em;
}
.HedBtn2:hover:before {
  margin-top:0.5em;
  margin-left: 5em;
  transform: scale(1.1,1.1);
  -ms-transform: scale(1.1,1.1);
  -webkit-transform: scale(1.1,1.1);
  box-shadow: 0px 5px 5px -2px rgba(0, 0, 0, 0.25);
}

.HedBtn3:before {
  content: '재료 등록';
  color: white;
    background: #333;
    line-height : 4em;
    display: block;
    width: 8em;
    height: 4em;
    padding: 4px 12px;
    border-radius: 5px;
    transition: all 0.2s ;
    margin-left: 5em;
    margin-top:0.5em;
}

.HedBtn3:hover:before {
    margin-top:0.5em;
  margin-left: 5em;
  transform: scale(1.1,1.1);
  -ms-transform: scale(1.1,1.1);
  -webkit-transform: scale(1.1,1.1);
  box-shadow: 0px 5px 5px -2px rgba(0, 0, 0, 0.25);
}

.HedBtn4 {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
}

.HedBtn4:before {
  content: '개시';
  line-height : 6em;
  background-color: greenyellow;
  display: block;
  width: 12em;
  height: 6em;
  border-radius: 5px;
  transition: all 0.2s ;
  margin-left: 4em;
  margin-top:0.5em;
}

.HedBtn4:hover:before {
  margin-top:0.5em;
  margin-left: 4em;
  transform: scale(1.1,1.1);
  -ms-transform: scale(1.1,1.1);
  -webkit-transform: scale(1.1,1.1);
  box-shadow: 0px 5px 5px -2px rgba(0, 0, 0, 0.25);
}

</style>