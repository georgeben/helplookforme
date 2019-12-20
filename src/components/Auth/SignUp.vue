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
            <button class="btn btn-primary" type="button" @click="signUserUp">Sign up</button>          
          </div>
        </form>

        <div class="button-group mt-10 text-center" v-else>
          <button class=" w-11/12 border border-gray-400 hover:border-gray-500 py-2 px-4 mb-4 inline-flex items-center">
            <svg class=" h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 533.5 544.3"><path d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z" fill="#4285f4"/><path d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z" fill="#34a853"/><path d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z" fill="#fbbc04"/><path d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z" fill="#ea4335"/></svg>
            <span class="text-gray-600 mx-auto">Sign up with Google</span>
          </button>

          <button class="w-11/12 border border-gray-400 hover:border-gray-500 py-2 px-4 mb-4 inline-flex items-center">
            <svg class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 455.73 455.73"><path d="M0 0v455.73h242.704V279.691h-59.33v-71.864h59.33v-60.353c0-43.893 35.582-79.475 79.475-79.475h62.025v64.622h-44.382c-13.947 0-25.254 11.307-25.254 25.254v49.953h68.521l-9.47 71.864h-59.051V455.73H455.73V0H0z" fill="#3a559f"/></svg>
            <span class="text-gray-600 mx-auto">Sign up with Facebook</span>
          </button>

          <button class="w-11/12 border border-gray-400 hover:border-gray-500 py-2 px-4 mb-4 inline-flex items-center">
            <svg class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M512 97.248c-19.04 8.352-39.328 13.888-60.48 16.576 21.76-12.992 38.368-33.408 46.176-58.016-20.288 12.096-42.688 20.64-66.56 25.408C411.872 60.704 384.416 48 354.464 48c-58.112 0-104.896 47.168-104.896 104.992 0 8.32.704 16.32 2.432 23.936-87.264-4.256-164.48-46.08-216.352-109.792-9.056 15.712-14.368 33.696-14.368 53.056 0 36.352 18.72 68.576 46.624 87.232-16.864-.32-33.408-5.216-47.424-12.928v1.152c0 51.008 36.384 93.376 84.096 103.136-8.544 2.336-17.856 3.456-27.52 3.456-6.72 0-13.504-.384-19.872-1.792 13.6 41.568 52.192 72.128 98.08 73.12-35.712 27.936-81.056 44.768-130.144 44.768-8.608 0-16.864-.384-25.12-1.44C46.496 446.88 101.6 464 161.024 464c193.152 0 298.752-160 298.752-298.688 0-4.64-.16-9.12-.384-13.568 20.832-14.784 38.336-33.248 52.608-54.496z" fill="#03a9f4"/></svg>
            <span class="text-gray-600 mx-auto">Sign up with Twitter</span>
          </button>

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
import { signUpSchema } from '../../schemas'
export default {
  name: 'signup',
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
    }
  },
  methods: {
    ...mapActions('Auth', ['signUp']),
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
          console.log(name)
          if(name.length < 2){
            console.log('why')
            this.errorMessage = `Please enter a valid ${i === 0 ? 'first':'last'}name`,
            this.fieldWithError = 'fullname'
          }
        });
        if(this.errorMessage) return;

        await signUpSchema.validate(this.user, {abortEarly: true});

        let result = await this.signUp(this.user)
        console.log({result});
        // If result is true, check if the newly signed up user has an email address
        if(result){
          if(result.email){
            // If there is an email address, inform the user that a confirmation email has been sent
            this.showConfirmEmail = true
          } else {
            return this.$router.push('/profile')
          }
        }
      } catch (error) {
        this.fieldWithError = error.path;
        this.errorMessage = error.message;
        return;
      }
      
    },
    finishSignUp(){
      return this.$router.push('/profile')
    }
  }
};
</script>

<style></style>
