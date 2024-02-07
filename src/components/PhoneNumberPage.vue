<template>
  <div class="phone-input-container">
    <!-- 핸드폰 번호 입력창 -->
    <input v-model="phoneNumber" type="text" placeholder="핸드폰 번호를 입력하세요" />

    <!-- 숫자 입력 키보드 -->
    <div class="numeric-keyboard">
      <button @click="appendToPhoneNumber(0)">0</button>
      <button v-for="number in 9" :key="number" @click="appendToPhoneNumber(number)">
        {{ number }}
      </button>
      
    </div>

    <!-- 버튼 그룹 -->
    <div class="button-group">
      <!-- Skip 버튼 -->
      <button @click="skip">Skip</button>

      <!-- 확인 버튼 -->
      <button @click="confirm">확인</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phoneNumber: '' // 입력된 핸드폰 번호를 저장하는 데이터
    };
  },
  methods: {
    skip() {
      // Skip 버튼 클릭 시 수행할 로직
      console.log('Skip 버튼 클릭');

       // (임시) 영수증 페이지로 이동
      this.$router.push('/cocktail/bill');
    },
    confirm() {
      // 확인 버튼 클릭 시 수행할 로직
      console.log('확인 버튼 클릭', this.phoneNumber);

       // (임시) 영수증 페이지로 이동
       this.$router.push('/cocktail/bill');
    },
    appendToPhoneNumber(number) {
      // 숫자를 핸드폰 번호에 추가
      this.phoneNumber += number;
    }
  }
};
</script>

<style scoped>
.phone-input-container {
  text-align: center;
  margin: 20px;
}

input {
  width: 80%;
  padding: 10px;
  margin-bottom: 20px;
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
