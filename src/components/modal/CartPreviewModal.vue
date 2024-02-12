<template>
    <div class="modal-wrap">
      <div  :class="{ 'modal-container-exchanege': isCustomStyle }" class="modal-container">
  
        <!-- 모달창 content -->
        <h1 v-show="!isCustomStyle">선택한 메뉴 확인</h1>
  
        <!-- Displaying data -->
        <div class="cart_cocktail_box" v-if="cocktailData && cocktailData.length > 0">
          <div class="cart_cocktail_box_detail" v-for="cocktail in cocktailData" :key="cocktail.seq">
            <div class="cocktail-image-container">
              <img class="cocktail-image" :src="cocktail.img_URL" alt="Cocktail Image">
            </div>
              <h2>{{ cocktail.kr_name }}</h2>
              <h2>{{ cocktail.price }} ₩</h2>
            <div class="cocktail-amount-container">
              <h2>{{ getQuantity(cocktail.seq) }}</h2>
                <button @click="increseQuantity(cocktail.seq)">+</button>
                <button @click="decreseQuantity(cocktail.seq)">-</button>
            </div>
            
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
        cartData : null,
        cocktailData: null,
        isCustomStyle: false,
      };
    },
    methods: {
      increseQuantity(seq){
        const currentQuantity = this.getQuantity(seq);
        const newQuantity = currentQuantity + 1;
        useCartStore().updateQuantity(seq , newQuantity);
        this.getCartData()
      },
      decreseQuantity(seq){
        const currentQuantity = this.getQuantity(seq);
        if(currentQuantity == 1){
          alert("한개 이하는 뺄수 없습니다");
        }else{
          const newQuantity = currentQuantity - 1;
          useCartStore().updateQuantity(seq , newQuantity);
          this.getCartData()
        }

      },

      getQuantity(seq) {
      const cartItem = this.cartData.find(item => item.seq === seq);
      return cartItem ? cartItem.quantity : 0;
    },
      async getCartData() {
        try {
          const response = await axios.post('http://localhost:8080/api/v1/cocktail/sort/cart', {
            cartDataList: this.cart,
          });
          console.log('Server Response:', response.data.data);
          this.cocktailData = response.data.data
          this.isCustomStyle = true;
          this.cartData = useCartStore().cart_data;
          console.log("CocktailData " + JSON.stringify(useCartStore().cart_data));

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
 .modal-container-exchanege {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100em;
  height: 45em;
  background: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  padding-top: 5em;
  overflow-y: auto; /* Enable vertical scrolling if needed */
}

.cart_cocktail_box {
  width: 100%;
  overflow: hidden; /* Hide overflow when items wrap to the next line */
  align-items: center;
  justify-content: center;
}
.cart_cocktail_box_detail {
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  margin-right: 20px;
  margin-top: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
}
 .cocktail-image-container {
  width: 100px; /* Set the desired width */
  height: 100px; /* Set the desired height */
  overflow: hidden;
  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 20px;
}

.cocktail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
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