<template>
  <button
    @click="loginWithFacebook"
    class="w-11/12 border border-gray-400 hover:border-gray-500 py-2 px-4 mb-4 inline-flex items-center"
  >
    <svg
      class="h-5 w-5 mr-2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 455.73 455.73"
    >
      <path
        d="M0 0v455.73h242.704V279.691h-59.33v-71.864h59.33v-60.353c0-43.893 35.582-79.475 79.475-79.475h62.025v64.622h-44.382c-13.947 0-25.254 11.307-25.254 25.254v49.953h68.521l-9.47 71.864h-59.051V455.73H455.73V0H0z"
        fill="#3a559f"
      />
    </svg>
    <span class="text-gray-600 mx-auto"
      >{{text}}</span
    >
  </button>
</template>

<script>
export default {
  name: 'facebook-login',
  props: {
    text: {
      type: String,
      default: 'Log in with Facebook'
    }
  },
  mounted() {
    // eslint-disable-next-line no-undef
    FB.getLoginStatus(function(response) {
      // Check if the user is logged in or not
      if (response.status === 'connected') {
        // the user is logged in
      }
    });
  },
  methods: {
    loginWithFacebook() {
      // eslint-disable-next-line no-undef
      FB.login((response) => {
        console.log({response});
        this.$emit('done', response)
      }, {scope: 'public_profile,email'});
    },
  },
};
</script>

<style></style>
