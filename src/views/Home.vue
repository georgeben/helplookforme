<template>
  <div class="home">
    <section class="jumbotron h-screen md:h-auto">
      <div class="container">
        <div class="jumbotron-info mt-2 text-left md:mt-32 p-3 w-full md:w-1/2">
          <h1 class="text-dark font-black my-6 leading-tight text-3xl md:text-5xl">
            Report cases of missing people
          </h1>
          <p class=" text-lg leading-relaxed mb-6">
            Get information of your missing loved one out as quickly as possible. Get alerts of people missing around your location.
          </p>
          <div>
            <router-link to="/report-case">
              <button class="btn btn-primary mr-4 rounded-sm shadow-lg my-2">Report a case</button>
            </router-link>
            <router-link to="/cases">
              <button class="btn bg-gray-200 hover:bg-gray-400 mr-4">
                Browse cases
              </button>
            </router-link>
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

    <!-- How it works -->
    <section class="steps">
      <div class="container flex justify-between flex-wrap">
        <Steps v-for="step in steps" :data="step" :key="step.number" />
      </div>
    </section>

    <section
      class="featured-cases"
    >
      <div class="container scrolling-wrapper p-8 bg-light-green" v-if="featuredCases.length >= 3">
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
import Steps from '@/components/Homepage/Steps.vue';
import CaseCard from '@/components/CaseCard.vue';
import { mapActions, mapState } from 'vuex';
export default {
  name: 'home',
  async created(){
    if(this.cases.length >= 0){
      console.log('Not Fetching')
      return this.featuredCases = this.cases;
    }
    const cases = await this.getCases({limit: 5});
    this.featuredCases = cases;
  },
  data() {
    return {
      steps: [
        {
          number: 1,
          title: 'Report a case',
          text: 'Create an account and report a case in approximately five minutes.',
          style: 'background: linear-gradient(270deg, #FF6A3F 7.33%, #FF804F 100%);',
          img: 'https://res.cloudinary.com/georgeben/image/upload/v1578586432/report_missing_people/assets/report.png'
        },
        {
          number: 2,
          title: 'Raise social awareness',
          text: 'Your reported case is automatically posted on our social media platforms to raise awareness.',
          style: 'background: linear-gradient(270deg, #F9D02B 7.33%, #EDBF04 100%);',
           img: 'https://res.cloudinary.com/georgeben/image/upload/v1578586504/report_missing_people/assets/sm.png'
        },
        {
          number: 3,
          title: 'Information dispersion',
          text: 'The reported case is broadcasted to all our subscribers that live within a 100km radius from the location the person got missing.',
          style: 'background: linear-gradient(270deg, #0166F8 7.33%, #2D81FA 100%);',
           img: 'https://res.cloudinary.com/georgeben/image/upload/v1578587075/report_missing_people/assets/send.png'
        }
      ],
      features: [
        {
          title: 'Reach a wider audience',
          body:
            'Reach a wider target audience. Every case reported is broadcasted to all our subscribers who live close to the address the person got missing.',
        },
        {
          title: 'Get information out quicker',
          body:
            'Time is of the essence. You do not have to wait till it is late, get information out as easily and quickly as possible.',
        },
        {
          title: 'Absolutely free',
          body:
            'All these services are provided to you at absolutely no cost. Just create an account in less than 5 minutes and you\'re ready to go',
        },
      ],
      featuredCases: [],
    };
  },
  computed: {
    ...mapState('Case', ['cases']),
  },
  methods: {
    ...mapActions('Case', ['getCases']),
  },
  components: {
    Feature,
    CaseCard,
    Newsletter,
    Steps,
  },
};
</script>

<style scoped>
section {
  padding: 35px 0;
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
