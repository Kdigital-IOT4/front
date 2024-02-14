<template>
ss
</template>
  
  <script>
  import { useOrderDataStore } from "@/stores/orderDataStore";

  import axios from "axios";
  export default {
    data() {
      return {
        orderCode : useOrderDataStore().orderCode,
      };
    },
    methods :{
        checkOrderCode(){
            console.log(useOrderDataStore().orderCode);
        },
        async orderProcess__request_Gcode() {
          try {
            const response = await axios.get(`http://localhost:8080/api/v1/order/makeCocktail/${this.orderCode}/fast`);
            console.log("Server Response:", response.data);
          }catch (error) {
            console.error("Error sending order data:", error);
          }
       },
    },
    mounted() {
    this.orderProcess__request_Gcode();
    },
  };
  </script>
  
  <style scoped>
  </style>
  