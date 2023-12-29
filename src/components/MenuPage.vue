<template>
    <div id ="app-Menu">
        <div class="container-cocktailList">
            <div class="title-text">
                <h1 class="custom-font">칵테일 메뉴</h1>
            </div>

        <div class="test">
            <ol class="example1">
                <li class="TESTLIST" v-for="item in items" :key="item.message">
                {{ item.message }}
                </li>
            </ol>
        </div>
    </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      items:[
        'one',
        'two',
        'three',
        '칵테일'
      ]
    };
  },
  methods: {
   
  },
  mounted() {
    this.show = true;
  },
};
</script>


<style>
#app-Menu {
  font-family: 'Diphylleia', 'Avenir', 'Helvetica', 'Arial', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  position: relative;
}

.container-cocktailList {
  background-image: url('../assets/img/main.jpg'); 
  background-size: cover;
  background-position: center;
  height: 400px;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center; 
  align-items: center; 
}

.title-text {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%); 
  color: #fff;
  font-size: 28px;
}

.TESTLIST{
    color: #fff
}
</style>