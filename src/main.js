import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import webSocketService from "./services/WebSocketService";

createApp(App).use(store).use(router).use(webSocketService).mount("#app");
