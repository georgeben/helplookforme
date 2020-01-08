<template>
  <footer class="mt-10">
    <div class="container sm:flex sm:justify-between sm:items-center">
      <div>
        <img class="h-5 px-2 mb-2 sm:mb-0" src="../../assets/images/logo.png" alt="Logo" />
      </div>
      <div class="sm:flex">
          <router-link to="/" class="block p-2 rounded-sm hover:bg-light-green sm:ml-3">Home</router-link>
          <router-link to="/search" class="block p-2 rounded-sm hover:bg-light-green sm:ml-3">Search</router-link>
          <router-link to="#" class="block p-2 rounded-sm hover:bg-light-green sm:ml-3">Support</router-link>
          <router-link to="/contact" class="block p-2 rounded-sm hover:bg-light-green sm:ml-3">Contact</router-link>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'footer',
}
</script>

<style>

</style>