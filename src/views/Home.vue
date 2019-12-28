<template>
  <div class="home">
    <section class="jumbotron h-screen md:h-auto">
      <div class="container">
        <div class="jumbotron-info mt-2 text-left md:mt-32 p-3 w-full md:w-1/2">
          <h1 class="text-dark font-black my-6 leading-tight text-3xl md:text-5xl">
            Report cases of missing people
          </h1>
          <p class=" text-lg leading-relaxed mb-6">
            Get information out as quick as possible. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do.
          </p>
          <div>
            <router-link to="/report-case">
              <button class="btn btn-primary mr-4 rounded-sm shadow-lg my-2">Report a case</button>
            </router-link>
            <button class="btn bg-gray-200 hover:bg-gray-400 mr-4">
              <router-link to="/cases">Browse cases</router-link>
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="features">
      <div class="container flex justify-between py-6 flex-wrap">
        <Feature
          v-for="feature in features"
          :key="feature.title"
          :title="feature.title"
          :body="feature.body"
        />
      </div>
    </section>

    <section
      class="featured-cases"
    >
      <div class="container scrolling-wrapper p-8 bg-light-green">
        <CaseCard
          v-for="featuredCase in featuredCases"
          :key="featuredCase.slug"
          :caseData="featuredCase"
        />

      </div>
    </section>

    <Newsletter />
   
  </div>
</template>

<script>
// @ is an alias to /src
import Feature from '@/components/Homepage/Feature.vue';
import Newsletter from '@/components/Homepage/Newsletter.vue';
import CaseCard from '@/components/CaseCard.vue';
export default {
  name: 'home',
  data() {
    return {
      features: [
        {
          title: 'Reach a wider audience',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipis elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        {
          title: 'Get information out quicker',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipis elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        {
          title: 'Absolutely free',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipis elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
      ],
      featuredCases: [
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
  components: {
    Feature,
    CaseCard,
    Newsletter,
  },
};
</script>

<style scoped>
section {
  padding: 50px 0;
}
.jumbotron {
  background-image: url('../assets/images/landing_images/landing.png');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.scrolling-wrapper{
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}

@media only screen and (max-width: 540px) {
.jumbotron{
  background-image: url('../assets/images/landing_images/mobile_landing.png');
}
}

@media only screen 
  and (min-device-width: 768px) 
  and (max-device-width: 1024px) 
  and (-webkit-min-device-pixel-ratio: 1) {
    .jumbotron{
      background-image: url('../assets/images/landing_images/tablet_landing.png');
    }
}
</style>
