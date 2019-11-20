<!-- freely inspired from: https://github.com/josephharveyangeles/kittynder/blob/master/LICENSE -->

<template>
  <div class="swipe-view">
    <loading :active.sync="isLoading" :is-full-page="true"></loading>
    <swipeable-cards v-bind:cards="cards" v-bind:title="title" @match="onmatch" @reject="onreject" />

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Perfect!</v-card-title>

        <v-card-text>
          <br />You are now ready to
          <b>swipe!</b> The following pictures represent different concepts or products.
          <br />Swipe
          <b>RIGHT</b> if you
          <b>LIKE</b> the picture and its concept
          or
          <b>LEFT</b> if you
          <b>DON'T LIKE</b> it.
          <br />If it's a product,
          <b>left</b> if you
          <b>don't want it</b>,
          <b>right</b> if you
          <b>would buy it</b> (do not think about the estimated price).
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

    <v-dialog v-model="reallyFinished" width="500">
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
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "swipe",
  components: {
    SwipeableCards,
    Loading
  },
  data() {
    return {
      isLoading: false,
      userId: null,
      cards: [],
      dialog: true,
      counter: 0,
      title: null,
      finished: false,
      postingCount: 0
    };
  },
  computed: {
    reallyFinished: {
      get: function() {
        return this.finished && !this.isLoading;
      },
      set: function(newValue) {}
    }
  },
  methods: {
    onmatch(data) {
      data.liked = true;
      data.userId = this.userId;
      data.order = this.counter;
      this.postSwipeData(data);
      this.updateTitle();
    },
    onreject(data) {
      data.liked = false;
      data.userId = this.userId;
      data.order = this.counter;
      this.postSwipeData(data);
      this.updateTitle();
    },
    updateTitle() {
      const count = ++this.counter;
      const total = this.cards.length;
      const left = total - count;
      if (left === 0) {
        if (this.postingCount > 0) {
          this.isLoading = true;
        }
        this.finished = true;
        this.title = "Finished!";
      } else if (left < 4) this.title = `${left} more!`;
      else this.title = `${count + 1}/${total}`;
    },
    postSwipeData(data, increment = true) {
      if (increment) this.postingCount++;
      data.imageId = data.imageId + "";
      axios
        .post(`${process.env.VUE_APP_API_BASE}swipes`, data)
        .then(() => {
          if (--this.postingCount === 0) {
            this.isLoading = false;
          }
        })
        .catch(err => {
          console.error(err);
          setTimeout(() => this.postSwipeData(data, false), 1000);
        });
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
