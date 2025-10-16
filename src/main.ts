import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import vue3GoogleLogin from 'vue3-google-login'
import VueEasyLightbox from 'vue-easy-lightbox'

library.add(fas, far, fab)
dom.watch()

import { createApp } from 'vue'
import App from './App.vue'
// @ts-ignore
import router from './router'

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(VueEasyLightbox)
  .use(router)
  // .use(vue3GoogleLogin, {
  //     clientid: import.meta.env.VITE_GOOGLE_CLIENT_ID
  // })
  .mount('#app')
