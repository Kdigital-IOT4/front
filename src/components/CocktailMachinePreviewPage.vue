<template>
    <div class="container-hed">
        <router-link to="/CocktailMachinePreviewPage" class="HedBtn1"></router-link>
        <router-link to="/BaseRegistrationPage" class="HedBtn2"></router-link>
        <router-link to="/StuffRegistrationPage" class="HedBtn3"></router-link>
        <div></div>
        <button class="HedBtn4" @click="OnModal"></button>
    </div>
    
    <div class="container-PreView">
        <machine-start-modal class = "Modal" v-show="show" v-on:close="OnModal"></machine-start-modal>
        <div v-for="cocktail in cocktails" :key="cocktail.seq">
            <div class="PreViewCockTail" @click="toggleExpand(cocktail.seq)">
                <img class="PreViewImg" :src="getImageUrl(cocktail.fileURL)">
                <p>{{cocktail.kr_Name}}</p>
                <div class="expand-content" :id="'expand-content'+ (cocktail.seq-1)">
                    <p>가격 : {{CocktailsDetails[cocktail.seq-1].price}}</p>
                    <p>도수 : {{CocktailsDetails[cocktail.seq-1].alcohol}}</p>
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
      cocktails : [],
      CocktailsDetails : [],
      ElementsIndex : 0,
    };
  },
  mounted() {
        this.fetchCocktails();
        
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
        
        this.ElementsIndex = this.cocktails.length;
        this.initexpand_contents();
        await Promise.all(this.cocktails.map(cocktail => this.fetchCocktailDetails(cocktail.seq)));
        
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
        this.CocktailsDetails[seq-1] = {price:cocktailDetails.cocktailDetail.price,alcohol:cocktailDetails.cocktailDetail.alcohol};
        
      } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
      }
    },
    initexpand_contents(){
      for(var i = 0;i<this.ElementsIndex;i++){
        var contentId = 'expand-content' + i;
        this.expandableElements.push(contentId);
      }
    },
    toggleExpand(i) {
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