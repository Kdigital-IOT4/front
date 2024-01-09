<template>
  <div id="app-register">
    <div class="container-register-titleBox">
      <h1>회원가입</h1>
    </div>
    <div class="container-register">
      <form @submit.prevent="submitForm" class="register-form">
        <div class="form-group">
          <label for="id">Id:</label>
          <input v-model="id" type="text" id="id" name="id" placeholder="Enter your id" class="input-field">
        </div>

        <div class="form-group">
          <label for="password">Password:</label>
          <input v-model="userPassword" type="password" id="password" name="password" placeholder="Enter your password" class="input-field">
        </div>

        <div class="form-group">
          <input type="submit" value="Register" class="submit-button">
        </div>
      </form>

      <router-link to="/login" class="back-button">돌아가기</router-link>
    </div>
  </div>
</template>

<script>
export default {
  // 필요한 로직 추가
};
</script>

<style scoped>
#app-register {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}

.container-register-titleBox {
  background-color: #4CAF50;
  padding: 20px;
  color: white;
}

.container-register {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.register-form {
  width: 300px;
  margin-top: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

.input-field {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}

.submit-button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  border: none;
}

.back-button {
  margin-top: 20px;
  text-decoration: none;
  color: #4CAF50;
  font-weight: bold;
}
</style>
