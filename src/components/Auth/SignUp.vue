<template>
<!-- FIXME The height of this section is set to the height of the screen hence it pushes the footer down -->
  <section class="w-full bg-gray-100">
    <div class="container">
      <div v-if="showConfirmEmail" class="bg-white shadow-lg mt-1/3 sm:mt-1/4 md:mt-40 sm:w-2/3 md:w-1/2 sm:mx-auto px-4 py-6">
          <h1 class="text-center text-xl font-semibold pb-6 mx-auto">Confirm email</h1>
          <div class="w-11/12 mx-auto">
            <p class="text-gray-600 text-justify mb-6">Your account has been successfully created. A confirmation
            email has been sent to the email {{user.email}}. Please check your email inbox to confirm
            your email. Thank you</p>            
            <button class="btn btn-primary" type="button" @click="finishSignUp">Continue</button>          
          </div>
      </div>
      <div v-else class="bg-white shadow-lg mt-1/3 sm:mt-1/4 md:mt-40 sm:w-2/3 md:w-1/2 sm:mx-auto px-4 py-6">
        <div>
          <div class="flex w-11/12 mx-auto">
            <svg class="inline-block pt-2 cursor-pointer" v-if="showEmailFields" @click="showEmailFields = false" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" d="M15.45 17.97L9.5 12.01a.25.25 0 0 1 0-.36l5.87-5.87a.75.75 0 0 0-1.06-1.06l-5.87 5.87c-.69.68-.69 1.8 0 2.48l5.96 5.96a.75.75 0 0 0 1.06-1.06z"></path></svg>
            <h1 class="text-center text-xl font-semibold pb-6 mx-auto">Sign Up</h1>

          </div>
          <p class="text-gray-600 text-justify w-11/12 mx-auto">
            Create an account to report a case about a missing person. It only
            takes about five minutes.
          </p>
        </div>

        <form v-if="showEmailFields" >
          <div class="w-11/12 mx-auto mt-10">
            <p v-if="errorMessage" class="text-sm mb-4 text-red-600">{{errorMessage}}</p>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="fullname">
                Fullname
              </label>
              <input v-model="user.fullname" class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Firstname lastname"
                :class="fieldWithError == 'fullname'? ' border border-red-600': ''">
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                Email
              </label>
              <input v-model="user.email" class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               type="email" placeholder="Enter your email" :class="fieldWithError == 'email'? ' border border-red-600': ''">
            </div>
            <div class="mb-6">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                Password
              </label>
              <input v-model="user.password" class="border border-gray-400 w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
              type="password" placeholder="Choose a password" :class="fieldWithError == 'password'? ' border border-red-600': ''">
            </div>
            <!-- <button class="btn btn-primary" type="button" @click="signUserUp">Sign up</button>           -->
            <SubmitButton text="Sign up" @click.native="signUserUp" :loading="loading" />
          </div>
        </form>

        <div class="button-group mt-10 text-center" v-else>
          <GoogleSignIn text="Sign up with Google" @done="loginWithGoogle" />

          <FacebookLogin text="Sign up with Facebook" @done="loginWithFacebook" />

          <TwitterLogin text="Sign up with Twitter" />

          <button class="w-11/12 border border-gray-400 hover:border-gray-500 py-2 px-4 mb-4 inline-flex items-center"
            @click="showEmailFields = true"
          >
            <svg class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 483.3 483.3" style="enable-background:new 0 0 483.3 483.3;" xml:space="preserve" width="512px" height="512px"><g><g>
              <g>
                <path d="M424.3,57.75H59.1c-32.6,0-59.1,26.5-59.1,59.1v249.6c0,32.6,26.5,59.1,59.1,59.1h365.1c32.6,0,59.1-26.5,59.1-59.1    v-249.5C483.4,84.35,456.9,57.75,424.3,57.75z M456.4,366.45c0,17.7-14.4,32.1-32.1,32.1H59.1c-17.7,0-32.1-14.4-32.1-32.1v-249.5    c0-17.7,14.4-32.1,32.1-32.1h365.1c17.7,0,32.1,14.4,32.1,32.1v249.5H456.4z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#666565"/>
                <path d="M304.8,238.55l118.2-106c5.5-5,6-13.5,1-19.1c-5-5.5-13.5-6-19.1-1l-163,146.3l-31.8-28.4c-0.1-0.1-0.2-0.2-0.2-0.3    c-0.7-0.7-1.4-1.3-2.2-1.9L78.3,112.35c-5.6-5-14.1-4.5-19.1,1.1c-5,5.6-4.5,14.1,1.1,19.1l119.6,106.9L60.8,350.95    c-5.4,5.1-5.7,13.6-0.6,19.1c2.7,2.8,6.3,4.3,9.9,4.3c3.3,0,6.6-1.2,9.2-3.6l120.9-113.1l32.8,29.3c2.6,2.3,5.8,3.4,9,3.4    c3.2,0,6.5-1.2,9-3.5l33.7-30.2l120.2,114.2c2.6,2.5,6,3.7,9.3,3.7c3.6,0,7.1-1.4,9.8-4.2c5.1-5.4,4.9-14-0.5-19.1L304.8,238.55z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#666565"/>
              </g>
            </g></g> 
            </svg>
            <span class="text-gray-600 mx-auto">Sign up with Email</span>
          </button>
        </div>
        <p class="text-gray-600 mt-4 w-11/12 mx-auto text-sm">Already have an account? <router-link class="text-primary-dark" to="login">Log in</router-link> </p>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import { signUpSchema } from '../../schemas';
