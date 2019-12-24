<template>
 <section class="bg-gray-100 h-screen">
    <div class="container">
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import { toast } from '../../utils'
export default {
  name: 'verify-email',
  async created(){
    // Once the component is created, send a request to the API to validate the email
    const token = this.$route.query.token;
    let result = await this.verifyEmail({token,})
    if(result){
      toast.success('Successfully verified email');
      return this.$router.replace('/profile')
    }
    this.$router.replace('/')

  },
  methods: {
    ...mapActions('Auth', ['verifyEmail']),
  }
}
</script>

<style>

</style>