import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => {
    return {
      tempSeq: null,
      cart: [],
      cart_data: [],
    };
  },
  actions: {
    selectTempCocktail(seq) {
      this.tempSeq = seq;
    },

    addToCart(newItem) {
      // 장바구니에 이미 존재하는 아이템인지 확인
      const findObject = this.cart_data.find((item) => item.seq === newItem);
      console.log("findObject:", findObject);

      if (findObject) {
        console.log("find object seq : " + findObject.seq);
        console.log("find object quantity : " + findObject.quantity);
        this.updateQuantity(newItem, findObject.quantity + 1);
      } else {
        this.cart = [...this.cart, newItem];
        const new_cart_data_object = { seq: newItem, quantity: 1 };
        this.cart_data = [...this.cart_data, new_cart_data_object];
      }
    },

    removeFromCart(seq) {
      // 장바구니에서 특정 seq의 아이템 삭제
      this.cart = this.cart.filter((item) => item.seq !== seq);
    },

    updateQuantity(seq, newQuantity) {
      // 장바구니에서 특정 seq의 아이템 수량 업데이트
      console.log("SEQ : " + seq, " newQuantity : " + newQuantity);
      this.cart_data = this.cart_data.map((item) =>
        item.seq === seq ? { ...item, quantity: newQuantity } : item
      );
    },

    clearCart() {
      // 장바구니 비우기
      this.cart = [];
    },
  },
  getters: {},
});
