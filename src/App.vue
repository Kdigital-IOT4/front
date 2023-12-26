<template>
  <div id="app">
  <MainPage></MainPage>
  </div>
  
</template>

<script>
import MainPage from './components/MainPage.vue'
export default {
  name: 'App',
  components: {
    MainPage
  }
}
</script>

<style>
body {
  background-color: #131313;
}

#app {
  font-family: 'Diphylleia', 'Avenir', 'Helvetica', 'Arial', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
