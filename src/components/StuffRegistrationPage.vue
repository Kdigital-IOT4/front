<template>
    <div class="container-StuffInput">
        <machine-start-modal v-show="show" v-on:close="OnModal"></machine-start-modal>
        <p class = 'stuff_title'>등록된 재료 목록</p>
        <div class="BaseList">
            <div v-for="x in 5" v-bind:key="x">
                <p>{{ x }}.귤</p>
            </div>
        </div>
        <div class="InputGroup">
            <input class="InputStuffName" v-model="Stuff_Name" placeholder="등록할 재료 이름을 입력하세요">
        </div>

        <button class="RegistrationBtn" @click="submitBase">등록하기</button>
    </div>
    <MachineHeader></MachineHeader>
</template>

<script>
import MachineHeader from "@/components/CocktailMachineHeader.vue"
//import axios from 'axios';
//현재 들어가있는 재료 리스트를 보여주면 좋을 것 같음

export default {
  components: { MachineHeader },
  data() {
    return {
      Stuff_Name:'',
    };
  },
  methods: {
    submitBase(){
        //axios.post('');
        //json으로 보내야함
    },
  },
};
</script>

<style>
.container-StuffInput{
    background: rgb(0, 0, 0);
    position:fixed;
    left: 45em;
    top: 30em;
    width: 40em;
    height: 45em;
    transform: translate(-50%, -50%);
    border: 0.2rem solid #fff;
  border-radius: 2rem;
  padding: 0.4em;
  box-shadow: 0 0 .2rem #fff,
            0 0 .2rem #fff,
            0 0 2rem #eafef6,
            0 0 0.8rem #eafef6,
            0 0 2.8rem #eafef6,
            inset 0 0 1.3rem #eafef6; 
}

.InputGroup{
    margin: 5em;
}

.InputStuffName{
    margin-top: 13em;
}

.RegistrationBtn{
    width: 10em;
    height: 5em;
}

.stuff_title{
    color: white;
}
</style>