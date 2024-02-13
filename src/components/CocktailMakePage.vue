<template>
<div class="cocktail_make_container">
    <div class="cocktail_make_header">
        <p>안녕하세요 !</p>
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
      };
    },
    
    methods: {
        async getWaitingOrderList(){
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/order/read/${this.machineId}`)
                console.log("Server Response:", response.data.data.orderReadList);
            }catch (error) {

            console.error("Error sending order data:", error);
            }
        },
    },
    mounted(){
        this.getWaitingOrderList();
    }
}
</script>
  
<style>
.cocktail_make_container{
    width: 1000px;
    height: 1000px;
    border: 1px solid red;
}
</style>
  