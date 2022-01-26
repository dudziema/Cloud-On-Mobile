
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import PhoneFiles from "../views/PhoneFiles.vue";
import ErrorScreen from "../views/ErrorScreen.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/phonefiles",
    name: "PhoneFiles",
    component: PhoneFiles,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/error",
    name: "ErrorScreen",
    component: ErrorScreen,
  },
];



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
