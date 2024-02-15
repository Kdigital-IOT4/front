<template>
  <div class="root_container">
    <div class="process_container">
      <div class="process_container_line"></div>
      <div class="process_container_imgBox">
        <img src="../assets/img/baro-icon.svg">
      </div>
    </div>
  </div>
 
</template>
  
  <script>
  import { useOrderDataStore } from "@/stores/orderDataStore";
  import { useControllerStore } from '@/stores/controller';

  import axios from "axios";

  export default {
    data() {
      return {
        orderCode : useOrderDataStore().orderCode,
        controllerStore : useControllerStore(),
        messageInput : null,
        CodeCommands : [],
        isPaused : true,
        isStartFlag : true,
        isEndFlag : false,
      };
    },
    methods :{
        checkOrderCode(){
            console.log(useOrderDataStore().orderCode);
        },

        async orderProcess__request_Gcode() {
          try {
            const response = await axios.get(`http://3.38.22.113:8080/api/v1/order/makeCocktail/${this.orderCode}/fast`);
            console.log("Server Response:", response.data);

            if(response != null){
              this.parseGcode(response.data.gCode)
              console.log(this.CodeCommands);

            }
          }catch (error) {
            console.error("Error sending order data:", error);
          }
       },

       async StartSocket(){
         this.controllerStore.startSocket();
         if(this.controllerStore.connected){
          console.log("칵테일 기계와 소캣연결 성공..")
         }
       },
       parseGcode(gCode){
         const gCodeLines = gCode.split('\n');

         for (const line of gCodeLines) {
          console.log("lineData : " +line);
          if (line) {
              this.CodeCommands.push(line);
          }
        }
       },
      sendGcodeFunction(){
        if (this.controllerStore.connected && this.controllerStore.wsSource){
              //정상적인 연결
              if(this.isPaused == false){
                for (let i = 0; i < this.CodeCommands.length; i++){
                  const gCode = this.CodeCommands[i];
                  console.log("요청 동작 작동 중 ... "+ gCode )

                  if (gCode.includes('$J=G53X0Y0Z0F20000')) {
                    this.controllerStore.sendCommand(gCode);
                    console.log("일시정지.. 새로운 컵을 받을때까지 다음 동작 스탑");
                    alert("일시정지.. 새로운 컵을 받을때까지 다음 동작 스탑");
                    this.isPaused = true;
                    this.CodeCommands.splice(i, 1);
                    i--;
                    break;
                  }
                  else{
                    this.controllerStore.sendCommand(gCode);
                    this.CodeCommands.splice(i, 1);
                    i--;
                  }
                  //해당하는 G코드를 삭제 -> 남은 데이터확인..


                  //check less list
                  console.log("남은 데이터 : "+this.CodeCommands)
                }
          
              }
              else{
                //일시정지중..
              }
        }else{
          alert("소캣연결이 필요합니다.. 확인해주세요");
        }
      },

      startMakeCocktail() {
        this.isPaused = false;
        this.checkStartFlag();

        if(this.isStartFlag === false){
          if (!this.CodeCommands || this.CodeCommands.length === 0) {
            // 모든 칵테일 제조가 완료된 경우 또는 CodeCommands가 null일 경우
            this.isEndFlag = true;
            alert("당신의 칵테일이 모두 제조되었습니다.");
          } else {
              this.sendGcodeFunction();
          }
        }

    },
      backMakeCocktailPage(){
        this.$router.push('/cocktail/make');
      },
      checkStartFlag(){
        if(this.isStartFlag === true){
          console.log("최초 시작..")
          this.isStartFlag = false;
        }
      }


    },
    mounted() {
    this.orderProcess__request_Gcode();
    this.StartSocket();
    },

  };
  </script>
  
  <style scoped>
  *{
    margin:0;
    padding: 0;
    box-sizing: border-box;
  }
  .root_container{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
  .process_container{
    position: relative;
    width: 350px;
    height: 190px;
    background: #333;
    transition: 0.7s;
  }
  .process_container:hover{
    height: 450px;
  }

  .process_container .process_container_line{
    position: absolute;
    inset: 0;
    background: #000;
    overflow: hidden;
  }
  .process_container .process_container_line::before{
    content: '';
    position: absolute;
    top: 50%;
    left : 50%;
    width: 600px;
    height: 120px;
    background: linear-gradient(transparent, #45f3ff , #45f3ff , #45f3ff , transparent);
    animation: animate 4s linear infinite;
  }

  .process_container .process_container_line::after{
    content: '';
    position: absolute;
    inset : 3px;
    background: #292929;

  }


  .process_container .process_container_imgBox{
    position: absolute;
    top: -50px;
    left : 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 150px;
    background: #000;
    transition: 0.7s;
    z-index: 10;
    overflow: hidden;
  }
  .process_container .process_container_imgBox::before{
    content: '';
    position: absolute;
    top:50%;
    left: 50%;
    width: 500px;
    height: 150px;
    transform: translate(-50% , -50%);
    background: linear-gradient(transparent, #ff3c7b , #ff3c7b , #ff3c7b , transparent);
    animation: animate_in 6s linear infinite;
  }
  .process_container .process_container_imgBox::after{
    content: '';
    position: absolute;
    inset : 3px;
    background: #292929;
  }
  .process_container:hover .process_container_imgBox{
    width: 250px;
    height: 250px;
  }
  .process_container .process_container_imgBox img {
    position: absolute;
    z-index: 1;
    top: 10px;
    left: 10px;
    width: calc(100% - 20px);
    height: calc(100% - 20px);
  }
  @keyframes animate{
    0%{
      transform: translate(-50% , -50%) rotate(0deg);
    }
    100%{
      transform: translate(-50% , -50%) rotate(360deg);
    }
  }

  @keyframes animate_in{
    0%{
      transform: translate(-50% , -50%) rotate(360deg);
    }
    100%{
      transform: translate(-50% , -50%) rotate(0deg);
    }
  }
  </style>
  