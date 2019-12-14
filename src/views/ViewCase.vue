<template>
  <section class="bg-gray-100 pt-10">
    <div class="container">
      <div class="mt-10 sm:flex sm:justify-between sm:items-start">
        <div class="case bg-white shadow-lg p-8 sm:w-4/6 lg:flex">
          <div>
            <div class="case-photo">
              <h1 class="text-xl md:text-xl font-semibold mb-4">{{ fullname }}</h1>
              <img
                class="h-48 w-full object-contain mb-4"
                src="../assets/images/boy.png"
                alt="Missing person photo"
              />
            </div>

            <div
              class="social-media-share flex flex-wrap justify-between w-5/6 mx-auto mb-6"
            >
            <!-- TODO Use custom styling for share buttons, loading them from their servers take too much time -->
              <a
                href="https://twitter.com/share?ref_src=twsrc%5Etfw"
                class="twitter-share-button"
                :data-text="`Help find ${name} ${description}`"
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
            <p v-if="nicknames.length > 0">
              <span class="text-gray-700 text-sm">Nicknames: </span>
              <span
                class="font-semibold"
                v-for="(name, i) in nicknames"
                :key="name"
                >{{
                  nicknames.length > 1
                    ? nicknames.length - 1 > i
                      ? name + ', '
                      : name
                    : ''
                }}
              </span>
            </p>

            <p>
              <span class="text-gray-700 text-sm">Last Seen: </span>
              <span class="font-semibold">{{
                new Date(dateLastSeen).toDateString()
              }}</span>
            </p>
            <p>
              <span class="text-gray-700 text-sm">Gender: </span>
              <span class="font-semibold">
                {{ gender }}
              </span>
            </p>
            <p>
              <span class="text-gray-700 text-sm">Age: </span>
              <span class="font-semibold">
                {{ age }}
              </span>
            </p>
            <p>
              <span class="text-gray-700 text-sm">Address last seen: </span>
              <span class="font-semibold">
                {{ addressLastSeen }}
              </span>
            </p>
            <p>
              <span class="text-gray-700 text-sm">
                Residential address:
              </span>
              <span class="font-semibold">
                {{ redisdentialAddress }}
              </span>
            </p>
            <p v-if="height">
              <span class="text-gray-700 text-sm">
                Height:
              </span>
              <span class="font-semibold"> {{ height }}m </span>
            </p>
            <p v-if="weight">
              <span class="text-gray-700 text-sm">
                Height:
              </span>
              <span class="font-semibold"> {{ weight }}kg </span>
            </p>
            <p>
              <span class="text-gray-700 text-sm">
                Primary language:
              </span>
              <span class="font-semibold">
                {{ language }}
              </span>
            </p>
            <p v-if="specialCharacteristics">
              <span class="text-gray-700 text-sm">
                Special characteristics:
              </span>
              <span class="font-semibold">
                {{ specialCharacteristics }}
              </span>
            </p>
            <p v-if="clothsLastWorn">
              <span class="text-gray-700 text-sm">
                Cloths last worn:
              </span>
              <span class="font-semibold">
                {{ clothsLastWorn }}
              </span>
            </p>
            <p v-if="eventDescription">
              <span class="text-gray-700 text-sm">
                Event Description:
              </span>
              <span class="font-semibold">
                {{ eventDescription }}
              </span>
            </p>

            <div class="report-information bg-red-600 text-white p-2 mt-4">
              <p>
                If you have any helpful information about the whereabouts of
                {{ fullname }}, please contact the police station nearest to you.
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
export default {
  name: 'view-case',
  components: {
    CaseCard,
  },
  data() {
    return {
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
      relatedCases: [
        {
          _id: '5de901c625e6c11a822c764b',
          nicknames: ['God win'],
          solved: false,
          fullname: 'Erema Woman',
          age: 23,
          gender: 'FEMALE',
          language: 'Ijaw',
          addressLastSeen: 'Banana Island',
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
          __v: 0,
        },
        {
          _id: '5de901c625e6c11a822c764b',
          nicknames: ['God win'],
          solved: false,
          fullname: 'Erema Woman',
          age: 23,
          gender: 'FEMALE',
          language: 'Ijaw',
          addressLastSeen: 'Banana Island',
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
          __v: 0,
        },
        {
          _id: '5de901c625e6c11a822c764b',
          nicknames: ['God win'],
          solved: false,
          fullname: 'Erema Woman',
          age: 23,
          gender: 'FEMALE',
          language: 'Ijaw',
          addressLastSeen: 'Banana Island',
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
          __v: 0,
        },
      ],
    };
  },
};
</script>

<style></style>
