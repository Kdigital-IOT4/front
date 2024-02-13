<template>
  <div id="app-machineLogin">
    <div class="container-machineLogin-titleBox">
      <h1>머신 로그인</h1>
    </div>
    <div class="container-machineLogin">
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="id">Id:</label>
          <input v-model="machineId" type="text" id="id" name="id" placeholder="Enter your id">
        </div>

        <div class="form-group">
          <label for="password">Password:</label>
          <input v-model="machinePassword" type="password" id="password" name="password" placeholder="Enter your password">
        </div>

        <div class="form-group">
          <input type="submit" value="Login">
        </div>
      </form>

      <router-link to="/register/machine" class="MachineRegister-button">머신등록</router-link>
      <router-link to="/login" class="back-button">돌아가기</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {useMachineStore} from "@/stores/store";

export default {
  data() {
    return {
      machineId: '',
      machinePassword: '',
    };
  },
  methods: {
    gotoMachineMainPage(machineId) {
      this.$router.push({ name: 'MachineMainPage', params: { machineId } });
    },
    async submitForm() {
      try {
        const response = await axios.post('http://localhost:8080/api/v1/user/machine/login', {
          machineId: this.machineId,
          machinePassWord: this.machinePassword,
        });

        // 서버 응답 성공
        if (response.status === 200 && response.data.status === 'success') {
          const machineId = response.data.machine_id;
          //console.log('machineId before navigation:', machineId);
        
          useMachineStore().setMachineId(machineId);
          this.gotoMachineMainPage(machineId);
        } else {
          // 서버 응답 성공이 아닌 경우, 실패 알림을 띄웁니다.
          alert('Login failed. Please check your credentials.');
          console.error('Unexpected response status or login failure:', response.status);
          // 실패 모달 등의 로직을 추가하세요.
        }
      } catch (error) {
        // 에러 발생 시 처리
        alert('An error occurred during the request. Please try again.');
        console.error('An error occurred during the request:', error);
        // 실패 모달 등의 로직을 추가하세요.
      }
    },
  },
};
</script>

<style>
  #app-machineLogin {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 80vh;
    margin-top: -50px;
  }

  .container-machineLogin {
    background-color: #f4f4f4;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  form {
    max-width: 300px;
    margin: 0 auto;
  }

  .form-group {
    margin-bottom: 15px;
  }

  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }

  input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  input[type="submit"] {
    background-color: #4caf50;
    color: white;
    cursor: pointer;
  }

  input[type="submit"]:hover {
    background-color: #45a049;
  }

.back-button{
    text-decoration: none;
    color: black;
}

.MachineRegister-button{
    text-decoration: none;
    color: black;
}

</style>
