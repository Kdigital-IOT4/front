<template>
  <div class="order_root_container">
    <button class="back_button"  @click="gotoCocktailMain()">돌아가기</button>
    <button class="pay_button"  @click=" gotoPayment()">결제하기</button>
    <div class="order_container">
      <!-- Displaying data -->
      <div class="cart_cocktail_box" v-if="cocktailData && cocktailData.length > 0">
        <div class="cart_cocktail_box_detail" v-for="cocktail in cocktailData" :key="cocktail.seq">
          <div class="cocktail_image_box">
            <img class="cocktail-image" :src="cocktail.img_URL" alt="Cocktail Image">
          </div>
          <div class="cocktail_data_box">
              <h2>{{ cocktail.kr_name }}</h2>
              
            <div class="cocktail-amount-container">
              <h2>{{ getQuantity(cocktail.seq) }}</h2>
            </div>

              <h2>{{ cocktail.price * getQuantity(cocktail.seq)}} ₩</h2>
          </div>
        </div>
        <div class="total_price_box">
          <h2>Total Price: {{ totalPrice }} ₩</h2>
        </div>
        
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
    };
  },

  computed: {
    totalPrice() {
      return this.cocktailData.reduce((total, cocktail) => {
        return total + cocktail.price * this.getQuantity(cocktail.seq);
      }, 0);
    },
  },

  methods: {
    gotoCocktailMain(){
      this.$router.push('/cocktail/main');
    },
    gotoPayment(){
      this.$router.push('/cocktail/payment');
    },
    getQuantity(seq) {
    const cartItem = this.cartData.find(item => item.seq === seq);
    return cartItem ? cartItem.quantity : 0;
  },
    async getCartData() {
      try {
        const response = await axios.post('http://3.38.22.113:8080/api/v1/cocktail/sort/cart', {
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
  mounted() {
    this.getCartData();
  },
};
</script>
 
 <style>

.total_price_box{
  margin-top:4rem;
  margin-bottom: 6rem;
}

.order_root_container {
 position: fixed;
 width: 100%;
 height: 100%;
 background: rgba(0, 0, 0, 0.4);
}
.back_button{
  position: fixed;
  left: 0;
  margin-top: 2rem;
  margin-left: 3rem;
  width: 100px;
  height: 60px;
  z-index: 2;
}
.pay_button{
  position: fixed;
  right: 0;
  margin-top: 2rem;
  margin-right: 3rem;
  width: 100px;
  height: 60px;
  z-index: 2;
}
.order_container {
position: relative;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
width: 100em;
height: 45em;
background: #fff;
border-radius: 10px;
box-sizing: border-box;
padding-top: 1em;
overflow-y: auto; 
z-index: 1;
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
  justify-content: space-between;
  flex-direction: row;
  margin-right: 20px;
  margin-top: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: rgba(0, 0, 0, 0.2) 3px 5px 3px;
}

.cocktail_image_box {
  width: 100px; 
  height: 100px;
  overflow: hidden;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  margin-left: 6rem;
  margin-top: 10px;
  margin-bottom: 20px;
}

.cocktail_data_box {
  width: 70%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.cocktail_data_box h2 {
  width: 30%; 
  text-align: center; 
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