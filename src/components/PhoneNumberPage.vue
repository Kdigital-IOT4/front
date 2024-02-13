<template>
  <div class="phone-input-container">
    <div class="phoneNumber_header_box">
      <h2>전화번호를 입력해주세요 - 칵테일 제조전 연락을 드립니다</h2>
    </div>
    <div class="phoneNmuber_input_box">
      <input v-model="phoneNumber" type="text" placeholder="핸드폰 번호를 입력하세요" />

      <!-- 숫자 입력 키보드 -->
      <div class="numeric-keyboard">
        <button @click="appendToPhoneNumber(0)">0</button>
        <button v-for="number in 9" :key="number" @click="appendToPhoneNumber(number)">
          {{ number }}
        </button>

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
  border: 1px solid red;
  position: fixed;
  width: 90%;
  height: 90%;
  background: rgba(0, 0, 0, 0.4);
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
  padding: 10px; /* Add padding to the boxes if needed */
}

.phoneNmuber_input_box input {
  width: 70%;
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
}

.numeric-keyboard {
  display: flex;
  flex-wrap: wrap;
  justify-content : center;
  margin-bottom: 20px;
}

.numeric-keyboard button {
  width: 70px;
  height: 70px;
  font-size: 18px;
  background-color: white;
  color: black;
  border: 1px solid #ccc;
  cursor: pointer;
  margin: 5px; /* 버튼 간격을 추가했습니다. */
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
</style>
