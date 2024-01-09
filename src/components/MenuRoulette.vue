<template>
  <body>
    <div id="app">
      <h1>룰렛</h1>
      
      <div class="roulette-outer">
        <div class="roulette-pin"></div>
        <div class="roulette" v-bind:style="roulettesStyle">
          <!-- 값 영역-->
          <div class="item-wrapper">
            <div class="item" v-for="(item,index) in items" v-bind:key="item"
                    v-bind:style="itemStyles[index]">{{item.name}}</div>
          </div>
          <!-- 선 영역-->
          <div class="line-wrapper">
            <div class="line" v-for="(item,index) in items" v-bind:key="item"
                  v-bind:style="lineStyles[index]"></div>
          </div>
        </div>
      </div>

      <button class="play-btn" v-on:click="play">Play!</button>
    </div>

  </body>
</template>


<script>
  export default {
    //술 리스트 가져오기
    props:{
      CocktailsList : Array
    },
    data(){
      return {
        items:[
          {value:"0"},
          {value:"1"},
          {value:"2"},
          {value:"3"},
        ],
        itemStyles:[],
        lineStyles:[],
        currnet:0,
        count:0,
      };
    },
    computed:{
      segment(){
        return 360 / this.items.length;
      },
      offset(){
        return this.segment/2;
      },
      angle(){
        //return -this.currnet * this.segment; //가운데
        let temp = -this.currnet * this.segment;
        let randomOffset = Math.floor(Math.random() * this.segment) - this.offset - 1;
        let cycle = this.count * 360 * 3; //5바퀴
        return temp + randomOffset + cycle;
      },
      roulettesStyle(){
        return{
          "transform":"rotate("+this.angle+"deg)"
        }
      },
      currnetItem(){
        return this.items[this.currnet];
      }
    },
    methods:{
      //선택된 결과 전송
      SendCurrnet(id){
        this.$emit('SelectCock',id);
      },
      play(){
        this.count++;
        this.currnet = Math.floor(Math.random() * this.items.length);

        //돌림판이 멈춘 3초뒤에 선택된 결과를 전송 (작동 안함) ??
        //setTimeout(this.SendCurrnet,3000,this.currnet);
        this.$emit('SelectCock',this.currnet);
      }
    },
    mounted(){
      //Props 배열을 items로 복사
      this.items = this.CocktailsList.slice();

      this.items.forEach((el,idx)=>{
        //itemStyles 정의
        this.itemStyles.push({
          "transform":"rotate("+this.segment * idx +"deg)",
        })
        //lineStyle 정의
        this.lineStyles.push({
          "transform":"rotate("+(this.segment * idx + this.offset)+"deg)",
        })
      });
    }
  }
</script>
  
<style>
  html.body{
    margin: 0;
    padding:0;
  }

  #app{
    text-align: center;
  }

  .roulette-outer{
    position:relative;

    overflow: hidden;

    width: 500px;
    height:500px;

    font-size:30px;

    margin-left: auto;
    margin-right: auto;

    background: #ffeaaf;
  }

  .roulette-outer > .roulette{
    position: absolute;
    top:5%;
    left: 5%;
    right: 5%;
    bottom: 5%;

    border-radius: 50%;

    border:2px solid black;
  }

  .roulette-outer > .roulette-pin{
    position: absolute;
    top:5%;
    left: 50%;

    width: 0;
    height: 0;
    border-style: solid;
    border-width: 25px 5px 0 5px;
    border-color: red transparent transparent transparent;

    margin-left: -5px;
  }

  .roulette-outer > .roulette > .item-wrapper > .item{
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;

    padding-top:10%;
    text-align: center;
    display: flex;
    justify-content: center;
  }
  .roulette-outer > .roulette > .line-wrapper > .line{
    position:absolute;
    top:0;
    bottom:50%;
    left:50%;

    width:2px;
    margin-left: -1px;
    background: black;

    transform-origin: bottom;
  }

  .roulette-outer > .roulette{
    transition:transform 3s ease-in-out;
  }
</style>