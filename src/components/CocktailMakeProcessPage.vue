<template>
<button @click="startMakeCocktail()">start make Cocktail</button>
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
        isPaused : true
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
                for(const gCode of this.CodeCommands){
                  console.log("요청 동작 작동 중 ... "+ gCode )

                  if (gCode.includes('$J=G53X0Y0Z0F20000')) {
                    this.controllerStore.sendCommand(gCode);
                    console.log("일시정지.. 새로운 컵을 받을때까지 다음 동작 스탑");
                    alert("일시정지.. 새로운 컵을 받을때까지 다음 동작 스탑");
                    this.isPaused = true
                  }
                  else{
                    this.controllerStore.sendCommand(gCode);
                  }
                }
          
              }
              else{
                //일시정지중..
              }
        }else{
          alert("소캣연결이 필요합니다.. 확인해주세요");
        }
      },

      startMakeCocktail(){
        this.isPaused = false;
        this.sendGcodeFunction();
      }


    },
    mounted() {
    this.orderProcess__request_Gcode();
    this.StartSocket();
    },
  };
  </script>
  
  <style scoped>
  </style>
  