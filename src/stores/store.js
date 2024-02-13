import { defineStore } from "pinia";

export const useMachineStore = defineStore("machine", {
  state: () => {
    return {
      machineId: "",
    };
  },
  actions: {
    setMachineId(machineId) {
      this.machineId = machineId;
    },
  },
  getters: {
    getMachineId: (state) => {
      return state.machineId;
    },
  },
});
