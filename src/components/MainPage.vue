<template>

<div id="#app-main" class="root_container">
  <div class="intro_box_1">
    <div class="intro_box_1_img">
      <img src="../assets/img/baro-icon.svg">
    </div>
    <div class="intro_box_1_content">
      <h2>BaRo</h2>
      <span>baro는 자동 칵테일 제조 서비스로 고객들에게 탁월한 경험을 제공합니다.</span>
    </div>
  </div>
  <div class="intro_box_2">
    <button @click="goToCocktailMenu">USER</button>
    <button @click="goToOrderPage() ">MACHINE</button>
  </div>
  <div class="intro_box"></div>
</div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  methods: {
    goToCocktailMenu() {
      console.log('칵테일 메뉴 페이지로 이동합니다.');
      // 칵테일 메뉴 페이지로 이동하는 로직
      this.$router.push('/Menu');
      //this.$router.push('/MenuRoulette');
    },
    goToOrderPage() {
      console.log('주문 페이지로 이동합니다.');
      // 주문 페이지로 이동하는 로직
       this.$router.push('/login/machine');
    },
  },
  mounted() {
    this.show = true;
  },
};
</script>

<style>
:root {
  --clr-neon: hsl(317 100% 54%);
  --clr-bg: hsl(323 21% 16%);
}

#app-main {
  font-family: 'Diphylleia', 'Avenir', 'Helvetica', 'Arial', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  position: relative;
}
.root_container{
  width: 100%;
  height: 1800px;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
}
.intro_box_1 {
    display: flex;
    flex-direction: row;
    position: relative;
    background-color: #111; 
    color: #fff; 
    padding: 20px;
    border-radius: 10px; 
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.5); 
}

.intro_box_2 {
    display: flex;
    flex-direction: row;
    position: relative;
    background-color: #111; 
    color: #fff; 
    padding: 20px;
    border-radius: 10px; 
    box-shadow: 0 0 10px rgba(255, 19, 109, 0.5); 
    margin-top:2rem;
    justify-content: center;
    align-items: center;

}
.intro_box_2 :first-child{
  margin-right: 8rem;
  margin-left: 7rem;
}


.intro_box_2 button{
  font-size: 4rem;

    display: inline-block;
    cursor: pointer;
    text-decoration: none;
    color: var(--clr-neon);
    border: var(--clr-neon) 0.125em solid;
    padding: 0.25em 1em;
    border-radius: 0.25em;

    text-shadow: 0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.45em currentColor;

    box-shadow: inset 0 0 0.5em 0 var(--clr-neon), 0 0 0.5em 0 var(--clr-neon);

    position: relative;
  
}
.intro_box_2 button::before{
  pointer-events: none;
  content: "";
  position: absolute;
  background: var(--clr-neon);
  top: 120%;
  left: 0;
  width: 100%;
  height: 100%;

  transform: perspective(1em) rotateX(40deg) scale(1, 0.35);
  filter: blur(1em);
  opacity: 0.7;
}
.intro_box_2 button::after{
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 0 2em 0.5em var(--clr-neon);
  opacity: 0;
  background-color: var(--clr-neon);
  z-index: -1;
  transition: opacity 100ms linear;
}
.intro_box_2 button:hover, .intro_box_2 button:focus{
  color: var(--clr-bg);
  text-shadow: none;
}
.intro_box_2 button:hover::before, .intro_box_2 button:focus::before{
  opacity: 1;
}
.intro_box_2 button:hover::after, .intro_box_2 button:focus::after{
  opacity: 1;
}
.intro_box_1:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 2px solid #0ff;
  border-radius: 10px; 
  pointer-events: none; 
}
.intro_box_1_img{
  width: 40%;
  max-height: 600px;
}
.intro_box_1_content{
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

}
.intro_box_1_content h2 {
  font-size: 64px;
  color: #0ff; 
}
.intro_box_1_content span{
  font-size: 26px;
  text-align: center;
  margin-left: 3rem;
  margin-top: 2rem;
}
/* Fade 트랜지션 효과 시작 */
@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
.intro_box_1{
  animation: fadeInLeft 2s;
}
.intro_box_2{
  animation:  fadeInRight 2s;
}
/* Fade 트랜지션 효과 끝 */
</style>
