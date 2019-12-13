<template>
  <header>
    <nav class="navbar fixed top-0 left-0 right-0 w-full z-10" :class="[showNavbar?'': 'navbar-hidden', lastScrollPosition > navbarHeight ? 'nav-solid': '', isMobileNavOpen ? 'nav-solid': '']">
      <div class="container py-2 sm:flex sm:justify-between sm:items-center">
        <div class="flex items-center justify-between ">
          <div>
            <router-link to="/">
              <img class="h-5 px-2" src="../../assets/images/logo.png" alt="Logo" />
            </router-link>
          </div>
          <div>
            <button
              type="button"
              class="block text-dark px-2 hover:text-dark-100 focus:text-dark-100 sm:hidden"
              @click="isMobileNavOpen = !isMobileNavOpen"
            >
              <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path v-if="isMobileNavOpen" fill-rule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"/>
                <path v-else
                  fill-rule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div class="text-sm mt-2 sm:flex" :class="isMobileNavOpen ? '': 'hidden'">
          <router-link to="/" class="block p-2 rounded-sm hover:bg-light-green sm:ml-3">Home</router-link>
          <a href="#" class="block p-2 rounded-sm hover:bg-light-green sm:ml-3">Search</a>
          <a href="#" class="block p-2 rounded-sm hover:bg-light-green sm:ml-3">About</a>
          <a href="#" class="block p-2 rounded-sm hover:bg-light-green sm:ml-3">Support</a>
          <a href="/profile" class="block p-2 rounded-sm hover:bg-light-green sm:ml-3">My profile</a>
          <a href="#" class="block p-2 rounded-sm hover:bg-light-green sm:ml-3">Contact</a>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'navbar',
  data(){
    return {
      isMobileNavOpen: false,
      showNavbar: true,
      lastScrollPosition: 0,
      navbarHeight: 61,
    }
  },
  mounted(){
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy(){
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll(){
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      if(currentScrollPosition < 0){
        // Mobile devices scroll up with momentum and may go off the page
        return;
      }
      this.showNavbar = currentScrollPosition < this.lastScrollPosition;
      this.lastScrollPosition = currentScrollPosition;
    }
  }
};
</script>

<style>
.navbar{
  transform: translate3d(0, 0, 0);
  transition: 0.3s all ease-out;
}
.navbar.navbar-hidden{
  box-shadow: none;
  transform: translate3d(0, -100%, 0);
}
</style>
