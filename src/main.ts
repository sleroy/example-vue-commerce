import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { usecase } from './domain/usecases/usecaseMap';
import Toast, { PluginOptions } from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const app = createApp(App)

app.use(createPinia())
app.use(router)

const options: PluginOptions = {
    // You can set your default options here
};

app.use(Toast, options);

usecase('load-api').execute()

app.mount('#app')
