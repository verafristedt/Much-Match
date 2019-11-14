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
    let shuffle = array => {
      let currentIndex = array.length,
        temporaryValue,
        randomIndex;
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    };
    axios
      .get(`${process.env.VUE_APP_API_BASE}images`)
      .then(response => (this.cards = shuffle(response.data)));
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
