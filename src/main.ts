import 'normalize.css'

import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import i18n from './i18n'
import { core, library } from './core/Core';

(window as GameWindow).core = core;

createApp(App).use(i18n).use(store).use(router).mount('#app')

// Загрузка ресурсов
await library.loadAll();