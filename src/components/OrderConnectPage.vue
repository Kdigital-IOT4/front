<template>
 ss
</template>
  
  <script>
  import { useCartStore } from "@/stores/cart";
  import { usePhoneStore } from "@/stores/phoneNumberStore";
  import { useMachineStore } from "@/stores/store";
  import { useOrderDataStore } from "@/stores/orderDataStore";

  import axios from "axios";

  export default {
    data() {
      return { 
        cart: useCartStore().cart,
        phoneNumber : usePhoneStore().phoneNumber,
        machineId: useMachineStore().machineId,
      };
    },
  

    methods: {
      async setOrderData() {
        const orderData = {
          phoneNumber: this.phoneNumber,
          machineId: this.machineId,
          cocktailList: this.cart.map(cocktailSeq => ({ cocktailSeq })),
        };


        console.log("Order Data:", orderData);

        try {

          const response = await axios.post('http://localhost:8080/api/v1/order/orderCocktail', orderData);
          console.log("Server Response:", response.data.data);

          if (response.data !== null) {
            useOrderDataStore().setOrderData(response.data.data);
            this.$router.push('/cocktail/bill');
        }
        } catch (error) {

          console.error("Error sending order data:", error);
        }
      },
    },
    mounted() {
    this.setOrderData();
    },
  };
  </script>

<style>

</style>  