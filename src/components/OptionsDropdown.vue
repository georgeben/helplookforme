<template>
  <div class="ml-auto relative">
    <button @click="isOpen = ! isOpen" class="focus:outline-none focus:shadow-outline">
      <svg
        class="h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
        id="Capa_1"
        x="0px"
        y="0px"
        viewBox="0 0 60 60"
        style="enable-background:new 0 0 60 60;"
        xml:space="preserve"
        width="512px"
        height="512px"
      >
        <g>
          <g>
            <path
              d="M8,22c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S12.411,22,8,22z"
              data-original="#000000"
              class="active-path"
              data-old_color="#000000"
              fill="#2D3748"
            />
            <path
              d="M52,22c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S56.411,22,52,22z"
              data-original="#000000"
              class="active-path"
              data-old_color="#000000"
              fill="#2D3748"
            />
            <path
              d="M30,22c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S34.411,22,30,22z"
              data-original="#000000"
              class="active-path"
              data-old_color="#000000"
              fill="#2D3748"
            />
          </g>
        </g>
      </svg>
    </button>
    <button v-if="isOpen" @click="isOpen = false" class="fixed inset-0 w-full h-full bg-black opacity-5 cursor-default" tabindex="-1"></button>
    <div class="bg-white py-2 absolute right-0 shadow-lg w-32 text-center" v-if="isOpen">
      <router-link :to="`edit/${slug}`" class="block px-3 hover:text-gray-600 mx-auto my-2">Edit Case</router-link>
      <button class="block px-3 hover:text-red-500 mx-auto my-2 text-red-600">
        Close Case
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'options-dropdown',
  props:['slug'],
  data(){
    return {
      isOpen: false,
    }
  },
  methods: {
    handleEscape(e){
      if(e.key === 'Esc' || e.key === 'Escape'){
        this.isOpen = false;
      }
    }
  },
  created(){
    document.addEventListener('keydown', this.handleEscape)
  },
  beforeDestroy(){
    document.removeEventListener('keydown', this.handleEscape)
  }
};
</script>

<style></style>
