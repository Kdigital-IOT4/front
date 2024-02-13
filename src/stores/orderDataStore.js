import { defineStore } from "pinia";

export const useOrderDataStore = defineStore("orderData", {
  state: () => ({
    orderData: null,
  }),

  actions: {
    setOrderData(data) {
      console.log("data : " + JSON.stringify(data));
      this.orderData = data;
    },
  },

  getters: {
    getOrderData(state) {
      return state.orderData;
    },
  },
});
