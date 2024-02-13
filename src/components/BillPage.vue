<template>
  <div class="receipt-container">
    <h1>Order Details</h1>

    <!-- Display order data from the store -->
    <div v-if="orderData" class="order-details">
      <p>{{ orderData.orderCode }}</p>
      <p>User Phone Number: {{ orderData.user_phoneNumber }}</p>
      <p>Total Price: {{ orderData.total_price }}</p>

      <h2 class="bill_recipe_header">Recipe List</h2>
      <ul class="bill_cocktail_box">
        <li v-for="recipe in orderData.recipeList" :key="recipe.cocktail_en_name" class="recipe-item">
          <h2>{{ recipe.cocktail_en_name }}</h2>
          <p>{{ recipe.cocktail_price }} ₩</p>

          <h3 class="bill_cocktail_box_base_header">포함된 술</h3>
          <ul class="bill_base_box">
            <li v-for="base in recipe.baseList" :key="base.base_seq" class="base-item">
              <p>{{ base.base_en_name }} ({{ base.base_kr_name }})</p>
              <p>포함된 양: {{ base.amount }}</p>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <div v-else>
      <p>No order data available.</p>
    </div>
  </div>
</template>

<script>
import { useOrderDataStore } from "@/stores/orderDataStore";

export default {
  data() {
    return {};
  },
  computed: {
    // Get order data from the store
    orderData() {
      return useOrderDataStore().getOrderData;
    },
  },
};
</script>

<style scoped>
.receipt-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  text-align: center; /* 중앙 정렬을 위한 추가 스타일 */
}

.order-details {
  margin-top: 20px;
}

.recipe-list {
  list-style: none; /* 리스트 스타일 제거 */
  padding: 0;
}

.recipe-item {
  margin-bottom: 20px;
  border: 1px solid #ddd;
  display: inline-block; /* 가운데 정렬을 위한 추가 스타일 */
  text-align: center; /* 내용은 왼쪽 정렬 유지 */
}

.base-item {
  margin-left: 2rem;
  padding: 5px;
  margin-right: 2rem;
}
.bill_base_box{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}
.bill_cocktail_box{
  padding: 0;
}
.bill_cocktail_box_base_header{
  margin-top:3rem
}
.bill_recipe_header{
  margin-top:3rem;
  margin-bottom: 1rem;
}
</style>
