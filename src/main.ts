import "normalize.css";
import "./assets/styles/global.scss";

import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { useMainStore } from "./store/main";
import i18n from "./i18n";
import { core, library } from "./core/Core";
import { createPinia } from "pinia";

const app = createApp(App);
(window as GameWindow).core = core;

app.use(i18n).use(createPinia()).use(router).mount("#app");

// Инициализация стора
await useMainStore().init();

// Загрузка ресурсов
await library.loadAll();
