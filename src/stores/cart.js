import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => {
    return {
      tempSeq: null,
      cart: [],
    };
  },
  actions: {
    selectTempCocktail(seq) {
      this.tempSeq = seq;
    },

    addToCart(item) {
      // 장바구니에 아이템 추가
      this.cart.push(item);
    },
    removeFromCart(seq) {
      // 장바구니에서 특정 seq의 아이템 삭제
      this.cart = this.cart.filter((item) => item.seq !== seq);
    },
    updateQuantity(seq, newQuantity) {
      // 장바구니에서 특정 seq의 아이템 수량 업데이트
      const itemIndex = this.cart.findIndex((item) => item.seq === seq);
      if (itemIndex !== -1) {
        this.cart[itemIndex].quantity = newQuantity;
      }
    },
    clearCart() {
      // 장바구니 비우기
      this.cart = [];
    },
  },
  getters: {},
});
