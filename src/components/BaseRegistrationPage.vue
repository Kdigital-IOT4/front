<template>
  <div class="fade-in-page">
    <div class="container-BaseInput">
        <machine-start-modal v-show="show" v-on:close="OnModal"></machine-start-modal>
        <p>등록가능한 베이스 리스트</p>
        <div class="BaseList">
            <div v-for="x in BaseList" v-bind:key="x">
                <p>{{ x.seq }}.{{ x.kr_Name }}</p>
            </div>
        </div>

        <p>현재 기계의 등록된 베이스 리스트</p>
        <div class="BaseList">
            <div v-for="x in MachineBaseData.baseList" v-bind:key="x">
                <p>{{ x.base_line }}.{{ x.kr_Name }}</p>
            </div>
        </div>

        <div class="InputGroup">
            <input v-model="BaseSeq" type = 'text' placeholder="베이스 번호를 입력하세요.">
            <input class="InputBaseLine" type = 'text' v-model="Machine_Base_Line" placeholder="몇번째에 넣겠습니까?">
        </div>

        <button class="RegistrationBtn" @click="submitBase">등록하기</button>
    </div>
  </div>

  <MachineHeader></MachineHeader>
</template>

<script>
import axios from 'axios';
import MachineHeader from "@/components/CocktailMachineHeader.vue"
import { useMachineStore } from "@/stores/store";

export default {
  components :{
    MachineHeader
  },
  data() {
    return {
      BaseSeq:'',
      Machine_Base_Line:'',
      BaseList: [],
      MachineId : useMachineStore().machineId,
      MachineBaseData : {},
    };
  },
  mounted() {
        this.GetBaseDataList();
        this.GetMachineBaseDataList();
  },
  methods: {
    GetBaseDataList(){
        //베이스 리스트 받아와서 보여줌
        axios.get('http://3.38.22.113:8080/api/v1/base/listBase')
            .then((response) =>{
                //const dataArray = [];
                //dataArray.push(...response.data);
                
                this.BaseList = [...response.data];
                
                //kr_Name / en_Name / fileURL / seq
                console.log(this.BaseList[0].en_Name); 
                
            })
            .catch(function(error){
                console.log(error);
            });
    },
    async GetMachineBaseDataList() {
      try {
        // 수정된 부분: 데이터를 서버에 보냅니다.
        const response = await axios.post('http://3.38.22.113:8080/api/v1/machine/data/read', {
          machineId: "MachineId123",
        });

        this.MachineBaseData = response.data;
        console.log(this.MachineBaseData);
      } catch (error) {
        console.error('Error:', error);
      }
    },
    async submitBase(){
        //axios.post('');
        //json으로 보내야함
        console.log(this.BaseSeq);
        console.log(this.Machine_Base_Line);
        var newData = {
        "base_seq": this.BaseSeq,
        "machine_base_line" : this.BaseSeq
        };
        this.BaseList.push(newData);

        console.log(this.BaseList);
      //   try {
      //   // 수정된 부분: 데이터를 서버에 보냅니다.
      //   const response = await axios.post('http://3.38.22.113:8080/api/v1/machine/data/read', {
      //     machineId: "MachineId123",
      //   });

      //   this.MachineBaseData = response.data;
      //   console.log(this.MachineBaseData);
      // } catch (error) {
      //   console.error('Error:', error);
      // }
    },
  },
};
</script>

<style>
.container-BaseInput{
    background: gray;
    position:fixed;
    left: 45em;
    top: 30em;
    width: 40em;
    height: 45em;
    transform: translate(-50%, -50%);
}

.InputGroup{
    margin: 10em;
}

.InputBaseLine{
    margin-top: 3em;
}

.RegistrationBtn{
    background-color: rgb(239, 255, 95);
    width: 10em;
    height: 5em;
}

.BaseList{
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    margin-top: 5em;
}

.fade-in-page{
  animation: fadein 3s;
  -webkit-animation: fadein 3s;
}
@keyframes fadein {
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
  }
}

@-webkit-keyframes fadein{
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
  }
}
</style>