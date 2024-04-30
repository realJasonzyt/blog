import '@/assets/css/main.scss'
import Icon from '@/icon'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { createRouter, createWebHistory } from 'vue-router/auto'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)

app.use(
  createRouter({
    history: createWebHistory()
  })
)

Icon.setup(app)

app.mount('#app')
