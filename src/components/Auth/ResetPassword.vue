<template>
  <section class="w-full bg-gray-100">
    <div class="container">
      <div class="bg-white shadow-lg mt-1/3 sm:mt-1/4 md:mt-40 sm:w-2/3 md:w-1/2 sm:mx-auto px-4 py-6">
      <h1 class="text-center text-xl font-semibold pb-6">Reset Password</h1>
        <form>
          <p class="error-info mt-4" v-if="errorMessage">{{errorMessage}}</p>
          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
              New Password
            </label>
            <input v-model="newPassword" class="border border-gray-400 w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
            type="password" placeholder="Choose a new password" :class="fieldWithError == 'newPassword'? ' border border-red-600': ''">
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
              Confirm Password
            </label>
            <input v-model="confirmPassword" class="border border-gray-400 w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
            type="password" placeholder="Type in the password again" :class="fieldWithError == 'confirmPassword'? ' border border-red-600': ''">
          </div>

           <SubmitButton @click.native="resetPassword" text="Reset password" :loading="loading" />
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import SubmitButton from '../Forms/SubmitButton';
import { authEndpoint } from '../../api';
import { handleError, toast } from '../../utils'
export default {
  name: 'reset-password',
  components: {
    SubmitButton,
  },
  created(){
    const token = this.$route.query.token;
    if(!token){
      this.$router.replace('/')
    }
  },
  data(){
    return {
      newPassword: '',
      confirmPassword: '',
      fieldWithError: '',
      errorMessage: '',
      loading: false,
    }
  },
  methods: {
    async resetPassword(){
      this.errorMessage = '';
      this.fieldWithError = '';
      // Validate password
      if(this.newPassword.length < 4){
        this.errorMessage = 'Password must be at least four characters';
        this.fieldWithError = 'newPassword';
        return;
      }

      if(this.newPassword !== this.confirmPassword){
        this.errorMessage = 'Passwords don\'t match';
        this.fieldWithError = 'confirmPassword';
        return;
      }

      try {
        const token = this.$route.query.token;
        this.loading = true;
        let result = await authEndpoint.resetPassword({password: this.newPassword, token, });
        this.loading = false;
        if(result.data.data.message){ 
          toast.success('Successfully reset password');
          return this.$router.replace('/auth')
        }
      } catch (error) {
        this.loading = false;
        handleError(error);
        return this.$router.replace('/');
      }

    }
  }
}
</script>

<style>

</style>