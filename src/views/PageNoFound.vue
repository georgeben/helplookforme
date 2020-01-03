<template>
  <section class=" mt-16">
    <div class="container">
      <div class="text-center">
        <h1 class="text-gray-800 text-center text-xl font-semibold mx-auto">Oops! The page you are trying to visit does not exist</h1>
        <router-link :to="{name: 'home'}" class=" font-semibold text-primary-dark text-lg">Go home</router-link>
      </div>
      <img class="w-9/12 block mx-auto" src="../assets/images/pagenotfound.png" alt="Page not found">

    </div>
  </section>
</template>

<script>
export default {
  name: 'page-not-found'
}
</script>

<style>

</style>