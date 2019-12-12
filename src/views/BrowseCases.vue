<template>
  <section class="w-full bg-gray-100">
    <div class="container">
      <form class="search-form mt-16 py-4 md:w-3/4 md:mx-auto">
        <input
          type="text"
          class="search-input bg-transparent h-20 sm:h-auto text-white text-lg leading-loose w-11/12 block mx-auto focus:outline-none focus:shadow-outline border-b border-white"
          placeholder="Search by name, nicknames, location, cloths they last wore..."
        />
        <button class="btn bg-white text-primary-dark block mt-5 mx-auto shadow-lg flex items-center">
          <svg class="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 30.239 30.239" style="enable-background:new 0 0 30.239 30.239;" xml:space="preserve"><g><g>
            <path d="M20.194,3.46c-4.613-4.613-12.121-4.613-16.734,0c-4.612,4.614-4.612,12.121,0,16.735   c4.108,4.107,10.506,4.547,15.116,1.34c0.097,0.459,0.319,0.897,0.676,1.254l6.718,6.718c0.979,0.977,2.561,0.977,3.535,0   c0.978-0.978,0.978-2.56,0-3.535l-6.718-6.72c-0.355-0.354-0.794-0.577-1.253-0.674C24.743,13.967,24.303,7.57,20.194,3.46z    M18.073,18.074c-3.444,3.444-9.049,3.444-12.492,0c-3.442-3.444-3.442-9.048,0-12.492c3.443-3.443,9.048-3.443,12.492,0   C21.517,9.026,21.517,14.63,18.073,18.074z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#308894"/>
            </g></g>
          </svg>
          <span>Search</span>
        </button>
      </form>

      <div class="results mt-10 md:flex md:justify-between">
        <CaseCard
          v-for="result in searchResults"
          :key="result.slug"
          :caseData="result"
          page="search"
        />
      </div>
    </div>
  </section>
</template>

<script>
import CaseCard from '@/components/CaseCard.vue'
export default {
  name: 'browse-cases',
  components: {
    CaseCard,
  },
  data(){
    return {
      searchResults: [
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
      ]
    }
  }
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
