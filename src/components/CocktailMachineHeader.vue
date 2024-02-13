<template>
    <div class="container-hed">
        <router-link to="/CocktailMachinePreviewPage" class="HedBtn1"></router-link>
        <router-link to="/BaseRegistrationPage" class="HedBtn2">베이스 등록</router-link>
        <router-link to="/StuffRegistrationPage" class="HedBtn3">재료 등록</router-link>
        <div></div>
        <button class="HedBtn4" @click="OnModal">개시</button>
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
    grid-template-rows: 3em;
    grid-template-columns: 1fr 1fr 1fr 4fr 1fr;
    background-color: #4CAF50;
    left:0;
    top:20px;
    width: 100%;
  }
  
  .HedBtn1:before {
    content: '칵테일 미리보기';
    color: white;
    line-height : 3em;
    text-decoration: none;
}

.HedBtn2:before {
  content: '베이스 등록';
  color: white;
    line-height : 3em;
}
.HedBtn3:before {
  content: '재료 등록';
  color: white;
  line-height : 3em;
}


.HedBtn4 {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
}

.HedBtn4:before {
  content: '개시';
  line-height : 3em;
  margin-left: 80px;
  text-decoration: underline;
  text-decoration-color: black;
  font-size: 17px;
  color: white;
}

</style>