<template>
    <div class="container-hed">
        <router-link to="/CockTailPage" class="HedBtn1">칵테일 미리보기</router-link>
        <router-link to="/CockTailPage" class="HedBtn2">베이스 등록</router-link>
        <router-link to="/CockTailPage" class="HedBtn3">재료 등록</router-link>
        <div></div>
        <router-link to="/CockTailPage" class="HedBtn4">개시</router-link>
    </div>

    <div class="container-BaseInput">

    </div>
</template>

<script>
export default {
  data() {
    return {
      
    };
  },
  mounted() {
        
  },
  methods: {
   
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

.container-BaseInput{
    background: gray;
    position:fixed;
    left: 45em;
    top: 30em;
    width: 40em;
    height: 45em;
    transform: translate(-50%, -50%);
}
</style>