<template>
    <div class="container-PreView">
        <machine-start-modal class = "Modal" v-show="show" v-on:close="OnModal"></machine-start-modal>
        <div v-for="cocktail in cocktails" :key="cocktail.seq">
            <div class="PreViewCockTail" @click="toggleExpand(cocktail.seq)">
                <img class="PreViewImg" :src="getImageUrl(cocktail.fileURL)">
                <p class = "name_text">{{cocktail.kr_Name}}</p>
                <div class="expand-content" v-if="CocktailsDetails[cocktail.seq - 1]" :id="'expand-content'+ (cocktail.seq-1)">
                    <p>가격 : {{CocktailsDetails[cocktail.seq-1].price}}</p>
                    <p>도수 : {{CocktailsDetails[cocktail.seq-1].alcohol}}</p>
                </div>
            </div>
        </div>
    </div>

    <MachineHeader></MachineHeader>
</template>

<script>
import MachineHeader from "@/components/CocktailMachineHeader.vue"

export default {
  components :{
    MachineHeader
  },
  data() {
    return {
      expandableElements: [],
      cocktails : [],
      CocktailsDetails : [],
      ElementsIndex : 0,
    };
  },
  mounted() {
        this.fetchCocktails();
  },
  methods: {
    async fetchCocktails() {
      try {
        const response = await fetch('http://3.38.22.113:8080/api/v1/cocktail/listCocktail');
        const data = await response.json();
        
        this.cocktails = data;
        
        this.ElementsIndex = this.cocktails.length;
        await Promise.all(this.cocktails.map(cocktail => this.fetchCocktailDetails(cocktail.seq)));
        this.initexpand_contents();
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
    background-color: black;
    border: 0.2rem solid #fff;
  border-radius: 2rem;
  padding: 0.4em;
  box-shadow: 0 0 .2rem #fff,
            0 0 .2rem #fff,
            0 0 2rem #61b3e7,
            0 0 0.8rem #61b3e7,
            0 0 2.8rem #61b3e7,
            inset 0 0 1.3rem #61b3e7; 
}

.PreViewImg{
    padding-top: 1em;
    width: 6em;
    height: 6em;
    
}

.name_text{
  color: white;
}
.expand-content {
    display: none;
    padding: 10px;
    background-color: #f1f1f1;
    border: 0.2rem solid #fff;
  border-radius: 2rem;
  padding: 0.4em;
  box-shadow: 0 0 .2rem #fff,
            0 0 .2rem #fff,
            0 0 2rem #5d8aa8,
            0 0 0.8rem #5d8aa8,
            0 0 2.8rem #5d8aa8,
            inset 0 0 1.3rem #5d8aa8; 
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