import { defineStore } from "pinia";

export const useOrderDataStore = defineStore("orderData", {
  state: () => ({
    orderData: null,
    orderCode: null,
  }),

  actions: {
    setOrderData(data) {
      console.log("data : " + JSON.stringify(data));
      this.orderData = data;
    },
    setOrderCode(orderCode) {
      console.log("order Code : ", orderCode);
      this.orderCode = orderCode;
    },
  },

  getters: {
    getOrderData(state) {
      return state.orderData;
    },
  },
});
