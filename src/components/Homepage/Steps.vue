<template>
  <div class="p-6 text-white mx-auto md:mx-2 mt-5 w-11/12 md:w-1/4 shadow-xl rounded-lg" :style="data.style">
    <div class="rounded-full bg-white text-center w-8 h-8">
      <h1 class="text-dark font-semibold text-lg mb-2">{{data.number}}</h1>
    </div>
    <img
      :src="data.img"
      alt="Report a case"
      class=" w-20 h-20 block mx-auto my-4"
    />
    <h3 class="font-semibold text-2xl">{{data.title}}</h3>
    <p class="">
      {{data.text}}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
    }
  },
};
</script>

<style></style>
