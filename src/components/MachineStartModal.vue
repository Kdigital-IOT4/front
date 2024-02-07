<template>
   <div class="modal-wrap">
        <div class="modal-container">
    
    <!--  모달창 content  -->
    <h1>판매를 시작하시겠습니까?</h1>
    
    <div class="modal-btn">
      <button class="btn1" @click="gotoStart">Yes</button>
      <button class="btn2" @click="close">No</button>
    </div>
  </div>
</div>
  </template>
  
  <script>
  export default {
    data() {
        return {
    }
    },
    methods: {
        gotoStart() {
            this.$router.push('/cocktail/main'); //칵테일 페이지로 이동
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
  position: fixed;
  left: 0;
  top: 0;
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