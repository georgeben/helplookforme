import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toasted from 'vue-toasted'
import { setAuthHeader } from './api/httpClient';
import constants from './constants'
import { storage } from './utils'
import './assets/css/tailwind.css'

Vue.config.productionTip = false
Vue.use(Toasted)

// Update the request auth header if the user ios logged in
let loggedIn = store.getters['Auth/getLoginStatus'];
let token = storage.loadState(constants.TOKEN)
if (loggedIn && token) {
  setAuthHeader();
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
