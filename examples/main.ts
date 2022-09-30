import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'

// import customUiLibs from '../packages/index'
// .use(customUiLibs)

createApp(App).use(router).mount('#app')

// createApp(App).use(store).use(router).use(customUiLibs).mount('#app')
