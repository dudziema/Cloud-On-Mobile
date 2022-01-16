import { createApp, reactive } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import webSocketService from "./services/WebSocketService";

const GStore = reactive({ flashMessage: "" });

createApp(App).use(store).use(router).use(webSocketService).provide('GStore', GStore).mount("#app");
