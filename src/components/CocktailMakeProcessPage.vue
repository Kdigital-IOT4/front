<template>
  <div>
    <button @click="startMakeCocktail" >
      {{ isStartFlag ? 'Start making Cocktail' : (isEndFlag ? 'Your Cocktail Make is done' : 'Cocktail is in progress...') }}
    </button>
  </div>
<button @click="backMakeCocktailPage()" :disabled="!isEndFlag">돌아가기</button>
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
  </style>
  