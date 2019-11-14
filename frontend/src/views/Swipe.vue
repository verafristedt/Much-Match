<!-- freely inspired from: https://github.com/josephharveyangeles/kittynder/blob/master/LICENSE -->

<template>
  <div class="swipe-view">
    <swipeable-cards v-bind:cards="cards" />
  </div>
</template>

<script>
import SwipeableCards from "@/components/SwipeableCards.vue";
import axios from "axios";

export default {
  name: "swipe",
  components: {
    SwipeableCards
  },
  data() {
    return {
      cards: [],
      loading: true // TODO
    };
  },
  mounted() {
    axios
      .get(`${process.env.VUE_APP_API_BASE}/images`)
      .then(response => (this.cards = response.data));
  }
};
</script>

<style>
body {
  margin: 0;
  z-index: 0;
}
div.swipe-view {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