import SubmitButton from '../Forms/SubmitButton';
import GoogleSignIn from './GoogleSignIn';
import FacebookLogin from './FacebookLogin';
import TwitterLogin from './TwitterLogin';

export default {
  name: 'signup',
  components: {
    SubmitButton,
    GoogleSignIn,
    FacebookLogin,
    TwitterLogin,
  },
  data(){
    return {
      user: {
        fullname: '',
        email: '',
        password: '',
      },
      showEmailFields: false,
      errorMessage: '',
      showConfirmEmail: false,
      fieldWithError: '',
      loading: false,
    }
  },
  methods: {
    ...mapActions('Auth', ['signUp', 'googleSignIn', 'facebookSignIn']),
    signInSuccess(){
      if(!this.$route.query.redirect){
        this.$router.replace('/')
      }
      this.$router.replace(this.$route.query.redirect)
    },
    async signUserUp(){
      try {
        this.errorMessage = '';
        this.fieldWithError = '';
        // Check if the fullname is in the right format
        let names = this.user.fullname.split(' ');
        if(names.length !== 2){
          this.fieldWithError = 'fullname';
          this.errorMessage = 'Please enter firstname and lastname';
          return;
        }
        names = names.map(name => name.trim())
        names.forEach((name, i) => {
          if(name.length < 2){
            this.errorMessage = `Please enter a valid ${i === 0 ? 'first':'last'}name`,
            this.fieldWithError = 'fullname'
          }
        });
        if(this.errorMessage) return;

        await signUpSchema.validate(this.user, {abortEarly: true});
        this.loading = true;

        let result = await this.signUp(this.user)
        this.loading = false;
        // If result is true, check if the newly signed up user has an email address
        if(result){
          if(result.email){
            // If there is an email address, inform the user that a confirmation email has been sent
            this.showConfirmEmail = true
          } else {
            return this.$router.replace('/profile')
          }
        }
      } catch (error) {
        if(error.name === "ValidationError"){
          this.fieldWithError = error.path;
          this.errorMessage = error.message;
          return;
        }
      }
      
    },
     async loginWithGoogle(user){
      const result = await this.googleSignIn(user.Zi.id_token)
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
    finishSignUp(){
      return this.$router.replace('/profile')
    }
  }
};
</script>

<style></style>
