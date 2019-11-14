<!-- freely inspired from: https://github.com/josephharveyangeles/kittynder/blob/master/LICENSE -->

<template>
  <div class="swipe-view">
    <swipeable-cards
      v-bind:title="this.currentIndex >= 0 ? this.cards[this.currentIndex].title : null"
      v-bind:cards="cards"
      @match="onmatch"
      @reject="onreject"
    />

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Ooops!</v-card-title>

        <v-card-text>
          <br />
          You were supposed to swipe {{expected ? 'right' : 'left'}} but you swiped {{!expected ? 'right' : 'left'}}...
          Remember:
          <b>Right</b> is for what you
          <b>like</b>
          and
          <b>Left</b> is for what you
          <b>do not like</b>.
          <br />
          <br />Just press your finger on the screen and move the card to the asked side! :-)
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">Ok!</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      this.checkResult(true);
    },
    onreject(data) {
      this.checkResult(false);
    },
    checkResult(got) {
      const expected = this.cards[this.currentIndex++].expectLike;
      if (got !== expected) {
        this.dialog = true;
        this.expected = expected;
        this.cards.push(this.cards[this.currentIndex - 1]);
      }
      if (this.currentIndex === this.cards.length) {
        router.push("/swipe");
      }
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
        expectLike: true,
        title: "Like it!"
      },
      {
        expectLike: false,
        title: "Don't like it!"
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
    for (let i = 0; i < cards.length; ++i) cards[i].src = catsImages[i];
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
