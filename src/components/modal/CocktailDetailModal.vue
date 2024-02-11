<template>
    <div class="modal-wrap">
         <div class="modal-container">
     
     <!--  모달창 content  -->
     <h1>data</h1>
     
     <div class="modal-btn">
       <button class="btn1" @click="gotoStart">Yes</button>
       <button class="btn2" @click="close">No</button>
     </div>
   </div>
 </div>
   </template>
   
<script>
import {useCartStore} from "@/stores/cart";

export default {
    data() {
        return {
        CocktailsData : useCartStore().tempcocktailDetails,
    }
    },
    methods: {
        gotoStart() {
            console.log("cocktailData" + this.CocktailsData)
        },
        close(){
            this.$emit('close');
        }
    }
    };
</script>
   
   <style>
   /* dimmed */
 .modal-wrap {
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