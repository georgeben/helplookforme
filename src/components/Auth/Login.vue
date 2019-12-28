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
              <input v-model="user.password" class="border border-gray-400 w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Choose a password" :class="fieldWithError == 'password'? ' border border-red-600': ''">
            </div>
            <SubmitButton text="Log in" :loading="loading" @click.native="login"/>     
            <router-link class="text-primary-dark ml-6 text-sm" to="forgot-password">Forgot password?</router-link>
          </div>
        </form>

        <div class="flex items-center justify-center mt-3 w-11/12 mx-auto">
          <hr class="flex-grow flex-shrink-0 border-b-0 border-gray-400"><span class="mx-3 text-gray-400 text-xs">OR</span><hr class="flex-grow flex-shrink-0 border-b-0 border-gray-400">
        </div>

        <div class="button-group mt-4 text-center">
          <button class=" w-11/12 border border-gray-400 hover:border-gray-500 py-2 px-4 mb-4 inline-flex items-center">
            <svg class=" h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 533.5 544.3"><path d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z" fill="#4285f4"/><path d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z" fill="#34a853"/><path d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z" fill="#fbbc04"/><path d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z" fill="#ea4335"/></svg>
            <span class="text-gray-600 mx-auto">Log in with Google</span>
          </button>

          <FacebookLogin />
          <TwitterLogin />
          <!-- <button class="w-11/12 border border-gray-400 hover:border-gray-500 py-2 px-4 mb-4 inline-flex items-center">
            <svg class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M512 97.248c-19.04 8.352-39.328 13.888-60.48 16.576 21.76-12.992 38.368-33.408 46.176-58.016-20.288 12.096-42.688 20.64-66.56 25.408C411.872 60.704 384.416 48 354.464 48c-58.112 0-104.896 47.168-104.896 104.992 0 8.32.704 16.32 2.432 23.936-87.264-4.256-164.48-46.08-216.352-109.792-9.056 15.712-14.368 33.696-14.368 53.056 0 36.352 18.72 68.576 46.624 87.232-16.864-.32-33.408-5.216-47.424-12.928v1.152c0 51.008 36.384 93.376 84.096 103.136-8.544 2.336-17.856 3.456-27.52 3.456-6.72 0-13.504-.384-19.872-1.792 13.6 41.568 52.192 72.128 98.08 73.12-35.712 27.936-81.056 44.768-130.144 44.768-8.608 0-16.864-.384-25.12-1.44C46.496 446.88 101.6 464 161.024 464c193.152 0 298.752-160 298.752-298.688 0-4.64-.16-9.12-.384-13.568 20.832-14.784 38.336-33.248 52.608-54.496z" fill="#03a9f4"/></svg>
            <span class="text-gray-600 mx-auto">Log in with Twitter</span>
          </button> -->

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
  },
  methods: {
    ...mapActions('Auth', ['localLogIn']),
    async login(){
      try {
        this.fieldWithError = '';
        this.errorMessage = '';
        await loginSchema.validate(this.user, {abortEarly: true});
        this.loading = true;
        let result = await this.localLogIn(this.user);
        this.loading = false;
        if(result){
          if(!this.$route.query.redirect){
            this.$router.replace('/')
          }
          this.$router.replace(this.$route.query.redirect)
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