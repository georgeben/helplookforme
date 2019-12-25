import Vue from 'vue'
import store from '../store';
import router from '../router'
export default function (error) {
  if (process.env.NODE_ENV !== 'production') {
    console.log(error)
  }
  switch (error.response.status) {
    case 401:
      // Quietly log the user out and send the user to the login screen
      store.dispatch('Auth/logout');
      router.replace('/auth/login')
      break;
    default:
      Vue.toasted.show(error.response.data.error, {
        position: 'bottom-center',
        duration: 2000,
        type: 'error',
      });
      return;
  }
}