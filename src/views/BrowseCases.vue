<template>
  <section class="w-full bg-gray-100">
    <div class="container">

      <div
        class="results mt-10 md:flex md:justify-start md:flex-wrap"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="10"
        v-if="cases.length > 0"
      >
        <CaseCard
          v-for="item in cases"
          :key="item.slug"
          :caseData="item"
          page="browse"
        />
      </div>

      <div v-else class=" h-screen flex items-center justify-center">
        <h1 class="text-center text-xl mt-8 mb-16"> No cases have been reported yet 😇.</h1>
      </div>

      <div v-if="showFAB">
        <button
          class=" bg-primary-dark rounded-full shadow-lg p-4 fixed bottom-0 right-0 mr-4 mb-4" @click="scrollUp"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 31.49 31.49"
            style="enable-background:new 0 0 31.49 31.49;"
            xml:space="preserve"
            width="512px"
            height="512px"
          >
            <g
              transform="matrix(6.12323e-17 -1 1 6.12323e-17 -1.77636e-15 31.49)"
            >
              <path
                d="M21.205,5.007c-0.429-0.444-1.143-0.444-1.587,0c-0.429,0.429-0.429,1.143,0,1.571l8.047,8.047H1.111  C0.492,14.626,0,15.118,0,15.737c0,0.619,0.492,1.127,1.111,1.127h26.554l-8.047,8.032c-0.429,0.444-0.429,1.159,0,1.587  c0.444,0.444,1.159,0.444,1.587,0l9.952-9.952c0.444-0.429,0.444-1.143,0-1.571L21.205,5.007z"
                data-original="#1E201D"
                class="active-path"
                data-old_color="#1E201D"
                fill="#FFFFFF"
              />
            </g>
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import CaseCard from '@/components/CaseCard.vue';
import { mapState, mapActions } from 'vuex';
export default {
  name: 'browse-cases',
  components: {
    CaseCard,
  },
  data() {
    return {
      offset: 0,
      limit: 15,
      busy: false,
      showFAB: false,
    };
  },
  async created() {
    // Fetch cases
    if(navigator.onLine){
      this.offset = this.cases.length;
      await this.getCases({ offset: this.offset, limit: this.limit });
    }
  },
  mounted(){
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy(){
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    ...mapActions('Case', ['getCases']),
    async loadMore() {
      if (this.fetchMoreCases) {
        this.busy = true;
        this.offset += 15;
        await this.getCases({ offset: this.offset, limit: this.limit });
        this.busy = false;
      }
    },
    handleScroll(){
      if(!(window.scrollY === 0)){
        this.showFAB = true;
      } else {
        this.showFAB = false;
      }
    },
    scrollUp(){
      window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        })
    }
  },
  computed: {
    ...mapState('Case', ['cases', 'fetchMoreCases']),
  },
};
</script>

<style>
.search-form {
  background: linear-gradient(90deg, #67d9bc -2.79%, #73c7cf 100%);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.21);
}

.search-form .search-input::placeholder {
  color: white;
  white-space: normal;
}
</style>
