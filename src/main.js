import "bootstrap/dist/css/bootstrap.css";
import "./assets/main.css";
import { store } from "./store/index";
import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

import "bootstrap/dist/js/bootstrap";
const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
