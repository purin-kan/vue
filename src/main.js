import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VueYtframe from 'vue3-ytframe'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(VueYtframe)

app.mount('#app')
