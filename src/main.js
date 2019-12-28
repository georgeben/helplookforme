import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toasted from 'vue-toasted'
import infiniteScroll from 'vue-infinite-scroll'
import InstantSearch from 'vue-instantsearch'
import { setAuthHeader } from './api/httpClient';
import constants from './constants'
import { storage } from './utils'
import './assets/css/tailwind.css'
import '../node_modules/nprogress/nprogress.css';
import 'aos/dist/aos.css';
import AOS from 'aos';

Vue.config.productionTip = false
Vue.use(Toasted);
Vue.use(infiniteScroll);
Vue.use(InstantSearch);

// Update the request auth header if the user ios logged in
let loggedIn = store.getters['Auth/getLoginStatus'];
let token = storage.loadState(constants.TOKEN)
if (loggedIn && token) {
  setAuthHeader();
  store.dispatch('Auth/getCurrentUserData');
}

new Vue({
  router,
  store,
  created() {
    AOS.init({once: true})
  },
  render: h => h(App)
}).$mount('#app')
