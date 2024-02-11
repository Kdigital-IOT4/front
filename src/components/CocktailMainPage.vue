<template>
  <div>
    <Header title="메인 페이지 헤더" />
    
    <!-- Display individual boxes for each cocktail -->
    <div class="cocktail-container">
      <div v-for="cocktail in cocktails" :key="cocktail.seq" class="cocktail-box" @click="fetchCocktailDetails(cocktail.seq)">
        <div class="cocktail_box_name">
          <h3>{{ cocktail.kr_Name }}</h3>
        <p>{{ cocktail.en_Name }}</p>
        </div>
        <div class="cocktail_box_img">
          <img :src="getImageUrl(cocktail.imgURL)" alt="Cocktail Image" />
        </div>
        <div class="cocktail_box_price">
          <h3>{{cocktail.price}}</h3>
        </div> 
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/CocktailHeader.vue";
import { useMachineStore } from "@/stores/store";
import { useCartStore } from "@/stores/cart";

export default {
  components: {
    Header,
  },
  data() {
    return {
      cocktails: [],
      machineId: useMachineStore().machineId,
      show: false,
    };
  },
  computed: {
    tempSeq() {
      return useCartStore().tempSeq;
    },
  },
  watch: {
    tempSeq(newTempSeq) {
      console.log('tempSeq updated:', newTempSeq);
      // 여기서 모달 창 업데이트 로직을 호출
    },
  },
  mounted() {
    this.fetchCocktails();
  },
  methods: {
    OnModal() {
      console.log("onModal Start");
      this.show = !this.show;
    },

    async fetchCocktails() {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/cocktail/sort/${this.machineId}`);
        const data = await response.json();
        console.log(data.data);
        this.cocktails = data.data;
      } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
      }
    },
    getImageUrl(fileURL) {
      return fileURL;
    },
    async fetchCocktailDetails(seq) {
      try {
        //const response = await fetch(`http://3.38.22.113:8080/api/v1/cocktail/${seq}`);
        //const cocktailDetails = await response.json();
        console.log("시바 -> 업데이트 전 seq : " ,useCartStore().tempSeq);
        useCartStore().selectTempCocktail(seq);
        console.log("시바 -> 업데이트 후 seq : " , useCartStore().tempSeq);
        //this.OnModal();
        this.$router.push('/Cocktail/Modal');
      } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
      }
    },

  }
};
</script>

<style>
/* Container styling */
.cocktail-container {
  display: flex;
  justify-content: space-between;
}

/* Box styling */
.cocktail-box {
  flex: 1; /* This sets the flex ratio for each box, 2:7:1 */
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

/* Name box styling */
.cocktail_box_name {
  padding: 10px;
  border: 1px solid #ccc;
  flex: 2; /* Adjust the flex ratio for the name box */
}

/* Image box styling */
.cocktail_box_img {
  padding: 10px;
  border: 1px solid #ccc;
  flex: 7; /* Adjust the flex ratio for the image box */
}

/* Image styling */
.cocktail_box_img img {
  width: 100%; /* This makes the image take the full width of its container */
  height: 500px; /* Maintain aspect ratio */
  display: block;
}

/* Price box styling */
.cocktail_box_price {
  padding: 10px;
  border: 1px solid #ccc;
  flex: 1; /* Adjust the flex ratio for the price box */
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
