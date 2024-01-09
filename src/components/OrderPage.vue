<template>
  <div>
    <div class="cocktail-order-container">
      <div v-for="cocktail in cocktails" :key="cocktail.seq" class="cocktail-box" @click="fetchCocktailDetails(cocktail.seq)">
        <h3>{{ cocktail.kr_Name }}</h3>
        <p>{{ cocktail.en_Name }}</p>
        
        <!-- Display the image using a method or computed property -->
        <img :src="getImageUrl(cocktail.fileURL)" alt="Cocktail Image" />

        <!-- Add more details if needed -->
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/CocktailHeader.vue";

export default {
  components: {
    Header
  },
  data() {
    return {
      cocktails: []
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
    }
  }
};
</script>

<style>
.cocktail-container {
  display: flex;
  flex-wrap: wrap;
}

.cocktail-box {
  width: 23%; /* Set the width to around 23% to accommodate four items in a row */
  margin: 10px;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  box-sizing: border-box;
  cursor: pointer; /* Add cursor pointer to indicate the box is clickable */
}

.cocktail-box:hover{
    width : 25%;
    /*
    추가로 더 작성...
    */
}

img {
  max-width: 100%;
  height: auto;
}
</style>
