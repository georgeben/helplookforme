<template>
  <div class="home">
    <section class="jumbotron">
      <div class="container">
        <div class="jumbotron-info mt-32 p-3 w-1/2">
          <h1 class=" text-dark font-black my-6 leading-tight text-5xl">
            Report cases of missing people
          </h1>
          <p class=" text-lg leading-relaxed mb-4">
            Get information out as quick as possible. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do.
          </p>
          <div>
            <button class="cta-btn btn btn-primary mr-4 rounded-sm shadow-lg">Report a case</button>
            <button class=" bg-gray-300 hover:bg-gray-400 px-4 py-2">Browse cases</button>
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

    <section>
      <div class="container newsletter shadow-xl">
        <h3 class="text-white text-xl font-bold text-center mt-4">Get involved</h3>
        <p class="text-center text-white">
          Would you like to receive email notifications of reported missing people
          in your area? Together we can do much more!
        </p>
  
        <form class="mt-4">
          <div class="flex justify-between flex-wrap">
            <input type="email" class="px-4 py-2 w-full sm:w-1/3 mt-4 shadow-lg rounded-sm" placeholder="Enter your email" />
            <select name="state" class="px-4 py-2 w-full sm:w-1/3 mt-4 shadow-lg">
              <option value="bayelsa">Bayelsa</option>
              <option value="lagos">Lagos</option>
              <option value="abuja">Abuja</option>
              <option value="rivers">Rivers</option>
            </select>
            <select name="frequency" class="px-4 py-2 w-full sm:w-30 mt-4 shadow-lg">
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
  
          <div class="mt-6 text-center">
            <button class="btn btn-primary w-full sm:w-1/4 sm:ml-8 bg-primary-dark rounded-sm shadow-xl">Subscribe</button>
          </div>
        </form>
      </div>
    </section>

    <footer></footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Feature from '@/components/Homepage/Feature.vue';
import CaseCard from '@/components/Homepage/CaseCard.vue';
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
  },
};
</script>

<style scoped>
section {
  padding: 50px 0;
}
.jumbotron {
  background-image: url('../assets/images/landing.png');
  background-position: center;
  background-size: cover;
}

.scrolling-wrapper{
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}

.newsletter{
  background: linear-gradient(97.06deg, rgba(89, 215, 182, 0.9) 28.21%, rgba(102, 195, 204, 0.9) 96.06%);
}
</style>
