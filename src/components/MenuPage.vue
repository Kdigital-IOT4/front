<template>
  <div id ="app-Menu">
    <div class="contaner-List">
      <div class="cocktailsList">
        <div v-for="(x,index) in cocktails" v-bind:key="x">
          <img v-bind:src="x.url" @click="SelectCocktail(index)">
        </div>
      </div>

      <div class="SelectList">
        <div v-for="x in SelectCocktails" v-bind:key="x">
          <img v-bind:src="x.url">
        </div>
      </div>
    </div>

      <!--확인버튼-->
      <button class="SelectBtn" @click="modalOpen">선택완료</button>

      <!--선택내역-->
      <div class="modal-wrap" v-show="modalCheck">
        <div class="modal-container">
          <!--선택 리스트-->
          <div v-for="x in SelectCocktails" v-bind:key="x">
            <p>{{ x.name }}</p>
          </div>
          <!--선택내역창 버튼-->
          <div class="modal-btn">
            <button @click="modalOpen">닫기</button>
            <button @click="modalOpen">확인</button>
          </div>
        </div>
      </div>
      
      <!--룰렛버튼-->
      <button class="OpenRouletteBtn" @click="RouletteOpen" v-show="!modalCheck">랜덤룰렛</button>

      <!--룰렛창-->
      <div class="Roulette-wrap" v-show="RouletCheck">
        <div class="Roulette-container">
          <MenuRoulette></MenuRoulette>
          <!--룰렛창 버튼-->
          <div class="RouletteBtns">
            <button @click="RouletteOpen">닫기</button>
          </div>
        </div>
      </div>
      
  </div>
</template>

<script>
import MenuRoulette from './MenuRoulette.vue';

export default {
  components : {MenuRoulette},
  data() {
    return {
      show: false,
      modalCheck: false,
      RouletCheck:false,
      items:([{
        message : '말리부'},
        {message:'베일러스'},
        {message: '보드카'},
        {message : '위스키'},
        {message : '진'}
      ]),
      cocktails:([
        {name:'말리부',url:require('../assets/img/a.jpg')},
        {name:'베일러스',url:require('../assets/img/b.jpg')},
        {name:'보드카',url:require('../assets/img/c.jpg')},
        {name:'위스키',url:require('../assets/img/d.jpg')},
        {name:'진',url:require('../assets/img/e.jpg')}
      ]),
      SelectCocktails:([
        
      ]),
    };
  },
  methods: {
      SelectCocktail(idx){
        console.log(this.cocktails.at(idx));
        var coc_name = this.cocktails.at(idx).name;
        var coc_url = this.cocktails.at(idx).url;
        this.SelectCocktails.push({name:coc_name,url:coc_url});
      },
      modalOpen(){
        this.modalCheck = !this.modalCheck;
      },
      RouletteOpen(){
        this.RouletCheck = !this.RouletCheck;
      },
  },
  mounted() {
    this.show = true;
  },
  
};
</script>


<style>
.contaner-List{
  
}

.SelectList{ 
  float: left; 
  width: 50%;
  background-color: aqua;
}

.SelectList img{
  width: 50px;
  height: 50px;
}

.cocktailsList{
  float: left;
  background-color: blue;
  width: 50%;
}

.cocktailsList img{
  width: 50px;
  height: 50px;
}

.SelectBtn{
  position: absolute;
  left: 50%;
  top: 50%;
  width: 7%;
  height: 5%;
  background: rgb(156, 247, 156);
  border-radius: 10px;
  transform: translate(-50%, -50%);
}
.modal-wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}

.modal-container {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 550px;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
}

.OpenRouletteBtn{
  position: absolute;
  top: 50%;
  left: 40%;
  width: 7%;
  height: 5%;
  background: rgb(156, 247, 156);
  border-radius: 10px;
  transform: translate(-50%, -50%);
}

.Roulette-wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}

.Roulette-container {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 550px;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
}

</style>