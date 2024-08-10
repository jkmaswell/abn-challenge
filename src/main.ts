import '@/assets/css/normalize.css'
import { router } from '@/router'
import '@/styles/styles.scss'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'

createApp(App)
  .use(createPinia())
  .use(router)
  .mount('#app')
