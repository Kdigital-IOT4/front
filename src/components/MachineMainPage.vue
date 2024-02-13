<template>
  <div class="container-MachineInfo">
    <div class="MachinInfo">
        <h1>MachinName</h1>
        <p>MachinInfo</p>
    </div>
  </div>

  <router-link to="/" class="HomeBtn">홈</router-link>
  
  <MachineHeader></MachineHeader>
</template>

<script>
import MachineHeader from "@/components/CocktailMachineHeader.vue"

export default {
  components: { MachineHeader },
  data(){
    return{
    };
  },
};
</script>

<style>

.MachinInfo{
  background: gray;
  position:fixed;
  left: 45em;
  top:25em;
  width: 50%;
  height: 50%;
  transform: translate(-50%, -50%);
}

.HomeBtn{
  position:fixed;
  left:85em;
  top:45em;
  background: gray;
  transform: translate(-50%, -50%);
  width: 5em;
  height: 3em;
  padding-top: 2em;
}
</style>