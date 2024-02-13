<template>
  <div class="phone-input-container">
    <div class="phoneNumber_header_box">
      <h2>전화번호를 입력해주세요 - 칵테일 제조전 연락을 드립니다</h2>
    </div>
    <div class="phoneNmuber_input_box">
      <input v-model="phoneNumber" type="text" placeholder="핸드폰 번호를 입력하세요" />

      <!-- 숫자 입력 키보드 -->
      <div class="numeric-keyboard">
        <button @click="appendToPhoneNumber(1)">1</button>
        <button v-for="number in 8" :key="number" @click="appendToPhoneNumber(number+1)">
          {{ number+1 }}
        </button>

        <button @click="appendToPhoneNumber010">010</button>
        <button @click="appendToPhoneNumber(0)">0</button>
        <button @click="backspace">-</button>
      </div>
    </div>
    <div class="phoneNumber_buttom_box">
      <!-- Skip 버튼 -->
      <button @click="skip">Skip</button>

      <!-- 확인 버튼 -->
      <button @click="confirm">확인</button>
    </div>
  </div>
</template>

<script>
import { usePhoneStore } from "@/stores/phoneNumberStore";

export default {
  data() {
    return {
      phoneNumber: '' // 입력된 핸드폰 번호를 저장하는 데이터
    };
  },
  methods: {
    skip() {
      // Skip 버튼 클릭 시 수행할 로직
      //console.log('Skip 버튼 클릭');
      usePhoneStore().setPhoneNumber(null);
       // (임시) 영수증 페이지로 이동
      this.$router.push('/cocktail/order/connect');
    },
    confirm() {
      // 확인 버튼 클릭 시 수행할 로직
      const phoneNumberRegex = /^010[0-9]{8}$/;

      if (phoneNumberRegex.test(this.phoneNumber)) {
        // Phone number is valid
        usePhoneStore().setPhoneNumber(this.phoneNumber);
        // (임시) 영수증 페이지로 이동
        this.$router.push('/cocktail/order/connect');
      } else {
        // Phone number is not in the correct format
        alert('유효한 핸드폰 번호를 입력해주세요.');
        // You can also provide feedback or handle the error in another way
      }
    },
    appendToPhoneNumber(number) {
      // 숫자를 핸드폰 번호에 추가
      this.phoneNumber += number;
    },
    appendToPhoneNumber010() {
      // 숫자를 핸드폰 번호에 추가
      this.phoneNumber += 0;
      this.phoneNumber += 1;
      this.phoneNumber += 0;
    },
    backspace() {
      // Backspace 기능: 마지막 글자를 제거
      this.phoneNumber = this.phoneNumber.slice(0, -1);
    },
  }
};
</script>

<style scoped>
.phone-input-container {
  text-align: center;
  position: fixed;
  background: rgb(255, 255, 255);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;

  display: grid;
  grid-template-rows: 3fr 6fr 1fr;
  gap: 10px;
}

.phoneNumber_header_box,
.phoneNmuber_input_box,
.phoneNumber_buttom_box {
  padding: 50px; /* Add padding to the boxes if needed */
}

.phoneNmuber_input_box input {
  width: 30%;
  height: 60px;
  margin-bottom: 4rem;
  padding: 10px;
  font-size: 32px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  color: #333;
  box-sizing: border-box;
  pointer-events: none;
  text-align: center;
  position: fixed;
  top: 30%;
  left: 48%;
  transform: translate(-50%, -50%);
}

.numeric-keyboard {
  width: 30%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-bottom: 20px;
}

.numeric-keyboard button {
  width: 70px;
  height: 70px;
  font-size: 18px;
  color: rgb(255, 255, 255); /* 글씨 색 */
  cursor: pointer;
  margin: 5px 10px; /* 버튼 간격을 추가했습니다. */
  border-color: #111;
  background: linear-gradient(180deg,#555 0%,#222 49%, #000 51%,#222 100%);
  border-radius: 5px;
  box-shadow: inset 0px 1px 0px rgba(255,255,255,.5),0px 1px 3px rgba(0,0,0,0.3);
}

.button-group button {
  margin-left: 10px; /* 버튼 사이 간격 조정 */
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

.button-group button:hover {
  background-color: #45a049;
}

.phoneNumber_buttom_box button{
  margin-left: 15px;
  width: 130px;
  height: 40px;
  color: #fff;
  border-radius: 5px;
  padding: 10px 25px;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
   box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
   7px 7px 20px 0px rgba(0,0,0,.1),
   4px 4px 5px 0px rgba(0,0,0,.1);
  outline: none;
  background: rgb(0, 0, 0);
  border: none;
}

.phoneNumber_buttom_box button:hover {
  background: linear-gradient(180deg,#555 0%,#222 49%, #000 51%,#222 100%);
}
</style>
