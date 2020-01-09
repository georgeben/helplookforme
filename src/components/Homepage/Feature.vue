<template>
  <div class="feature shadow-lg p-6 mx-auto md:mx-2 mt-5 w-11/12 md:w-30">
    <h3 class="text-dark my-6 text-center text-xl font-bold">{{title}}</h3>
    <p class=" text-gray-600 text-center text-md mt-4 leading-loose">
      {{body}}
    </p>
  </div>
</template>

<script>
export default {
  name: 'feature',
  props: ['title', 'body']
};
</script>

<style></style>
