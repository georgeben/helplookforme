<template>
  <section class="w-full bg-gray-100">
    <div class="container">
      <form class="search-form mt-16 py-4 md:w-3/4 md:mx-auto">
        <input
          type="text"
          class="search-input bg-transparent h-20 sm:h-auto text-white text-lg leading-loose w-11/12 block mx-auto focus:outline-none focus:shadow-outline border-b border-white"
          placeholder="Search by name, nicknames, location, cloths they last wore..."
        />
        <button
          class="btn bg-white text-primary-dark block mt-5 mx-auto shadow-lg flex items-center"
        >
          <svg
            class="h-4 w-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            width="512px"
            height="512px"
            viewBox="0 0 30.239 30.239"
            style="enable-background:new 0 0 30.239 30.239;"
            xml:space="preserve"
          >
            <g>
              <g>
                <path
                  d="M20.194,3.46c-4.613-4.613-12.121-4.613-16.734,0c-4.612,4.614-4.612,12.121,0,16.735   c4.108,4.107,10.506,4.547,15.116,1.34c0.097,0.459,0.319,0.897,0.676,1.254l6.718,6.718c0.979,0.977,2.561,0.977,3.535,0   c0.978-0.978,0.978-2.56,0-3.535l-6.718-6.72c-0.355-0.354-0.794-0.577-1.253-0.674C24.743,13.967,24.303,7.57,20.194,3.46z    M18.073,18.074c-3.444,3.444-9.049,3.444-12.492,0c-3.442-3.444-3.442-9.048,0-12.492c3.443-3.443,9.048-3.443,12.492,0   C21.517,9.026,21.517,14.63,18.073,18.074z"
                  data-original="#000000"
                  class="active-path"
                  data-old_color="#000000"
                  fill="#308894"
                />
              </g>
            </g>
          </svg>
          <span>Search</span>
        </button>
      </form>

      <div
        class="results mt-10 md:flex md:justify-start md:flex-wrap"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="10"
      >
        <CaseCard
          v-for="item in cases"
          :key="item.slug"
          :caseData="item"
          page="search"
          data-aos="fade-up"
        />
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
    await this.getCases({ offset: this.offset, limit: this.limit });
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
        this.limit += 15;
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
