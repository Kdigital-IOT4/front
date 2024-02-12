<template>
    <div class="modal-wrap">
      <div class="modal-container">
  
        <!-- 모달창 content -->
        <h1>칵테일 주문</h1>
  
        <!-- Displaying data -->
        <div v-if="cocktailData && cocktailData.length > 0">
          <div v-for="cocktail in cocktailData" :key="cocktail.seq">
            <h2>{{ cocktail.kr_name }}</h2>
            <p>영문명: {{ cocktail.en_name }}</p>
            <p>가격: {{ cocktail.price }}</p>
            <img :src="cocktail.img_URL" alt="Cocktail Image">
          </div>
        </div>
        <div v-else>
          <p>No cocktail data available.</p>
        </div>
  
        <div class="modal-btn">
          <button class="btn1" @click="getCartData">Yes</button>
          <button class="btn2" @click="close">No</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useCartStore } from "@/stores/cart";
  import axios from 'axios';
  
  export default {
    data() {
      return {
        cart: useCartStore().cart,
        cocktailData: null,
      };
    },
    methods: {
      async getCartData() {
        try {
          const response = await axios.post('http://localhost:8080/api/v1/cocktail/sort/cart', {
            cartDataList: this.cart,
          });
          console.log('Server Response:', response.data.data);
          this.cocktailData = response.data.data
        } catch (error) {
          console.error('Error:', error);
        }
      },
      close() {
        this.$emit('close');
      },
    },
  };
  </script>
   
   <style>
   /* dimmed */
 .modal-wrap {
   position: fixed;
   width: 100%;
   height: 100%;
   background: rgba(0, 0, 0, 0.4);
 }
 /* modal or popup */
 .modal-container {
   position: relative;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   width: 40em;
   height: 20em;
   background: #fff;
   border-radius: 10px;
   box-sizing: border-box;
   padding-top: 5em;
 }
 
 .modal-btn{
     margin-top: 5em;
 }
 
 .modal-btn > button{
     width: 5em;
     height: 3em;
 }
 .btn2{
     margin-left: 10em;
 }
 </style>  