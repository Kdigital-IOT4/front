<template>
  <div class="receipt-container">
    <h2>영수증</h2>
    <div class="receipt-content">
      <!-- 상품 목록 -->
      <div v-for="(item, index) in receiptItems" :key="index" class="receipt-item">
        <span>{{ item.name }}</span>
        <span>{{ item.price }}원</span>
      </div>

      <!-- 합계 -->
      <div class="total">
        <span>합계</span>
        <span>{{ getTotal() }}원</span>
      </div>

      <!-- 확인 버튼 -->
      <button @click="confirmReceipt">확인</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      receiptItems: [
        { name: '상품 A', price: 5000 },
        { name: '상품 B', price: 10000 },
        { name: '상품 C', price: 7500 }
      ]
    };
  },
  methods: {
    getTotal() {
      // 합계 계산
      return this.receiptItems.reduce((total, item) => total + item.price, 0);
    },
    confirmReceipt() {
      // 확인 버튼 클릭 시 수행할 로직
      console.log('영수증 확인');
      // 여기에 실제 동작 추가

       // (임시) 칵테일 메인 페이지로 이동
       this.$router.push('/cocktail/main');
    }
  }
};
</script>

<style scoped>
.receipt-container {
  text-align: center;
  margin: 20px;
}

h2 {
  color: #4CAF50;
}

.receipt-content {
  border: 1px solid #ccc;
  padding: 20px;
  margin-top: 10px;
}

.receipt-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.total {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-weight: bold;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
