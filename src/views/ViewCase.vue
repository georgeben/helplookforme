<template>
  <section class="bg-gray-100 pt-10">
    <div class="container">
      <div class="mt-10 sm:flex sm:justify-between sm:items-start">
        <div class="case bg-white shadow-lg p-4 sm:w-4/6 lg:flex">
          <div class="lg:w-1/2 lg:mr-4">
            <div class="case-photo">
              <h1 class="text-xl md:text-xl font-semibold mb-4">{{ caseData.fullname }}</h1>
              <div class=" pb-11/12 relative mb-4">
                <img
                  class="h-full w-full object-cover absolute"
                  :src="caseData.photoURL"
                  alt="Missing person photo"
                />
              </div>
            </div>

            <div
              class="social-media-share flex flex-wrap justify-between w-5/6 mx-auto mb-6"
            >
              <TwitterShareButton :text="`Help find ${caseData.fullname} ${caseData.description}`" />

              <FacebookShareButton :url="url" />
            </div>
          </div>

          <div class="case-information leading-loose lg:w-1/2 lg:mt-8 lg:p-4">
            <p v-if="caseData.nicknames && caseData.nicknames.length > 0">
              <span class="text-gray-700 text-sm">Nicknames: </span>
              <span
                class="font-semibold"
                v-for="(name, i) in caseData.nicknames"
                :key="name"
                >{{
                  caseData.nicknames.length > 1
                    ? caseData.nicknames.length - 1 > i
                      ? name + ', '
                      : name
                    : ''
                }}
              </span>
            </p>

            <p>
              <span class="text-gray-700 text-sm">Last Seen: </span>
              <span class="font-semibold">{{
                new Date(caseData.dateLastSeen).toDateString()
              }}</span>
            </p>
            <p>
              <span class="text-gray-700 text-sm">Gender: </span>
              <span class="font-semibold">
                {{ caseData.gender }}
              </span>
            </p>
            <p>
              <span class="text-gray-700 text-sm">Age: </span>
              <span class="font-semibold">
                {{ caseData.age }}
              </span>
            </p>
            <p>
              <span class="text-gray-700 text-sm">Address last seen: </span>
              <span class="font-semibold">
                {{ caseData.addressLastSeen.formatted_address }}
              </span>
            </p>
            <p>
              <span class="text-gray-700 text-sm">
                Residential address:
              </span>
              <span class="font-semibold">
                {{ caseData.residentialAddress.formatted_address }}
              </span>
            </p>
            <p v-if="caseData.height">
              <span class="text-gray-700 text-sm">
                Height:
              </span>
              <span class="font-semibold"> {{ caseData.height }}m </span>
            </p>
            <p v-if="caseData.weight">
              <span class="text-gray-700 text-sm">
                Weight:
              </span>
              <span class="font-semibold"> {{ caseData.weight }}kg </span>
            </p>
            <p>
              <span class="text-gray-700 text-sm">
                Primary language:
              </span>
              <span class="font-semibold">
                {{ caseData.language }}
              </span>
            </p>
            <p v-if="caseData.physicalInformation && caseData.physicalInformation.specialCharacteristics">
              <span class="text-gray-700 text-sm">
                Special characteristics:
              </span>
              <span class="font-semibold">
                {{ caseData.physicalInformation.specialCharacteristics }}
              </span>
            </p>
            <p v-if="caseData.lastSeenClothing">
              <span class="text-gray-700 text-sm">
                Cloths last worn:
              </span>
              <span class="font-semibold">
                {{ caseData.lastSeenClothing }}
              </span>
            </p>
            <p v-if="caseData.eventCircumstances">
              <span class="text-gray-700 text-sm">
                Event Circumstances:
              </span>
              <span class="font-semibold">
                {{ caseData.eventCircumstances }}
              </span>
            </p>

            <div class="report-information bg-red-600 text-white p-2 mt-4">
              <p>
                If you have any helpful information about the whereabouts of
                {{ caseData.fullname }}, please contact the police station nearest to you.
              </p>
            </div>
          </div>
        </div>

        <div class="related-cases mt-6 sm:mt-0 sm:w-30 sm:flex sm:flex-wrap">
          <h3 class="font-bold text-lg sm:text-base">View other cases</h3>
          <CaseCard
            v-for="item in relatedCases"
            :key="item.slug"
            :caseData="item"
            page="suggestion"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CaseCard from '@/components/CaseCard.vue';
import TwitterShareButton from '@/components/Social/TwitterShareButton.vue';
import FacebookShareButton from '@/components/Social/FacebookShareButton.vue';
import { handleError } from '../utils'
import { mapGetters } from 'vuex';
import { caseEndpoint } from '../api'
export default {
  name: 'view-case',
  components: {
    CaseCard,
    TwitterShareButton,
    FacebookShareButton,
  },
  async created(){
    // Check if the case is in the store, If it isn't fetch it from the API
    let caseSlug = this.$route.params.slug;
    // Fetch case from API
    try {
      let caseData = this.getCaseBySlug(caseSlug);
      if(caseData){
        this.caseData = caseData
      } else {
        let result = await caseEndpoint.getCase(caseSlug);
        this.caseData = result.data.data.case;
      }

      // Get related cases
      const response = await caseEndpoint.getRelatedCases(caseSlug);
      this.relatedCases = response.data.data.cases;
      
    } catch (error) {
      return handleError(error);
    }
  },
  computed: {
    ...mapGetters('Case', ['getCaseBySlug']),
    url(){
      let currentURL = window.location.href;
      return encodeURI(currentURL);
    }
  },
  data() {
    return {
      caseData: {},
      relatedCases: [],
    };
  },
  methods: {
  }
};
</script>

<style></style>
