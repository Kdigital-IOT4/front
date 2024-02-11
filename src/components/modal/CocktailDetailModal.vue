<template>
    <div class="modal-wrap">
         <div class="modal-container">
     
     <!--  모달창 content  -->
     <h1>{{CocktailSeq}}</h1>
     
     <div class="modal-btn">
       <button class="btn1" @click="gotoStart">Yes</button>
       <button class="btn2" @click="close">No</button>
     </div>
   </div>
 </div>
   </template>
   
<script>
import {useCartStore} from "@/stores/cart";
import axios from 'axios';
export default {
    data() {
        return {
        CocktailSeq : useCartStore().tempSeq,
    }
    },
    methods: {
        gotoStart() {
            console.log("cocktail Seq " + this.CocktailSeq )
        },
        close(){
          this.$emit('close');
        },
        async getCocktailData(seq) {
         try {
          const response = await axios.get(`http://3.38.22.113:8080/api/v1/cocktail/${seq}`, {
        });

        // 서버 응답 성공
        if (response.status === 200) {
          //const cocktailData = response;
          const cocktailDetailData = response.cocktailDetail;
          console.log("cocktailData : "+ cocktailDetailData)
        } else {
          // 서버 응답 성공이 아닌 경우, 실패 알림을 띄웁니다.
          alert('Login failed. Please check your credentials.');
          console.error('Unexpected response status or login failure:', response.status);
          // 실패 모달 등의 로직을 추가하세요.
        }
      } catch (error) {
        // 에러 발생 시 처리
        alert('An error occurred during the request. Please try again.');
        console.error('An error occurred during the request:', error);
        // 실패 모달 등의 로직을 추가하세요.
      }
    },

    },
    mounted() {
    // 컴포넌트가 마운트되면서 바로 getMachineData를 호출합니다.
    this.getCocktailData(useCartStore().tempSeq);
   },
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