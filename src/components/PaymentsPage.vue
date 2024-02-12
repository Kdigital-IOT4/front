<template>
    <div class="container">
      <div class="content-box animate__animated animate__bounceIn">
        <!-- 가운데 정렬된 이미지 -->
        <img src="@/assets/img/qr_ex.svg" alt="Your Image" class="centered-image" />
  
        <!-- 취소 버튼 -->
        <div class="check-button">
          <button @click="check()">확인</button>
        </div>
  
        <div class="cancel-button">
          <button @click="cancel">취소</button>
        </div>
      </div>
    </div>
    <router-link to="/cocktail/phoneNumber">폰넘버입력</router-link>
  </template>
  
  <style>
  
  .container {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; 
  }
  
  .content-box {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
  }
  
  .centered-image {
    max-width: 100%;
    max-height: 100%;
    display: inline-block;
  }
  
  .cancel-button {
    margin-top: 20px;
  }
  
  .check-button{
    margin-top: 20px;
  }
  .check-button button{
    padding: 10px 20px;
    background-color: #1eff00;
    color: white;
    border: none;
    cursor: pointer;
  }
  .cancel-button button {
    padding: 10px 20px;
    background-color: #ff0000;
    color: white;
    border: none;
    cursor: pointer;
  }
  </style>
  
  <script>
  export default {
    methods: {
      cancel() {
        // 취소 버튼 클릭 시 수행할 로직 추가
        // 주문 페이지로 돌아감
        this.$router.push('/OrderPage');
      },
  
      check() {
        this.$router.push('/cocktail/phoneNumber');
      },
    }
  };
  </script>