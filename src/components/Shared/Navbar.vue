<template>
  <header>
    <nav class="py-2">
      <div class="flex items-center justify-between ">
        <div>
          <img class="h-5" src="../../assets/images/logo.png" alt="Logo" />
        </div>
        <div>
          <button
            type="button"
            class="block text-dark hover:text-dark-100 focus:text-dark-100"
          >
            <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <path
                fill-rule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div class=" text-sm">
        <a href="#" class="block pt-3 ">Home</a>
        <a href="#" class="block pt-3">Search</a>
        <a href="#" class="block pt-3">About</a>
        <a href="#" class="block pt-3">Support</a>
        <a href="#" class="block pt-3">Contact</a>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'navbar',
};
</script>

<style></style>
