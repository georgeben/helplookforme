<template>
  <section>
    <div class="container mt-20" v-if="reportedCases.length > 0">
      <div class="case bg-white shadow-lg p-6 sm:w-4/6 lg:flex lg:items-start mx-auto mb-6" v-for="item in reportedCases" :key="item.slug">
        <div class="lg:w-1/2">
          <div>
            <div class="flex justify-between items-center mb-6">
              <h1 class="text-xl font-semibold">
                {{ item.fullname }}
              </h1>

              <OptionsDropdown class="lg:hidden" />
            </div>
            <img
              class="h-48 w-full object-contain mb-4"
              src="../assets/images/boy.png"
              alt="Missing person photo"
            />
          </div>

          <div
            class="social-media-share flex flex-wrap justify-between w-5/6 mx-auto mb-6"
          >
            <!-- TODO Create separate components for tweet and share buttons -->
            <a
              href="https://twitter.com/share?ref_src=twsrc%5Etfw"
              class="twitter-share-button"
              :data-text="`Help find ${item.name} ${item.description}`"
              data-via="helplookforme"
              data-hashtags="HelpLookForMe"
              data-show-count="false"
              data-size="large"
              >Tweet</a
            >

            <div
              class="fb-share-button"
              data-href="http://helplookfor.me"
              data-layout="button_count"
              data-size="large"
            >
              <a
                target="_blank"
                href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fhelplookfor.me%2F&amp;src=sdkpreparse"
                class="fb-xfbml-parse-ignore"
                >Share</a
              >
            </div>
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
              {{ item.addressLastSeen }}
            </span>
          </p>
          <p>
            <span class="text-gray-700 text-sm">
              Residential address:
            </span>
            <span class="font-semibold">
              {{ item.redisdentialAddress }}
            </span>
          </p>
          <p v-if="item.height">
            <span class="text-gray-700 text-sm">
              Height:
            </span>
            <span class="font-semibold"> {{ item.height }}m </span>
          </p>
          <p v-if="item.weight">
            <span class="text-gray-700 text-sm">
              Weight:
            </span>
            <span class="font-semibold"> {{ item.weight }}kg </span>
          </p>
          <p>
            <span class="text-gray-700 text-sm">
              Primary language:
            </span>
            <span class="font-semibold">
              {{ item.language }}
            </span>
          </p>
          <p v-if="item.specialCharacteristics">
            <span class="text-gray-700 text-sm">
              Special characteristics:
            </span>
            <span class="font-semibold">
              {{ item.specialCharacteristics }}
            </span>
          </p>
          <p v-if="item.clothsLastWorn">
            <span class="text-gray-700 text-sm">
              Cloths last worn:
            </span>
            <span class="font-semibold">
              {{ item.clothsLastWorn }}
            </span>
          </p>
          <p v-if="item.eventDescription">
            <span class="text-gray-700 text-sm">
              Event Description:
            </span>
            <span class="font-semibold">
              {{ item.eventDescription }}
            </span>
          </p>
        </div>
        <OptionsDropdown class="hidden lg:block" />
      </div>
    </div>
    <div class="container mt-20">
      <h1 class="text-center text-xl">You haven't reported any cases yet.</h1>
    </div> 
  </section>
</template>

<script>
import OptionsDropdown from '../components/OptionsDropdown.vue';

export default {
  name: 'reported-cases',
  components: {
    OptionsDropdown,
  },
  data() {
    return {
      reportedCases: [
        {
          eventDescription: 'Naso',
          slugParam: this.$route.params.slug,
          name: 'Anthony Joshua',
          nicknames: ['Abe', 'Jboy'],
          solved: false,
          fullname: 'Erema Woman',
          age: 23,
          gender: 'FEMALE',
          language: 'Ijaw',
          addressLastSeen: 'Banana Island',
          redisdentialAddress: '24 Ikoyi, Lagos',
          state: 'Bayelsa',
          country: 'Nigeria',
          dateLastSeen: '2019-11-29T23:00:00.000Z',
          reportedBy: '5dda966fdd944118fd29d5f2',
          photoURL:
            'https://res.cloudinary.com/georgeben/image/upload/v1575551429/report_missing_people/case_photos/m80ugtw49rzhwch0bf9d.jpg',
          cloudinaryPhotoID:
            'report_missing_people/case_photos/m80ugtw49rzhwch0bf9d',
          createdAt: '2019-12-05T13:10:30.545Z',
          updatedAt: '2019-12-05T13:10:30.545Z',
          description:
            'Erema Woman aka God win who is a 23 year old got missing on Sat Nov 30 2019 00:00:00 GMT+0100 (West Africa Standard Time) at Banana Island, in Bayelsa, Nigeria.',
          slug: 'erema-woman',
          height: 1.5,
        },
        {
          eventDescription: 'Naso',
          slugParam: this.$route.params.slug,
          name: 'Anthony Joshua',
          nicknames: ['Abe', 'Jboy'],
          solved: false,
          fullname: 'Erema Woman',
          age: 23,
          gender: 'FEMALE',
          language: 'Ijaw',
          addressLastSeen: 'Banana Island',
          redisdentialAddress: '24 Ikoyi, Lagos',
          state: 'Bayelsa',
          country: 'Nigeria',
          dateLastSeen: '2019-11-29T23:00:00.000Z',
          reportedBy: '5dda966fdd944118fd29d5f2',
          photoURL:
            'https://res.cloudinary.com/georgeben/image/upload/v1575551429/report_missing_people/case_photos/m80ugtw49rzhwch0bf9d.jpg',
          cloudinaryPhotoID:
            'report_missing_people/case_photos/m80ugtw49rzhwch0bf9d',
          createdAt: '2019-12-05T13:10:30.545Z',
          updatedAt: '2019-12-05T13:10:30.545Z',
          description:
            'Erema Woman aka God win who is a 23 year old got missing on Sat Nov 30 2019 00:00:00 GMT+0100 (West Africa Standard Time) at Banana Island, in Bayelsa, Nigeria.',
          slug: 'erema-woman',
          height: 1.5,
        },
      ],
    };
  },
};
</script>

<style></style>
