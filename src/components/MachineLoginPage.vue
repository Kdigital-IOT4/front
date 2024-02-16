<template>
  <div id="app-machineLogin">
    <div class="container-machineLogin-titleBox">
      <h1>머신 로그인</h1>
    </div>
    <div class="container-machineLogin">
      <div class="machineLogin_box">
        <form @submit.prevent="submitForm">
        <div class="form-group">
          <input v-model="machineId" type="text" id="id" name="id" placeholder="Enter your id">
        </div>

        <div class="form-group">
          <input v-model="machinePassword" type="password" id="password" name="password" placeholder="Enter your password">
        </div>

        <div class="form-group">
          <input type="submit" value="Login">
        </div>
      </form>
      <div class="machineLogin_box_btnBox">
        <router-link to="/register/machine" class="MachineRegister-button">머신등록</router-link>
        <router-link to="/login" class="back-button">돌아가기</router-link>
      </div>
      </div>
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
        const response = await axios.post('http://3.38.22.113:8080/api/v1/user/machine/login', {
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
    background-color: #111;
    color: #fff;
    margin-top: -50px;
  }
  .container-machineLogin-titleBox {
    margin-bottom: 20px;
    text-align: center;
  }

  .container-machineLogin-titleBox h1 {
    font-size: 24px;
    color: #0ff; /* Neon color for the title */
  }

  .container-machineLogin {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 500px;
    width: 400px;
    animation: fadeInBottom 2s;
  }
  .container-machineLogin::before{
    content: '';
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(315deg , #4dff03 , #00d0ff);
    display: block;
  }

  .container-machineLogin::after{
    content: '';
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(315deg , #4dff03 , #00d0ff);
    display: block;
    filter: blur(30px);
  }

  .machineLogin_box{
    inset: 5px;
    z-index: 2;
    background: rgba(0,0,0,0.05);
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .machineLogin_box input{
    border: 1px solid rgba(0,0,0,0.2);
    padding: 1rem;
    background: rgba(0,0,0,0.02);
  }
  .machineLogin_box input:hover{
    border: 1px solid rgba(0,0,0,0.4);
    padding: 1.1rem;
    background: rgba(0,0,0,0.1);
  }
  .form-group {
    margin-bottom: 15px;
  }

  .machineLogin_box_btnBox{
    margin-top: 3rem;
  }
.MachineRegister-button{
  color:#fff;
  font-size: 24px;
  margin-right: 1rem;
  text-decoration-line:none;
}
.back-button{
  color:#fff;
  font-size: 24px;
  text-decoration-line:none;
}


@keyframes fadeInBottom {
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
