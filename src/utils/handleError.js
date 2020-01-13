import store from '../store';
import router from '../router';
import toast from './toast';
export default function (error) {
  if (process.env.NODE_ENV !== 'production') {
    // console.log(error);
  }
  if (!error.response) {
    return toast.error('Something wen\'t wrong, please try again later')
  }
  switch (error.response.status) {
    case 401:
      // Quietly log the user out and send the user to the login screen
      toast.error(error.response.data.error);
      store.dispatch('Auth/logout');
      if (router.currentRoute.path === '/auth/login') {
        return;
      }
      router.replace('/auth/login');
      break;
    case 404:
      toast.error(
        error.response.data.error ||
          "Something wen't wrong. The resource you are requesting for isn't found",
      );
      return router.push({ name: 'not-found' });
    case 500:
      return toast.error('Something bad happened. Please try again later');
    default:
      toast.error(error.response.data.error);
      return;
  }
}