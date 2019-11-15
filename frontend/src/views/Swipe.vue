<!-- freely inspired from: https://github.com/josephharveyangeles/kittynder/blob/master/LICENSE -->

<template>
  <div class="swipe-view">
    <swipeable-cards v-bind:cards="cards" v-bind:title="title" @match="onmatch" @reject="onreject" />

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Perfect!</v-card-title>

        <v-card-text>
          <br />You are now ready to
          <b>swipe</b>! The following pictures represent different concepts.
          Swipe
          <b>RIGHT</b> if you
          <b>LIKE</b> the picture and its concept
          or
          <b>LEFT</b> if you
          <b>DON'T LIKE</b> it.
          <br />
          <br />Good luck, it's very quick! And try to act natural... ;-)
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">Let's go!</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="finished" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Thank you!</v-card-title>

        <v-card-text>
          <br />You can now close the app. Thanks a lot for your help!
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import SwipeableCards from "@/components/SwipeableCards.vue";
import axios from "axios";
import shuffle from "@/utils/shuffle";

const postSwipeData = data => {
  data.imageId = data.imageId + "";
  axios
    .post(`${process.env.VUE_APP_API_BASE}swipes`, data)
    .then(console.log)
    .catch(err => {
      console.error(err);
      postSwipeData(data);
    }); // TODO notify user and retry
};

export default {
  name: "swipe",
  components: {
    SwipeableCards
  },
  data() {
    return {
      userId: null,
      cards: [],
      dialog: true,
      counter: 0,
      title: null,
      finished: false,
      loading: true // TODO
    };
  },
  methods: {
    onmatch(data) {
      data.liked = true;
      data.userId = this.userId;
      postSwipeData(data);
      this.updateTitle();
    },
    onreject(data) {
      data.liked = false;
      data.userId = this.userId;
      postSwipeData(data);
      this.updateTitle();
    },
    updateTitle() {
      const count = ++this.counter;
      const total = this.cards.length;
      const left = total - count;
      if (left === 0) {
        this.finished = true;
        this.title = "Finished!";
      } else if (left < 4) this.title = `${left} more!`;
      else this.title = `${count + 1}/${total}`;
    }
  },
  mounted() {
    this.userId = window.localStorage.getItem("userId");
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
