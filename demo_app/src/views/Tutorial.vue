<!-- freely inspired from: https://github.com/josephharveyangeles/kittynder/blob/master/LICENSE -->

<template>
  <div class="swipe-view">
    <swipeable-cards
      v-bind:title="this.currentIndex >= 0 ? this.cards[this.currentIndex].title : null"
      v-bind:cards="cards"
      @match="onmatch"
      @reject="onreject"
    />
  </div>
</template>

<script>
import SwipeableCards from "@/components/SwipeableCards.vue";
import shuffle from "@/utils/shuffle";
import router from "../router";

export default {
  name: "swipe",
  components: {
    SwipeableCards
  },
  data() {
    return {
      cards: [],
      currentIndex: -1,
      dialog: false,
      expected: false
    };
  },
  methods: {
    onmatch(data) {
      data.liked = true;
      this.next();
    },
    onreject(data) {
      data.liked = false;
      this.next();
    },
    next() {
      this.currentIndex++;
    }
  },
  mounted() {
    let cards = [
      {
        expectLike: true,
        title: "Swipe it right!"
      },
      {
        expectLike: false,
        title: "Swipe it left!"
      },
      {
        expectLike: false,
        title: "Don't like it!"
      },
      {
        expectLike: true,
        title: "Like it!"
      },
      {
        expectLike: true,
        title: "Love it!"
      }
    ];
    let catsImages = [
      "alexander.jpg",
      "bona.jpg",
      "ichi.jpg",
      "karina.jpg",
      "lloyd.jpg",
      "luiza.jpg",
      "max.jpg",
      "mona.jpg",
      "naru.jpg",
      "ramdan.jpg",
      "rikki-austin.jpg",
      "tucker.jpg",
      "uriel.jpg",
      "zoe.jpg"
    ];
    catsImages = shuffle(catsImages);
    for (let i = 0; i < cards.length; ++i) {
      cards[i].src = catsImages[i];
      const catName = catsImages[i].split(".")[0];
      const title = catName.charAt(0).toUpperCase() + catName.slice(1);
      cards[i].title = title;
    }
    this.cards = cards;
    this.currentIndex = 0;
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
