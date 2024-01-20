<template>
    <div class="container-hed">
        <router-link to="/CocktailMachinePreviewPage" class="HedBtn1">칵테일 미리보기</router-link>
        <router-link to="/BaseRegistrationPage" class="HedBtn2">베이스 등록</router-link>
        <router-link to="/StuffRegistrationPage" class="HedBtn3">재료 등록</router-link>
        <div></div>
        <button class="HedBtn4" @click="OnModal">개시</button>
    </div>
    
    <div class="container-PreView">
        <machine-start-modal class = "Modal" v-show="show" v-on:close="OnModal"></machine-start-modal>
        <div v-for="cocktail in cocktails" :key="cocktail.seq">
            <div class="PreViewCockTail" @click="toggleExpand(cocktail.seq)">
                <img class="PreViewImg" :src="getImageUrl(cocktail.fileURL)">
                <p>{{cocktail.kr_Name}}</p>
                <div class="expand-content" :id="'expand-content'+ (cocktail.seq-1)">
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
      show : false,
      cocktails : []
    };
  },
  mounted() {
        this.fetchCocktails();
        this.initexpand_contents();
  },
  methods: {
    OnModal(){
        this.show = !this.show;
    },
    async fetchCocktails() {
      try {
        const response = await fetch('http://3.38.22.113:8080/api/v1/cocktail/listCocktail');
        const data = await response.json();
        
        this.cocktails = data;
      } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
      }
    },
    getImageUrl(fileURL) {
      // You can customize this method to handle image downloading logic
      // For simplicity, we're directly returning the fileURL
      return fileURL;
    },
    async fetchCocktailDetails(seq) {
      try {
        const response = await fetch(`http://3.38.22.113:8080/api/v1/cocktail/${seq}`);
        const cocktailDetails = await response.json();
        
        console.log(`Cocktail Details for seq ${seq}:`, cocktailDetails);
      } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
      }
    },
    initexpand_contents(){
        var buttons = document.querySelectorAll(".PreViewCockTail")
        buttons.forEach((button, index) => {
      var contentId = 'expand-content' + index;
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
    grid-row-gap: 8em;
}

.Modal{
    position: fixed;
    left:50%;
    top:50%;
    transform: translate(-50%, -50%);
}
</style>