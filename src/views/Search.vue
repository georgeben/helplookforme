<template>
  <section class="w-full bg-gray-100">
    <div class="container mt-20">
      <ais-instant-search :search-client="searchClient" :index-name="indexName">
        <ais-search-box>
          <div slot-scope="{ currentRefinement, isSearchStalled, refine }">
            <form class="search-form mb-4 py-4 md:w-3/4 md:mx-auto">
              <input
                type="search"
                class="search-input bg-transparent h-20 sm:h-auto text-white text-lg leading-loose w-11/12 block mx-auto focus:outline-none focus:shadow-outline border-b border-white"
                placeholder="Search by name, nicknames, location, cloths they last wore..."
                @input="refine($event.currentTarget.value)"
              />
              <button
                class="btn bg-white text-primary-dark block mt-5 mx-auto shadow-lg flex items-center"
              >
                <svg
                  :hidden="isSearchStalled"
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
                <span>{{ isSearchStalled? 'Searching': 'Search'}}</span>
              </button>
            </form>
            <!-- <span :hidden="!isSearchStalled">Loading...</span> -->
          </div>
        </ais-search-box>
        <ais-stats />
        <ais-hits>
          <div slot="item" slot-scope="{ item }" class="hits">
            <CaseCard :key="item.slug" :caseData="item" page="search" />
          </div>
        </ais-hits>
        <ais-pagination />
      </ais-instant-search>
    </div>
  </section>
</template>

<script>
import algoliasearch from 'algoliasearch/lite';
import CaseCard from '@/components/CaseCard.vue';
export default {
  name: 'search',
  components: {
    CaseCard,
  },
  data() {
    return {
      searchClient: algoliasearch(
        'ISSCK6BK8M',
        '4ecb3f61e231bb412bbe9e8da10de8d8',
      ),
    };
  },
  computed: {
    indexName() {
      let index =
        process.env.NODE_ENV === 'production'
          ? process.env.INDEX_NAME
          : 'dev_CASES';
      return index;
    },
  },
};
</script>

<style>
.ais-Hits-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
}

.ais-Hits-item {
  width: 30%;
  margin-right: 1.5%;
  margin-left: 1.5%;
}

.hits {
  width: 100%;
}

.search-form {
  background: linear-gradient(90deg, #67d9bc -2.79%, #73c7cf 100%);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.21);
}

.search-form .search-input::placeholder {
  color: white;
  white-space: normal;
}

.ais-Pagination-list{
  display: flex;
  justify-content: center;
}

.ais-Pagination-item{
    margin: 5px
}

@media screen and (max-width: 768px) {
  .ais-Hits-list {
    justify-content: center;
  }
  .ais-Hits-item {
    width: 46%;
    margin-right: 2%;
    margin-left: 2%;
  }
  .ais-SearchBox {
    width: 100%;
  }
}

@media screen and (max-width: 640px) {
  .ais-Hits-item {
    width: 46%;
    margin-right: 2%;
    margin-left: 2%;
  }

  .ais-SearchBox-input {
    height: auto;
  }
}

@media screen and (max-width: 480px) {
  .ais-Hits-item {
    width: 100%;
    margin-right: 10px;
  }
}
</style>
