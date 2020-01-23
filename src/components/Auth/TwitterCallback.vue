<template>
  <div class="h-screen"></div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'twitter-callback',
  async created(){
    let oauth_token = this.$route.query.oauth_token;
    let oauth_verifier = this.$route.query.oauth_verifier;
    let result = await this.twitterSignIn({
      oauth_token,
      oauth_verifier,
    });

    if(result){
      // Sign in was successful
      return this.$router.replace('/profile');
    }
    return this.$router.replace('/auth/login')
  },
  methods: {
    ...mapActions('Auth', ['twitterSignIn'])
  },
}
</script>

<style>

</style>