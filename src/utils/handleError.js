import store from '../store';
import router from '../router';
import toast from './toast';
export default function (error) {
  if (process.env.NODE_ENV !== 'production') {
    console.log(error)
  }
  switch (error.response.status) {
    case 401:
      // Quietly log the user out and send the user to the login screen
      toast.error(error.response.data.error);
      store.dispatch('Auth/logout');
      if (router.currentRoute.path === '/auth/login') {
        return;
      }
      router.replace('/auth/login')
      break;
    default:
      toast.error(error.response.data.error);
      return;
  }
}