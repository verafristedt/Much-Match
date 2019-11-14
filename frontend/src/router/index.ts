import Vue from "vue";
import VueRouter from "vue-router";
import Swipe from "@/views/Swipe.vue";
import Tutorial from "@/views/Tutorial.vue";
import HelloWorld from "@/views/HelloWorld.vue";

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
    path: "/tutorial",
    name: "tutorial",
    component: Tutorial,
    meta: {
      title: "Tutorial (MuchMatch)"
    },
    beforeEnter: userGuard
  },
  {
    path: "/",
    name: "hello",
    component: HelloWorld
  }
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
