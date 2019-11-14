<!-- freely inspired from: https://github.com/josephharveyangeles/kittynder/blob/master/LICENSE -->
<template>
  <section class="container">
    <div class="fixed header">
      <span>{{title || 'Swipe it!'}}</span>
    </div>
    <div
      v-if="current"
      class="fixed fixed--center"
      style="z-index: 3"
      :class="{ transition: isVisible }"
    >
      <Vue2InteractDraggable
        v-if="isVisible"
        :interact-out-of-sight-x-coordinate="500"
        :interact-max-rotation="15"
        :interact-x-threshold="200"
        :interact-y-threshold="200"
        :interact-event-bus-events="interactEventBus"
        interact-block-drag-down
        @onmove="console"
        @draggedRight="emitAndNext('match')"
        @draggedLeft="emitAndNext('reject')"
        class="rounded-borders card card--one"
      >
        <div style="height: 100%">
          <img :src="require(`../assets/images/${current.src}`)" class="rounded-borders" />
          <!-- <div class="text">
            <h2>
              {{current.name}},
              <span>{{current.age}}</span>
            </h2>
          </div>-->
        </div>
      </Vue2InteractDraggable>
    </div>
    <div v-if="next" class="rounded-borders card card--two fixed fixed--center" style="z-index: 2">
      <div style="height: 100%">
        <img :src="require(`../assets/images/${next.src}`)" class="rounded-borders" />
        <!-- <div class="text">
          <h2>
            {{ next.name }},
            <span>{{ next.age }}</span>
          </h2>
        </div>-->
      </div>
    </div>
    <div
      v-if="index + 2 < cards.length"
      class="rounded-borders card card--three fixed fixed--center"
      style="z-index: 1"
    >
      <div style="height: 100%"></div>
    </div>
    <div class="footer fixed">
      <!-- TODO: helpers when click -->
      <div class="btn btn--decline" @click="openhelper(false)">
        <i class="material-icons">close</i>
      </div>
      <div class="btn btn--like" @click="openhelper(true)">
        <i class="material-icons">favorite</i>
      </div>
    </div>

    <v-dialog v-model="helpDialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Heyy!</v-card-title>

        <v-card-text>
          <br />The idea here is to collect data on swiping features... therefore you should not use the buttons to indicate your preference!
          <br />
          <br />
          You {{helpLiked ? 'liked' : 'didn\'t like' }} this picture?
          Just press your finger on the card and drag it to the {{helpLiked ? 'right' : 'left'}} of your screen until it disappears.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="helpDialog = false">Let's swipe!</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>
<script>
import { Vue2InteractDraggable, InteractEventBus } from "vue2-interact";

const EVENTS = {
  MATCH: "match",
  SKIP: "skip",
  REJECT: "reject"
};

