<template>
  <section>
    <div class="container mt-20" v-if="userCases.length > 0">
      <div class="case bg-white shadow-lg p-6 sm:w-4/6 lg:flex lg:items-start mx-auto mb-6" v-for="item in userCases" :key="item.slug">
        <div class="lg:w-1/2">
          <div>
            <div class="flex justify-between items-center mb-6">
              <h1 class="text-xl font-semibold">
                {{ item.fullname }}
              </h1>

              <OptionsDropdown class="lg:hidden" :slug="item.slug" />
            </div>
            <img
              class="h-48 w-4/5 object-contain mb-4 block mx-auto"
              :src="item.photoURL"
              alt="Missing person photo"
            />
          </div>

          <div
            class="social-media-share flex flex-wrap justify-between w-5/6 mx-auto mb-6"
          >
            <TwitterShareButton :text="`Help find ${item.fullname} ${item.description}`" />

            <FacebookShareButton :url="url" />
          </div>
        </div>

        <div class="case-information leading-loose">
          <p v-if="item.nicknames.length > 0">
            <span class="text-gray-700 text-sm">Nicknames: </span>
            <span
              class="font-semibold"
              v-for="(name, i) in item.nicknames"
              :key="name"
              >{{
                item.nicknames.length > 1
                  ? item.nicknames.length - 1 > i
                    ? name + ', '
                    : name
                  : ''
              }}
            </span>
          </p>

          <p>
            <span class="text-gray-700 text-sm">Last Seen: </span>
            <span class="font-semibold">{{
              new Date(item.dateLastSeen).toDateString()
            }}</span>
          </p>
          <p>
            <span class="text-gray-700 text-sm">Gender: </span>
            <span class="font-semibold">
              {{ item.gender }}
            </span>
          </p>
          <p>
            <span class="text-gray-700 text-sm">Age: </span>
            <span class="font-semibold">
              {{ item.age }}
            </span>
          </p>
          <p>
            <span class="text-gray-700 text-sm">Address last seen: </span>
            <span class="font-semibold">
              {{ item.addressLastSeen.formatted_address }}
            </span>
          </p>
          <p>
            <span class="text-gray-700 text-sm">
              Residential address:
            </span>
            <span class="font-semibold">
              {{ item.residentialAddress.formatted_address }}
            </span>
          </p>
          <p v-if="item.physicalInformation && item.physicalInformation.height">
            <span class="text-gray-700 text-sm">
              Height:
            </span>
            <span class="font-semibold"> {{ item.physicalInformation.height }}m </span>
          </p>
          <p v-if="item.physicalInformation && item.physicalInformation.weight">
            <span class="text-gray-700 text-sm">
              Weight:
            </span>
            <span class="font-semibold"> {{ item.physicalInformation.weight }}kg </span>
          </p>
          <p>
            <span class="text-gray-700 text-sm">
              Primary language:
            </span>
            <span class="font-semibold">
              {{ item.language }}
            </span>
          </p>
          <p v-if="item.physicalInformation && item.physicalInformation.specialCharacteristics">
            <span class="text-gray-700 text-sm">
              Special characteristics:
            </span>
            <span class="font-semibold">
              {{ item.physicalInformation.specialCharacteristics }}
            </span>
          </p>
          <p v-if="item.lastSeenClothing">
            <span class="text-gray-700 text-sm">
              Cloths last worn:
            </span>
            <span class="font-semibold">
              {{ item.lastSeenClothing }}
            </span>
          </p>
          <p v-if="item.eventCircumstances">
            <span class="text-gray-700 text-sm">
              Event Description:
            </span>
            <span class="font-semibold">
              {{ item.eventCircumstances }}
            </span>
          </p>
        </div>
        <OptionsDropdown class="hidden lg:block" :slug="item.slug" />
      </div>
    </div>
    <div class="container mt-20" v-else>
      <h1 class="text-center text-xl">You haven't reported any cases yet.</h1>
    </div> 
  </section>
</template>

<script>
import OptionsDropdown from '../components/OptionsDropdown.vue';
import TwitterShareButton from '@/components/Social/TwitterShareButton.vue';
import FacebookShareButton from '@/components/Social/FacebookShareButton.vue';
import { mapActions, mapState } from 'vuex'

export default {
  name: 'reported-cases',
  components: {
    OptionsDropdown,
    TwitterShareButton,
    FacebookShareButton,
  },
  async created(){
    // Fetch the latest cases
    await this.getUserCases();
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState('User', ['userCases']),
    url(){
      let currentURL = window.location.href;
      return encodeURI(currentURL);
    }
  },
  methods: {
    ...mapActions('User', ['getUserCases']),
  }
};
</script>

<style></style>
