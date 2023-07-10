import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { usecase } from './domain/usecases/usecaseMap';

const app = createApp(App)

app.use(createPinia())
app.use(router)

usecase('load-api').execute()

app.mount('#app')
