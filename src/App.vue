<template>
  <div id="app" class="app antialiased text-gray-800">
    <Navbar />
    <router-view :key="$route.fullPath"/>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Shared/Navbar.vue';
import Footer from '@/components/Shared/Footer.vue';
export default {
  name: 'app',
  components: {
    Navbar,
    Footer
  },
  mounted() {
    let twitterScript = document.createElement('script');
    let fbScript = document.createElement('script');
    twitterScript.setAttribute(
      'src',
      'https://platform.twitter.com/widgets.js',
    );
    fbScript.setAttribute(
      'src',
      'https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v5.0&appId=430025197616958&autoLogAppEvents=1',
    );
    document.head.appendChild(twitterScript);
    document.head.appendChild(fbScript);
  }
}
</script>

<style>
.container{
  margin: 0 auto;
  padding: 15px;
}
</style>
