import {modalController} from "@ionic/vue";
import {defineStore} from "pinia";

function wow() {
  console.log("wow")
}

export const useCrossPage = defineStore('crossPage', {
  state: () => {
    return ({
      wow,
    });
  },
  getters: {
  },
  setters: {
  },
})
