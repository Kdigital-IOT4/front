<template>
  <div class="fade-in-page">
    <div class="container-BaseInput">
        <machine-start-modal v-show="show" v-on:close="OnModal"></machine-start-modal>
        <div class="title_1">
        <p>등록가능한 베이스 리스트</p>
        </div>

        <div class="BaseList">
            <div v-for="x in BaseList" v-bind:key="x">
                <p>{{ x.seq }}.{{ x.kr_Name }}</p>
            </div>
        </div>

        <div class="title_2">
        <p>현재 기계의 등록된 베이스 리스트</p>
        </div>

        <div class="BaseList">
            <div v-for="x in MachineBaseData.baseList" v-bind:key="x">
                <p>{{ x.base_line }}.{{ x.kr_Name }}</p>
            </div>
        </div>

        <div class="InputGroup">
            <input v-model="BaseSeq" type = 'text' placeholder="베이스 번호를 입력하세요.">
        </div>

        <button class="RegistrationBtn" @click="submitBase">등록하기</button>
        <button class="DeleteBtn" @click="DeleteBase">삭제하기</button>
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
      BaseList: [],           //기계에 등록 가능한 베이스 리스트
      MachineId : useMachineStore().machineId,
      MachineBaseData : [],   //기계의 등록되어 있는 베이스 리스트
      MachineBaseList :[],
    };
  },
  mounted() {
        this.GetBaseDataList();
        this.GetMachineBaseDataList();
  },
  methods: {
    MakemachineBaseList(){
      this.MachineBaseData.baseList.forEach(async (item, index) => {
        console.log(item);
        index;
        var newData = {
          "base_seq": item.base_seq,
          "machine_base_line" : item.base_line
        }
        this.MachineBaseList.push(newData);
      });
    },
    GetBaseDataList(){
        //베이스 리스트 받아와서 보여줌
        axios.get('http://3.38.22.113:8080/api/v1/base/listBase')
            .then((response) =>{
                //const dataArray = [];
                //dataArray.push(...response.data);
                
                this.BaseList = [...response.data];
                
                //kr_Name / en_Name / fileURL / seq
                //console.log(this.BaseList[0].en_Name); 
                
            })
            .catch(function(error){
                console.log(error);
            });
    },
    async GetMachineBaseDataList() {
      try {
        // 수정된 부분: 데이터를 서버에 보냅니다.
        const response = await axios.post('http://3.38.22.113:8080/api/v1/machine/data/read', {
          machineId: this.MachineId,
        });

        this.MachineBaseData = response.data;

        //this.MakemachineBaseList();
      } catch (error) {
        console.error('Error:', error);
      }
    },
    async UploadMachineBaseData(){
      try{
        const response = await axios.post('http://3.38.22.113:8080/api/v1/machine/data/upload',{
          machineData : {machineId : this.MachineId}, machineBaseList : this.MachineBaseList
        });
        console.log(response);
       } catch (error) {
        console.error('Error:', error);
      }
    },
    submitBase(){
      if(this.MachineBaseList.length == 0){
        this.MakemachineBaseList();
      }
        var newData = {
        "base_seq": +this.BaseSeq,
        "machine_base_line" : +this.MachineBaseList.length+1
        };
        this.MachineBaseList.push(newData);

        this.UploadMachineBaseData();
    },

    DeleteBase(){
      if(this.MachineBaseList.length == 0){
        this.MakemachineBaseList();
      }
      
      this.MachineBaseList.splice(this.MachineBaseList.length-1,1);
      
      this.UploadMachineBaseData();
    }
  },
};
</script>

<style>
.container-BaseInput{
    background: rgb(0, 0, 0);
    position:fixed;
    left: 50%;
    top: 55%;
    width: 40em;
    height: 40em;
    transform: translate(-50%, -50%);

  border: 0.2rem solid #fff;
  border-radius: 2rem;
  padding: 0.4em;
  box-shadow: 0 0 .2rem #fff,
            0 0 .2rem #fff,
            0 0 2rem #bc13fe,
            0 0 0.8rem #bc13fe,
            0 0 2.8rem #bc13fe,
            inset 0 0 1.3rem #bc13fe; 
}

.InputGroup{
    margin: 10em;
    
}

.RegistrationBtn{
    background-color: #00FFA0;
    width: 10em;
    height: 5em;
    border: 0.2rem solid #fff;
  border-radius: 2rem;
  padding: 0.4em;
  box-shadow: 0 0 .2rem #fff,
            0 0 .2rem #fff,
            0 0 2rem #00FFA0,
            0 0 0.8rem #00FFA0,
            0 0 2.8rem #00FFA0,
            inset 0 0 1.3rem #00FFA0; 
}

.BaseList{
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    color:white;
}

.title_1{
  position: relative;
  margin-top: 2px;
  color:white;
}

.title_2{
  position: relative;
  margin-top: 2px;
  color:white;
}

.DeleteBtn{
  background-color: #f32179;
    width: 10em;
    height: 5em;
    margin-left: 50px;
    border: 0.2rem solid #fff;
  border-radius: 2rem;
  padding: 0.4em;
  box-shadow: 0 0 .2rem #fff,
            0 0 .2rem #fff,
            0 0 2rem #f32179,
            0 0 0.8rem #f32179,
            0 0 2.8rem #f32179,
            inset 0 0 1.3rem #f32179; 
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