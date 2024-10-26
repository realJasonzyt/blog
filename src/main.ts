import '@/assets/css/main.scss'
import Icon from '@/scripts/icon'
import 'github-markdown-css/github-markdown.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'

import { createRouter, createWebHistory, DataLoaderPlugin } from 'vue-router/auto'

import { createApp } from 'vue'
import App from './App.vue'

import 'reflect-metadata'

const router = createRouter({
  history: createWebHistory()
})

const app = createApp(App)

app.use(ElementPlus)

app.use(router)

app.use(DataLoaderPlugin, { router })

Icon.setup(app)

app.mount('#app')
