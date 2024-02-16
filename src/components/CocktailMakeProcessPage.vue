<template>
  <div class="root_container">
    <div class="process_container">
      <div class="process_container_line"></div>

      <div class="process_container_imgBox">
        <img src="../assets/img/baro-icon.svg">
      </div>

      <div class="process_container_content">

        <div class="process_container_content_detail">
          <h2>
              <span v-if="isStartFlag"><span  class="userPhone">{{ userPhoneNumber }}</span> 님</span>
              {{ isStartFlag ? '칵테일 제조를 시작하겠습니다.' : (isEndFlag ? `칵테일 제조가 완료되었습니다.  ${countdown}초 뒤에 페이지 리스트로 돌아갑니다.` : '원래 위치로 컵이 돌아올때까지 다음버튼을 누르지마세요' )}}
          </h2>
        </div>

        <div class="process_container_content_btn">
          <button @click="startMakeCocktail()">
            {{ isStartFlag ? '시작하기' : (isEndFlag ? '완료' : '계속하기') }}
          
          </button>
        </div>

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
        orderData : null,
        controllerStore : useControllerStore(),
        messageInput : null,
        CodeCommands : [],
        compeletedMesaage : "success",

        //보여줄 정보.. start
        orderTime : null,
        userPhoneNumber: "default",
        recipeList : [],
        //보여줄 정보.. end

        //countDown & html 용 start
        countdown: 5,
        isPaused : true,
        isStartFlag : true,
        isEndFlag : false,
        //countDown & html 용 end


      };
    },
    methods :{
        checkOrderCode(){
            console.log(useOrderDataStore().orderCode);
        },

        async orderProcess_request_data(){
            try{
              const response = await axios.get(`http://localhost:8080/api/v1/order/read/orderProcess/${this.orderCode}`);
              console.log("OrderProcess - data - Response:", response.data.status);
              this.orderData = response.data;

              if(this.orderData.status === "success"){
                console.log("오더데이터 가져오기 성공..")
                useOrderDataStore().orderData =  this.orderData; //확인용 사용안할 수도?

                // 보여줄 data setting start

                this.orderTime = this.orderData.data.createOrderTime
                this.userPhoneNumber = this.orderData.data.userPhoneNumber
                this.recipeList = this.orderData.data.recipeList

                //log start
                //console.log("주문시각 : " , this.orderTime );
                //console.log("유저폰넘버 : " , this.userPhoneNumber);
                //console.log("레시피 리스트 : " ,  this.recipeList);
                //log end
                // 보여줄 data setting end
                
                

              }
              else{
                alert("서버와의 연결을 실패하였습니다. 관리자에게 연락해주세요");
              }


            }catch (error) {
            console.error("Error sending order data:", error);
          }
        },

        async orderProcess__request_Gcode() {
          try {
            const response = await axios.get(`http://3.38.22.113:8080/api/v1/order/makeCocktail/${this.orderCode}/fast`);
            //console.log("Server Response:", response.data);

            if(response != null){
              this.parseGcode(response.data.gCode)
              //console.log(this.CodeCommands);

            }
          }catch (error) {
            console.error("Error sending order data:", error);
          }
       },

       async orderProcess_request_completed(){
        try{
          const response = await axios.get(`http://3.38.22.113:8080/api/v1/order/completedCocktail/${this.orderCode}`);
          console.log("Server Response:", response.data);
          this.compeletedMesaage = response.data.status;
        }catch (error) {
            console.error("Error sending order data:", error);
          }
       },

       async StartSocket(){
         this.controllerStore.startSocket();
         if(this.controllerStore.connected){
          //console.log("칵테일 기계와 소캣연결 성공..")
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
                  //console.log("요청 동작 작동 중 ... "+ gCode )

                  if (gCode.includes('$J=G53X0Y0Z0F20000')) {
                    this.controllerStore.sendCommand(gCode);
                    //console.log("일시정지.. 새로운 컵을 받을때까지 다음 동작 스탑");
                    //alert("일시정지.. 새로운 컵을 받을때까지 다음 동작 스탑");
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
                  //console.log("남은 데이터 : "+this.CodeCommands)
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

      if (this.isStartFlag === false) {
        if (!this.CodeCommands || this.CodeCommands.length === 0) {
          this.isEndFlag = true;
          alert("당신의 칵테일이 모두 제조되었습니다.");
          
          this.orderProcess_request_completed();
          
          if(this.compeletedMesaage === "success"){
            // Start countdown
            const countdownInterval = setInterval(() => {
                      if (this.countdown > 0) {
                        this.countdown--;
                      } else {
                        clearInterval(countdownInterval);
                        this.$router.push('/cocktail/make');
                      }
                    }, 1000); 
          }
          else{
            alert("page Error - please connect 관리자")
          }
        
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
    this.orderProcess_request_data();
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
    min-height: 60vh;
    max-height: 800px;
  }
  .process_container{
    position: relative;
    width: 850px;
    height: 350px;
    background: #333;
    transition: 0.7s;
  }
  .process_container:hover{
    height: 550px;
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
    width: 800px;
    height: 300px;
    background: linear-gradient(transparent, #45f3ff , #45f3ff , #45f3ff , transparent);
    animation: animate 7s linear infinite;
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

  .process_container .process_container_content{
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  .process_container .process_container_content .process_container_content_detail{
    padding: 40px;
    text-align: center;
    align-items: center;
    transition: 0.4s;
    transform: translateY(145px);
    margin-bottom: -1.5em;
  }

  .process_container .process_container_content .process_container_content_detail h2{
    font-size : 1.5em;
    font-weight: 500;
    color: #45f3ff;
    line-height: 1.2em;
  }
  .process_container_content_btn{
    display: flex;

  }
  .process_container_content_btn button{
    padding :10px 30px;
    border :none;
    outline: none;
    border-radius: 5px;
    font-size: 2em;
    font-weight: 600;
    background: #45f3ff;
    color: #222;
    cursor: pointer;
    margin-bottom: 1em;
  }
  .process_container_content_btn button:hover{
    background: #0b585e;
  }

  .userPhone{
    font-size: 34px;
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
  