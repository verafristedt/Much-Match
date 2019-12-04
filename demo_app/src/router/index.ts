import Vue from "vue";
import VueRouter from "vue-router";
import Tutorial from "@/views/Tutorial.vue";

Vue.use(VueRouter);

const routes = [
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
