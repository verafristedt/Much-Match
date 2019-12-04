import Vue from "vue";
import VueRouter from "vue-router";
import Swipe from "@/views/Swipe.vue";
import Tutorial from "@/views/Tutorial.vue";

Vue.use(VueRouter);

const userGuard = (to: any, from: any, next: any) => {
  if (!!window.localStorage.getItem("userId")) next();
  else next("/");
};

const routes = [
  {
    path: "/swipe",
    name: "swipe",
    component: Swipe,
    meta: {
      title: "Swipe it! (MuchMatch)"
    },
    beforeEnter: userGuard
  },
  {
    path: "/",
    name: "tutorial",
    component: Tutorial,
    meta: {
      title: "Tutorial (MuchMatch)"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
