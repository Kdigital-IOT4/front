<template>
    <div class="cocktail_make_container">
      <div class="cocktail_make_header">
        <h2>Waiting List</h2>
      </div>
  
      <div v-if="orderList.length > 0" class="order-list">
        <table class="order-table">
          <thead>
            <tr>
              <th class="order-code">주문 코드</th>
              <th class="phone-number">전화번호</th>
              <th class="order-time">주문 시간</th>
              <th class="plus-data">추가정보</th>
              <th class="make-cocktail">만들기</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, index) in orderList" :key="index" class="order-item">
              <td class="order-code">{{ order.orderCode }}</td>
              <td class="phone-number">{{ order.userPhoneNumber }}</td>
              <td class="order-time">{{ order.createOrderTime }}</td>
              <td class="plus-data">
                <button @click="showAdditionalInfo(order)" class="plus-data-btn">
                    정보보기
                </button>
              </td>
              <td class="make-cocktail" >
                <button @click="makeCocktail(order)" class="make-cocktail-btn">

                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <div v-else>
        <p class="no-orders">주문이 없습니다.</p>
      </div>
  
      <!-- Additional Info Modal -->
      <div v-if="showAdditionalInfoModal" class="additional-info-modal">
        <div class="modal-content">
          <h3>Recipe List</h3>
          <ul>
            <li v-for="recipe in currentOrder.recipeList" :key="recipe.cocktail_en_name">
              <p>Cocktail: {{ recipe.cocktail_en_name }}</p>
              <p>Price: {{ recipe.cocktail_price }}</p>
            </li>
          </ul>
  
          <h3>Base List</h3>
          <ul>
            <li v-for="base in currentOrder.recipeList[0].baseList" :key="base.base_seq">
              <p>Base: {{ base.base_en_name }} ({{ base.base_kr_name }})</p>
              <p>Amount: {{ base.amount }}</p>
            </li>
          </ul>
  
          <button @click="closeAdditionalInfoModal">닫기</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import { useMachineStore } from "@/stores/store";
  
  export default {
    data() {
      return {
        machineId: useMachineStore().machineId,
        orderList: [],
        showAdditionalInfoModal: false,
        currentOrder: null,
      };
    },
    methods: {
      async getWaitingOrderList() {
        try {
          const response = await axios.get(`http://localhost:8080/api/v1/order/read/${this.machineId}`);
          this.orderList = response.data.data.orderReadList;
          console.log("Server Response:", this.orderList);
        } catch (error) {
          console.error("Error sending order data:", error);
        }
      },
      showAdditionalInfo(order) {
        this.currentOrder = order;
        this.showAdditionalInfoModal = true;
      },
      closeAdditionalInfoModal() {
        this.showAdditionalInfoModal = false;
        this.currentOrder = null;
      },
      makeCocktail(order) {
        // Implement your makeCocktail logic
        console.log("Making cocktail for order:", order);
      },
    },
    mounted() {
      this.getWaitingOrderList();
    },
  };
  </script>
  
  <style scoped>

  .plus-data-btn{
    width: 6rem;
    height: 3rem;
  }
  .cocktail_make_container {
    padding: 20px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .cocktail_make_header {
    margin-bottom: 20px;
    text-align: center;
  }
  
  .cocktail_make_header h2 {
    font-size: 20px;
    font-weight: bold;
  }
  
  .order-list {
    overflow-x: auto;
  }
  
  .order-table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }
  
  .order-table th, td {
    padding: 10px;
    text-align: center;
    border: 1px solid #ddd;
  }
  
  .order-table th {
    font-weight: bold;
    background-color: #f7f7f7;
  }
  
  .order-code, .phone-number, .order-time, .plus-data {
    width: 150px;
  }
  
  .make-cocktail {
    width: 100px;
  }
  
  .make-cocktail button {
    width: 40%;
    padding: 5px;
    height: 2.5rem;
    font-size: 14px;
    font-weight: bold;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .make-cocktail button:hover {
    background-color: #0056b3;
  }
  
  .make-cocktail .icon-cocktail {
    width: 16px;
    height: 16px;
    margin-right: 5px;
    fill: #fff;
  }
  
  .no-orders {
    text-align: center;
    font-size: 16px;
    padding: 20px;
  }
  
  /* Additional Info Modal Styles */
  .additional-info-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    text-align: left;
  }
  
  </style>
  