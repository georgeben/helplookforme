
<template>
  <section class="w-full bg-gray-100">
    <div class="container">
      <div class="bg-white shadow-lg mt-1/3 sm:mt-1/4 md:mt-40 sm:w-2/3 md:w-1/2 sm:mx-auto px-4 py-6">
        <div class="w-11/12 mx-auto">
          <h1 class="text-center text-xl font-semibold pb-6">Forgot Password</h1>
          <p class=" text-gray-600 text-justify" v-if="!emailSent">
            Oops! You forgot your password? No worries! Enter your email and a password reset link would be sent to you.
          </p>
          <div v-if="emailSent">
            <p class=" text-gray-600 text-justify mx-auto">
              An email has been sent to {{email}}. Check your inbox for instructions on how to reset your password.
            </p>
            <p class="text-gray-600 mt-4">Wrong email? <span class="text-primary-dark cursor-pointer" @click="emailSent = false">Enter a different email</span></p> 
          </div>
        </div>

        <form v-if="!emailSent" class="w-11/12 mx-auto">
          <p class="error-info mt-4" v-if="errorMessage">{{errorMessage}}</p>
          <div class="mx-auto mt-4">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                Email
              </label>
              <input class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              :class="fieldWithError == 'email'? ' border border-red-600': ''"
                type="email" placeholder="Enter your email" v-model="email">
            </div>
            <SubmitButton @click.native="forgotPassword" :loading="loading" />
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { authEndpoint } from '../../api';
import { handleError, toast } from '../../utils';
import SubmitButton from '../Forms/SubmitButton.vue';
import * as yup from 'yup';
export default {
  name:  'forgot-password',
  components: {
    SubmitButton,
  },
  data(){
    return {
      email: '',
      emailSent: false,
      fieldWithError: '',
      errorMessage: '',
      loading: false,
    }
  },
  methods: {
    async forgotPassword(){
      this.fieldWithError = ''
      this.errorMessage = '';
      try {
        const schema = yup.object().shape({
          email: yup.string().email('Please enter a valid email').required('Please enter your email'),
        })
        await schema.validate({email: this.email});
        this.loading = true;
        let result = await authEndpoint.forgotPassword(this.email);
        this.loading = false;
        if(result.data.data.message){
          this.emailSent = true;
        }
      } catch (error) {
        if(error.name === "ValidationError"){
          this.fieldWithError = error.path;
          this.errorMessage = error.message;
          return;
        }
        this.loading = false;
        if(error.response && error.response.status === 404){
          return toast.error('Sorry that email is not registered');
        }
        return handleError(error);
      }
    }
  }
}
</script>

<style>

</style>