import { defineStore } from "pinia";

export const usePhoneStore = defineStore("phone", {
  state: () => {
    return {
      phoneNumber: "",
    };
  },
  actions: {
    setPhoneNumber(phoneNumber) {
      this.phoneNumber = phoneNumber;
    },
  },
  getters: {
    getPhoneNumber: (state) => {
      return state.phoneNumber;
    },
  },
});
