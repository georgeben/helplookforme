import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import modules from './modules'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production';
const vuexLocal = new VuexPersistence({
  key: 'hlfm',
  storage: window.localStorage,
  reducer: state => ({
    Auth: state.Auth,
    User: state.User,
  }),
});
export default new Vuex.Store({
  strict: debug,
  modules,
  plugins: [vuexLocal.plugin]
})
