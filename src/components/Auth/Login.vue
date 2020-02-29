<template>
  <section class="w-full bg-gray-100">
    <div class="container">
      <div class="bg-white shadow-lg mt-1/3 sm:mt-1/4 md:mt-40 sm:w-2/3 md:w-1/2 sm:mx-auto px-4 py-6">
        <div>
          <h1 class="text-center text-xl font-semibold pb-6 mx-auto">Log in</h1>
        </div>

        <form >
          <div class="w-11/12 mx-auto mt-4">
            <p v-if="errorMessage" class="text-sm mb-4 text-red-600">{{errorMessage}}</p>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                Email
              </label>
              <input v-model="user.email" class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" 
                placeholder="Enter your email" :class="fieldWithError == 'email'? ' border border-red-600': ''">
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                Password
              </label>
              <input v-model="user.password" class="border border-gray-400 w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Enter password" :class="fieldWithError == 'password'? ' border border-red-600': ''">
            </div>
            <SubmitButton text="Log in" :loading="loading" @click.native="login"/>     
            <router-link class="text-primary-dark ml-6 text-sm" to="forgot-password">Forgot password?</router-link>
          </div>
        </form>

        <div class="flex items-center justify-center mt-3 w-11/12 mx-auto">
          <hr class="flex-grow flex-shrink-0 border-b-0 border-gray-400"><span class="mx-3 text-gray-400 text-xs">OR</span><hr class="flex-grow flex-shrink-0 border-b-0 border-gray-400">
        </div>

        <div class="button-group mt-4 text-center">
          <GoogleSignIn @done="loginWithGoogle" />

          <FacebookLogin @done="loginWithFacebook" />
          <TwitterLogin />

        </div>
        <p class="text-gray-600 mt-4 w-11/12 mx-auto text-sm">Don't have an account yet? <router-link class="text-primary-dark" to="signup">Sign up</router-link> </p>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import FacebookLogin from './FacebookLogin';
import TwitterLogin from './TwitterLogin';
import GoogleSignIn from './GoogleSignIn';
import { loginSchema } from '../../schemas';
import SubmitButton from '../Forms/SubmitButton';
export default {
  name: 'login',
  data(){
    return {
      user: {
        email: '',
        password: '',
      },
      fieldWithError: '',
      errorMessage: '',
      loading: false,
    }
  },
  components: {
    FacebookLogin,
    TwitterLogin,
    SubmitButton,
    GoogleSignIn,
  },
  methods: {
    ...mapActions('Auth', ['localLogIn', 'googleSignIn', 'facebookSignIn']),
    signInSuccess(){
      if(!this.$route.query.redirect){
        this.$router.replace('/')
      }
      this.$router.replace(this.$route.query.redirect)
    },
    async loginWithGoogle(id_token){
      const result = await this.googleSignIn(id_token)
      if(result){
        this.signInSuccess();
      }
    },
    async loginWithFacebook(response){
      const result = await this.facebookSignIn(response.authResponse.accessToken);
      if(result){
        this.signInSuccess();
      }
    },
    async login(){
      try {
        this.fieldWithError = '';
        this.errorMessage = '';
        await loginSchema.validate(this.user, {abortEarly: true});
        this.loading = true;
        let result = await this.localLogIn(this.user);
        this.loading = false;
        if(result){
          this.signInSuccess();
        }
        
      } catch (error) {
        if(error.name === "ValidationError"){
          this.fieldWithError = error.path;
          this.errorMessage = error.message;
          return;
        }
      }
    }
  }
}
</script>

<style>

</style>