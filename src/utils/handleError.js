import Vue from 'vue'
export default function (error) {
  if (process.env.NODE_ENV !== 'production') {
    console.log(error)
    console.log(error.response)
  }
  switch (error.response.status) {
    default:
      Vue.toasted.show(error.response.data.error, {
        position: 'bottom-center',
        duration: 2000,
        type: 'error',
      });
      return;
  }
}