import './assets/css/main.scss'
import IconMap from './icons'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)

for (const [key, value] of Object.entries(IconMap)) {
  app.component('Icon' + key, {
    name: 'Icon' + key,
    template: value
  })
  console.log(app.component('Icon' + key))
}

app.mount('#app')
