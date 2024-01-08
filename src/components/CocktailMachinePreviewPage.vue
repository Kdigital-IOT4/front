<template>
    <div class="container-hed">
        <router-link to="/CockTailPage" class="HedBtn1">칵테일 미리보기</router-link>
        <router-link to="/CockTailPage" class="HedBtn2">베이스 등록</router-link>
        <router-link to="/CockTailPage" class="HedBtn3">재료 등록</router-link>
        <div></div>
        <button class="HedBtn4" @click="OnModal">개시</button>
    </div>
    
    <div class="container-PreView">
        <machine-start-modal class = "Modal" v-show="show" v-on:close="OnModal"></machine-start-modal>
        <div v-for="x in 5" v-bind:key="x">
            <div class="PreViewCockTail" @click="toggleExpand(x)">
                <img class="PreViewImg" src="../assets/img/a.jpg">
                <p>Name</p>
                <div class="expand-content" :id="'expand-content'+ (x-1)">
                    <p>여기에 보여질 내용입니다.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MachineStartModal from './MachineStartModal.vue';
export default {
  components: { MachineStartModal },
  data() {
    return {
      expandableElements: [],
      show : true
    };
  },
  mounted() {
        this.initexpand_contents();
  },
  methods: {
    OnModal(){
        this.show = !this.show;
    },
    initexpand_contents(){
        var buttons = document.querySelectorAll(".PreViewCockTail")
        buttons.forEach((button, index) => {
      var contentId = 'expand-content' + index;
      console.log(index);
      this.expandableElements.push(contentId);
    });
    },
    toggleExpand(i) {
        console.log(i);
        var expandContent = document.getElementById(this.expandableElements[i-1]);
            if (expandContent.style.display === "block") {
                expandContent.style.display = "none";
            } else {
                expandContent.style.display = "block";
            }
    },
  },
};

</script>

<style>
.container-hed{
    position:fixed;
    left:0;
    top:0;
    display: grid;
    grid-template-rows: 100px;
    grid-template-columns: 10em 10em 10em 50em 10em;
    background-color: aqua;
  }
  
  .HedBtn1{
    background-color: brown;
    padding-top: 2em;
  }
  .HedBtn2{
    background-color: rgb(130, 245, 84);
    padding-top: 2em;
  }
  .HedBtn3{
    background-color: rgb(107, 189, 255);
    padding-top: 2em;
  }
  .HedBtn4{
    background-color: rgb(240, 86, 245);
    padding-top: 2em;
  }


.PreViewCockTail{
    width: 10em;
    height: 11em;
    background-color: gray;
}

.PreViewImg{
    padding-top: 1em;
    width: 5em;
}

.expand-content {
    display: none;
    padding: 10px;
    background-color: #f1f1f1;
}

.container-PreView{
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    position: fixed;
    left: 10em;
    top:20em;
    grid-column-gap: 5em;
}

.Modal{
    position: fixed;
    left:50%;
    top:50%;
    transform: translate(-50%, -50%);
}
</style>