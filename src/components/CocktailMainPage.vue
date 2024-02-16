<template>
  <div>
    <Header title="메인 페이지 헤더" />
    
    <!-- Display individual boxes for each cocktail -->
    <div class="cocktail-container">
      <div v-for="cocktail in cocktails" :key="cocktail.seq" class="cocktail-box" @click="fetchCocktailDetails(cocktail.seq)">
        <div class="cocktail_box_dump">
          <div class="cocktail_box_img">
            <img :src="getImageUrl(cocktail.imgURL)" alt="Cocktail Image" />
          </div>
          <div class="cocktail_box_name">
            <h3>{{ cocktail.kr_Name }} - {{ cocktail.en_Name }}</h3>
          <!--<p>{{ cocktail.en_Name }}</p>-->
          </div>
          <div class="cocktail_box_price">
            <h3>{{cocktail.price}} ₩</h3>
          </div> 
        </div>
      </div>
    </div>

  </div>
  <div class="cocktail_cart" @click="OnModal">카트</div>

  
  <cart class = "Modal" v-show="show" v-on:close="OnModal"></cart>
</template>
<script>
import Header from "@/components/CocktailHeader.vue";
import cart from "@/components/modal/CartPreviewModal.vue";

import { useMachineStore } from "@/stores/store";
import { useCartStore } from "@/stores/cart";

export default {
  components: {
    Header,
    cart,
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
        const response = await fetch(`http://3.38.22.113:8080/api/v1/cocktail/sort/${this.machineId}`);
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
        useCartStore().selectTempCocktail(seq);
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
  border : 1px solid #ccc;
  margin-top : 3rem;
  margin-left: 2rem;
  box-shadow: rgba(243, 243, 243, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
}
.cocktail-box:last-child{
  margin-right: 2rem;
}

.cocktail-box h3,
.cocktail-box p{
  color:white;
}
/* Name box styling */
.cocktail_box_name {
  border-top : 1px solid #ccc;
  padding: 10px;
  flex: 2; 
  background: linear-gradient(360deg, #030303, #535353);
  color: transparent;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
}

/* Image box styling */
.cocktail_box_img {
  padding: 10px;
  flex: 7; 
  background: -webkit-linear-gradient(360deg , #faf4b4 , #fdf3c8);
}

/* Image styling */
.cocktail_box_img img {
  width: 100%;
  height: 400px; 
  display: block;
}

/* Price box styling */
.cocktail_box_price {
  padding: 5px;
  flex: 1; 
}
.cocktail-box:hover{
    width : 25%;
    /*
    추가로 더 작성...
    */
}
.cocktail_cart{
  margin-top : 10px;
  color:white;
  display: inline-block;
  width: 5em;
  height: 5em;
  --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath fill='%23000' d='M6 13h9c.55 0 1 .45 1 1s-.45 1-1 1H5c-.55 0-1-.45-1-1V4H2c-.55 0-1-.45-1-1s.45-1 1-1h3c.55 0 1 .45 1 1v2h13l-4 7H6zm-.5 3c.83 0 1.5.67 1.5 1.5S6.33 19 5.5 19S4 18.33 4 17.5S4.67 16 5.5 16m9 0c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5'/%3E%3C/svg%3E");
  background-color: currentColor;
  -webkit-mask-image: var(--svg);
  mask-image: var(--svg);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;

  position: fixed;
  bottom: 3rem;
  right: 7rem;  
}
.cocktail_cart:hover{
  width: 7em;
  height: 7em;
  transition-delay: 0.2s;

}
img {
  max-width: 100%;
  height: auto;
}
</style>
