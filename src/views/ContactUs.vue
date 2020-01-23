<template>
  <section class="w-full bg-gray-100">
    <div class="container">
      <div class="bg-white shadow-lg mt-1/3 sm:mt-1/4 md:mt-40 sm:w-2/3 md:w-1/2 sm:mx-auto px-4 py-6 mb-8">
        <div>
          <h1 class="text-center text-xl font-semibold pb-6 mx-auto">Contact Us</h1>
          <p class="text-gray-600 text-justify w-11/12 mx-auto">
            Want to get in touch? Send a message, we would love to hear from you.😄 Emails are sent via <a href="https://sendgrid.com">SendGrid</a>
          </p>
        </div>

        <form >
          <div class="w-11/12 mx-auto mt-4">
            <p v-if="errorMessage" class="text-sm mb-4 text-red-600">{{errorMessage}}</p>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="fullname">
                Fullname
              </label>
              <input v-model="fullname" class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Firstname lastname"
                :class="fieldWithError == 'fullname'? ' border border-red-600': ''">
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                Email
              </label>
              <input v-model="email" class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" 
                placeholder="Enter your email" :class="fieldWithError == 'email'? ' border border-red-600': ''">
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                Message
              </label>
              <textarea v-model="message" class="border border-gray-400 w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                :class="fieldWithError == 'message'? ' border border-red-600': ''"
                minlength="70"
                rows="4"
                placeholder="Enter your message">

              </textarea>
            </div>
            <SubmitButton text="Send message" :loading="loading" @click.native="sendMessage"/>     
          </div>
        </form>

      </div>
    </div>
  </section>
</template>

<script>
import SubmitButton from '@/components/Forms/SubmitButton.vue';
import { contactUsSchema } from '../schemas';
import { contact } from '../api';
import { handleError, toast } from '../utils'
export default {
  name: 'contact-us',
  components: {
    SubmitButton,
  },
  data(){
    return {
      fullname: '',
      email: '',
      message: '',
      loading: false,
      fieldWithError: '',
      errorMessage: '',
    }
  },
  methods: {
    resetState(){
      this.fullname = '';
      this.email = '';
      this.message = '';
    },
    async sendMessage(){
      this.fieldWithError = '';
      this.errorMessage = '';
      try {
        await contactUsSchema.validate({
          fullname: this.fullname,
          email: this.email,
          message: this.message
        }, { abortEarly: true })

         await contact.sendMessage({
          fullname: this.fullname,
          email: this.email,
          message: this.message
        });
        this.loading = true;
        toast.success('Thanks for your message!');
        this.loading = false;
        this.resetState();

      } catch (error) {
        if(error.name === "ValidationError"){
          this.fieldWithError = error.path;
          this.errorMessage = error.message;
          return;
        }
        return handleError(error);
      }
    }
  }
}
</script>

<style>

</style>