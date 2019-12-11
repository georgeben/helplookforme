<template>
  <div id="app" class="app antialiased text-gray-900">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <Navbar />
    <router-view/>
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
  }
}
</script>

<style>
.container{
  margin: 0 auto;
  padding: 20px;
}
</style>
