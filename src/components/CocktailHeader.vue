<!-- Header.vue -->

<template>
  <header>
    <div class="header-content">
      <nav>
        <router-link to="/recommendations">추천칵테일</router-link>
        <router-link to="/special-order">스페셜오더</router-link>
        <router-link to="/events">이벤트</router-link>
        <router-link to="/OrderPage" class="order-link">주문</router-link>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "헤더 타이틀"
    }
  }
};
</script>

<style scoped>
header {
  background: linear-gradient(360deg, #030303, #535353);
  color: white;
  padding: 0;
  text-align: center;
  height: 20%;
}

.header-content {
  display: grid;
  grid-template-columns: 1fr auto; /* 첫 번째 열은 확장하고, 두 번째 열은 크기에 맞게 설정 */
  align-items: center;
  padding: 10px;
}

nav {
  display: flex;
  gap: 20px;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.order-link {
  margin-left: auto; /* "주문" 링크를 오른쪽으로 이동시킴 */
}

nav a:hover {
  text-decoration: underline;
}
</style>
