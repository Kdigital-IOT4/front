<template>
  <transition name="fade">
    <div v-if="show" id="app-main" class="fadeInLeft">
      <div class="container-main">
        <div class="overlay-text">
          <h1 class="custom-font">칵테일</h1>
        </div>
        <button @click="goToCocktailMenu" class="cocktail-button">칵테일 메뉴</button>
        <button @click="goToOrderPage" class="order-button">주문하기</button>
      </div>
    </div>
  </transition>
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
    },
    goToOrderPage() {
      console.log('주문 페이지로 이동합니다.');
      // 주문 페이지로 이동하는 로직
    },
  },
  mounted() {
    this.show = true;
  },
};
</script>

<style>
#app-main {
  font-family: 'Diphylleia', 'Avenir', 'Helvetica', 'Arial', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  position: relative;
}

.container-main {
  background-image: url('../assets/img/main.jpg'); 
  background-size: cover;
  background-position: center;
  height: 400px;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: flex-start; 
  align-items: flex-end; 
}

.overlay-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); 
  color: #fff;
  font-size: 28px;
}

.cocktail-button,
.order-button {
  font-size: 1.5em;
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
  margin-bottom: 10px;
}

.cocktail-button {
  background-color: #000;
  color: #fff;
  margin-left: 10px;
}

.order-button {
  background-color: #ffd700;
  color: #000;
}

.custom-font {
  font-family: 'Diphylleia', sans-serif;
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

#app-main.fadeInLeft {
  animation: fadeInLeft 3.5s;
}
/* Fade 트랜지션 효과 끝 */
</style>
