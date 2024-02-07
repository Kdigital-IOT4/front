<template>
  <div class="fade-in-page">
    <div class="container-hed">
        <router-link to="/CocktailMachinePreviewPage" class="HedBtn1"></router-link>
        <router-link to="/BaseRegistrationPage" class="HedBtn2"></router-link>
        <router-link to="/StuffRegistrationPage" class="HedBtn3"></router-link>
        <div></div>
        <button class="HedBtn4" @click="OnModal"></button>
    </div>

    <div class="container-BaseInput">
        <machine-start-modal v-show="show" v-on:close="OnModal"></machine-start-modal>
        <div class="BaseList">
            <div v-for="x in BaseList" v-bind:key="x">
                <p>{{ x.seq }}.{{ x.kr_Name }}</p>
            </div>
        </div>

        <div class="InputGroup">
            <input v-model="BaseSeq" placeholder="베이스 번호를 입력하세요.">
            <input class="InputBaseLine" v-model="Machine_Base_Line" placeholder="몇번째에 넣겠습니까?">
        </div>

        <button class="RegistrationBtn" @click="submitBase">등록하기</button>
    </div>
  </div>
</template>

<script>
import MachineStartModal from './MachineStartModal.vue';
import axios from 'axios';

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
  mounted() {
        this.GetBaseDataList();
  },
  methods: {
    OnModal(){
        this.show = !this.show;
    },
    GetBaseDataList(){
        //베이스 리스트 받아와서 보여줌
        axios.get('http://3.38.22.113:8080/api/v1/base/listBase')
            .then((response) =>{
                //const dataArray = [];
                //dataArray.push(...response.data);
                
                this.BaseList = [...response.data];
                
                //kr_Name / en_Name / fileURL / seq
                console.log(this.BaseList[0].en_Name); 
                
            })
            .catch(function(error){
                console.log(error);
            });
    },
    submitBase(){
        //axios.post('');
        //json으로 보내야함
        console.log('submitBase');
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
    background: #a3ff7e;
    line-height : 5em;
    display: block;
    width: 10em;
    height: 5em;
    border-radius: 5px;
    transition: all 0.2s ;
    margin-left: 4em;
    margin-top:0.5em;
}
.HedBtn1:hover:before {
  margin-top:0.5em;
  margin-left: 4em;
  transform: scale(1.1,1.1);
  -ms-transform: scale(1.1,1.1);
  -webkit-transform: scale(1.1,1.1);
  box-shadow: 0px 5px 5px -2px rgba(0, 0, 0, 0.25);
}

.HedBtn2:before {
  content: '베이스 등록';
  background: #11a8ff;
  line-height : 5em;
  display: block;
  width: 10em;
  height: 5em;
  border-radius: 5px;
  transition: all 0.2s ;
  margin-left: 4em;
  margin-top:0.5em;
}
.HedBtn2:hover:before {
  margin-top:0.5em;
  margin-left: 4em;
  transform: scale(1.1,1.1);
  -ms-transform: scale(1.1,1.1);
  -webkit-transform: scale(1.1,1.1);
  box-shadow: 0px 5px 5px -2px rgba(0, 0, 0, 0.25);
}

.HedBtn3:before {
  content: '재료 등록';
  background: #ec5dff;
  line-height : 5em;
  display: block;
  width: 10em;
  height: 5em;
  border-radius: 5px;
  transition: all 0.2s ;
  margin-left: 4em;
  margin-top:0.5em;
}

.HedBtn3:hover:before {
  margin-top:0.5em;
  margin-left: 4em;
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

.container-BaseInput{
    background: gray;
    position:fixed;
    left: 45em;
    top: 30em;
    width: 40em;
    height: 45em;
    transform: translate(-50%, -50%);
}

.InputGroup{
    margin: 10em;
}

.InputBaseLine{
    margin-top: 3em;
}

.RegistrationBtn{
    background-color: rgb(239, 255, 95);
    width: 10em;
    height: 5em;
}

.BaseList{
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    margin-top: 5em;
}

.fade-in-page{
  animation: fadein 3s;
  -webkit-animation: fadein 3s;
}
@keyframes fadein {
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
  }
}

@-webkit-keyframes fadein{
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
  }
}
</style>