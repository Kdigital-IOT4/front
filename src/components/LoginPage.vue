<template>
    <div id ="app-login">
        <div class="container-loginBox">
            <router-link to="/login/user" @click="goToUserLoginPage" class="userLogin-button">유저</router-link>
            <router-link to="/login/machine" @click="goToMachineLoginPage" class="machineLogin-button">기계</router-link>
        </div>
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

  },
  mounted() {
    this.show = true;
  },
};
</script>


<style>
#app-login {
  font-family: 'Diphylleia', 'Avenir', 'Helvetica', 'Arial', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  position: relative;
}

.container-loginBox {
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

.userLogin-button,
.machineLogin-button {
  font-size: 3em;
  padding: 20px 40px;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 5px;
  margin-right: 10px;
  margin-bottom: 10px;
  text-decoration: none;
  color: #502c2c;
}

.userLogin-button{
    margin-right: 1em;
}
.machineLogin-button{
    margin-left: 1em;
}
</style>