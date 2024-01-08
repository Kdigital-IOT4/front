<template>
  <div class="container-hed">
    <router-link to="/CockTailPage" class="HedBtn1">칵테일 미리보기</router-link>
    <router-link to="/CockTailPage" class="HedBtn2">베이스 등록</router-link>
    <router-link to="/CockTailPage" class="HedBtn3">재료 등록</router-link>
    <div></div>
    <router-link to="/CockTailPage" class="HedBtn4">개시</router-link>
  </div>

  <div class="container-MachineInfo">
    <div class="MachinInfo">
        <h1>MachinName</h1>
        <p>MachinInfo</p>
    </div>
  </div>

  <router-link to="/CockTailPage" class="HomeBtn">홈</router-link>
</template>

<script>
export default {
  data(){

  }
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