export default {
  name: "SwipeableCards",
  components: { Vue2InteractDraggable },
  props: ["cards", "title"], // {src, name, age}
  data() {
    return {
      isVisible: true,
      index: 0,
      interactEventBus: {
        draggedRight: EVENTS.MATCH,
        draggedLeft: EVENTS.REJECT
      },
      swipeData: {
        rawX: [],
        rawTimestamps: [],
        rawTime: [],
        rawY: [],
        rawSpeedX: [],
        rawSpeedY: [],
        rawSpeed: []
      },
      swipeRelativeData: {
        lastX: 0,
        lastY: 0,
        lastT: 0
      },
      window: {
        width: 0,
        height: 0
      },
      helpDialog: false,
      helpLiked: false
    };
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  computed: {
    current() {
      return this.cards[this.index];
    },
    next() {
      return this.cards[this.index + 1];
    }
  },
  methods: {
    openhelper(liked) {
      this.helpDialog = true;
      this.helpLiked = liked;
    },
    match() {
      InteractEventBus.$emit(EVENTS.MATCH);
    },
    reject() {
      InteractEventBus.$emit(EVENTS.REJECT);
    },
    skip() {
      InteractEventBus.$emit(EVENTS.SKIP);
    },
    emitAndNext(event) {
      const meta = {
        imageId: this.cards[this.index].id,
        appWidth: this.window.width,
        appHeight: this.window.height
      };
      this.$emit(event, { ...meta, ...this.swipeData });
      // console.log(this.swipeData);
      this.swipeData = {
        rawX: [],
        rawTimestamps: [],
        rawTime: [],
        rawY: [],
        rawSpeedX: [],
        rawSpeedY: [],
        rawSpeed: []
      };
      this.swipeRelativeData = {
        lastX: 0,
        lastY: 0,
        lastT: 0
      };
      setTimeout(() => (this.isVisible = false), 200);
      setTimeout(() => {
        this.index++;
        this.isVisible = true;
      }, 200);
    },
    console(data) {
      // eslint-disable-next-line no-console
      // console.log(data);

      this.swipeRelativeData.lastX += data.dx;
      this.swipeRelativeData.lastY += data.dy;
      this.swipeRelativeData.lastT += data.dt;

      this.swipeData.rawX.push(this.swipeRelativeData.lastX);
      this.swipeData.rawY.push(this.swipeRelativeData.lastY);
      this.swipeData.rawTime.push(this.swipeRelativeData.lastT);

      this.swipeData.rawTimestamps.push(data.timeStamp);
      this.swipeData.rawSpeedX.push(data.velocityX);
      this.swipeData.rawSpeedY.push(data.velocityY);
      this.swipeData.rawSpeed.push(data.speed);
    },
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  background: #eceff1;
  width: 100%;
  height: 100vh;
}

.header {
  width: 100%;
  // height: 60vh;
  z-index: 0;
  top: 0;
  left: 0;
  color: white;
  background: #f953c6;
  // background: -webkit-linear-gradient(to top, #b91d73, #f953c6);
  // background: linear-gradient(to top, #b91d73, #f953c6);
  // clip-path: polygon(0 1%, 100% 0%, 100% 76%, 0 89%);
  display: flex;
  justify-content: space-between;
  font-size: 3rem;
  padding: 1.1rem 0;

  span {
    text-align: center;
    // padding-top: 2rem;
    width: 100%;
  }

  i {
    padding: 24px;
  }
}

.footer {
  width: 77vw;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  padding-bottom: 30px;
  justify-content: space-around;
  align-items: center;
}

.btn {
  position: relative;
  width: 50px;
  height: 50px;
  padding: 0.2rem;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 6px 6px -3px rgba(0, 0, 0, 0.02),
    0 10px 14px 1px rgba(0, 0, 0, 0.02), 0 4px 18px 3px rgba(0, 0, 0, 0.02);
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  &:active {
    transform: translateY(4px);
  }
  i {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    &::before {
      content: "";
    }
  }
  &--like {
    background-color: red;
    padding: 0.5rem;
    color: white;
    box-shadow: 0 10px 13px -6px rgba(0, 0, 0, 0.2),
      0 20px 31px 3px rgba(0, 0, 0, 0.14), 0 8px 38px 7px rgba(0, 0, 0, 0.12);
    i {
      font-size: 32px;
    }
  }
  &--decline {
    color: red;
  }
  &--skip {
    color: green;
  }
}

.flex {
  display: flex;
  &--center {
    align-items: center;
    justify-content: center;
  }
}

.fixed {
  position: fixed;
  &--center {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
.rounded-borders {
  border-radius: 12px;
}
.card {
  width: 80vw;
  height: 60vh;
  color: white;
  img {
    object-fit: cover;
    display: block;
    width: 100%;
    height: 100%;
  }
  &--one {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, 0.14),
      0 2px 1px -1px rgba(0, 0, 0, 0.12);
  }
  &--two {
    transform: translate(-48%, -48%);
    box-shadow: 0 6px 6px -3px rgba(0, 0, 0, 0.2),
      0 10px 14px 1px rgba(0, 0, 0, 0.14), 0 4px 18px 3px rgba(0, 0, 0, 0.12);
  }
  &--three {
    background: rgba(black, 0.8);
    transform: translate(-46%, -46%);
    box-shadow: 0 10px 13px -6px rgba(0, 0, 0, 0.2),
      0 20px 31px 3px rgba(0, 0, 0, 0.14), 0 8px 38px 7px rgba(0, 0, 0, 0.12);
  }
  .text {
    position: absolute;
    bottom: 0;
    width: 100%;
    background: black;
    background: rgba(0, 0, 0, 0.5);
    border-bottom-right-radius: 12px;
    border-bottom-left-radius: 12px;
    text-indent: 20px;
    span {
      font-weight: normal;
    }
  }
}

.transition {
  animation: appear 200ms ease-in;
}

@keyframes appear {
  from {
    transform: translate(-48%, -48%);
  }
  to {
    transform: translate(-50%, -50%);
  }
}
</style>
