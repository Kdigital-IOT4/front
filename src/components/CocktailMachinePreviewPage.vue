<template>
    <div class="container-hed">
        <router-link to="/CocktailMachinePreviewPage" class="HedBtn1">칵테일 미리보기</router-link>
        <router-link to="/BaseRegistrationPage" class="HedBtn2">베이스 등록</router-link>
        <router-link to="/StuffRegistrationPage" class="HedBtn3">재료 등록</router-link>
        <div></div>
        <button class="HedBtn4" @click="OnModal">개시</button>
    </div>
    
    <div class="container-PreView">
        <machine-start-modal class = "Modal" v-show="show" v-on:close="OnModal"></machine-start-modal>
        <div v-for="x in 7" v-bind:key="x">
            <div class="PreViewCockTail" @click="toggleExpand(x)">
                <img class="PreViewImg" src="../assets/img/a.jpg">
                <p>Name</p>
                <div class="expand-content" :id="'expand-content'+ (x-1)">
                    <p>여기에 보여질 내용입니다.</p>
                </div>
            </div>
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
      expandableElements: [],
      show : false,
      CocktailNum : 0,
    };
  },
  mounted() {
        this.GetCockTailNum();
        this.GetCockTailBaseData();
        this.initexpand_contents();
  },
  methods: {
    OnModal(){
        this.show = !this.show;
    },
    GetCockTailNum(){
        axios.get('http://3.38.22.113:8080/api/v1/cocktail/listCocktail')
            .then((response) =>{
                const dataArray = [];
                dataArray.push(...response.data);
                
                this.CocktailNum = dataArray.length;
                //kr_Name / en_Name / fileURL / seq
                console.log(dataArray);
                console.log(this.CocktailNum); 
                //개수 구해서 1~CocktailNUm까지 디테일 정보를 가져와서 클릭하면 보여주는 곳에 표시
                
            })
            .catch(function(error){
                console.log(error);
            });
            
    },
    GetCockTailBaseData(){ //DB에 등록되어 있는 칵테일의 베이스 정보를 가져옴
        axios.get('http://3.38.22.113:8080/api/v1/cocktail/1')
            .then((response) =>{
                const dataArray = [];
                //response.data;
                //dataArray.push(...response.data);
                response;
                console.log(dataArray); 
            })
            .catch(function(error){
                console.log(error);
            });
    },
    initexpand_contents(){
        var buttons = document.querySelectorAll(".PreViewCockTail")
        buttons.forEach((button, index) => {
      var contentId = 'expand-content' + index;
      this.expandableElements.push(contentId);
    });
    },
    toggleExpand(i) {
        console.log(i);
        var expandContent = document.getElementById(this.expandableElements[i-1]);
            if (expandContent.style.display === "block") {
                expandContent.style.display = "none";
            } else {
                expandContent.style.display = "block";
            }
    },
  },
};

</script>

<style>
.PreViewCockTail{
    width: 10em;
    height: 11em;
    background-color: gray;
}

.PreViewImg{
    padding-top: 1em;
    width: 5em;
}

.expand-content {
    display: none;
    padding: 10px;
    background-color: #f1f1f1;
}

.container-PreView{
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    position: fixed;
    left: 10em;
    top:20em;
    grid-column-gap: 5em;
    grid-row-gap: 8em;
}

.Modal{
    position: fixed;
    left:50%;
    top:50%;
    transform: translate(-50%, -50%);
}
</style>