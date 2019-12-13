<template>
  <div id="app" class="app antialiased text-gray-800">
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
  padding: 15px;
}
</style>
