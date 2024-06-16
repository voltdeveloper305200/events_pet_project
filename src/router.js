import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";
import MyEvents from "./pages/MyEvents.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/my-events",
    name: "My events",
    component: MyEvents,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
