<template>
  <section class="w-full bg-gray-100">
    <div class="container">
      <div
        class="bg-white shadow-lg mt-1/3 sm:mt-1/4 md:mt-40 sm:w-11/12 md:w-5/6 sm:mx-auto px-4 py-6"
      >
        <div class="w-11/12 mx-auto">
          <div class="flex items-center mb-6" v-if="this.edit">
            <router-link to="/reported-cases">
              <svg class="inline-block cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" d="M15.45 17.97L9.5 12.01a.25.25 0 0 1 0-.36l5.87-5.87a.75.75 0 0 0-1.06-1.06l-5.87 5.87c-.69.68-.69 1.8 0 2.48l5.96 5.96a.75.75 0 0 0 1.06-1.06z"></path></svg>
              <span class="text-sm">Cancel</span>
            </router-link>
            <h1 class="text-center text-xl font-semibold mx-auto">
              Edit a case
            </h1>
          </div>
          <h1 class="text-center text-xl font-semibold pb-6 mx-auto" v-else>
            Report a case
          </h1>

          <ProgressBar :progressValue="progressValue" />

          <p class="error-info mt-4" v-if="errorMessage">{{errorMessage}}</p>
          <!-- Form 1 - Personal information -->
          <PersonalInformation v-if="formNumber === 1" v-model="personalInformation" :fieldWithError="fieldWithError" />
        
          <!-- Form 2 - Physical Characteristics -->
          <PhysicalCharacteristics v-if="formNumber === 2" v-model="physicalCharacteristics" :fieldWithError="fieldWithError" />

          <!-- Form 3 - Event Description -->
          <EventDescription v-if="formNumber === 3" v-model="eventDescription" :fieldWithError="fieldWithError" />

          <form v-if="formNumber === 4">
            <div class="mt-4">
              <div class="mb-6">
                <p class=" text-lg leading-relaxed">Upload photo</p>
                <p class="text-gray-600 text-sm">
                  Upload a clear photo of the missing person clearly showing their face. Avoid photos with special filters
                </p>
              </div>
              <ImagePicker v-model="photo" />

            </div>
          </form>

          <div class="flex justify-between mt-10">
            <button
              class="btn bg-gray-200 hover:bg-gray-300"
              v-if="formNumber - 1 > 0"
              @click="decrementFormNumber"
            >
              Back
            </button>
            <button
              class="btn bg-gray-200 hover:bg-gray-300 ml-auto"
              v-if="formNumber < 4"
              @click="incrementFormNumber"
            >
              Next
            </button>
            <button
              class="btn btn-primary ml-auto"
              @click="submitForm"
              v-if="formNumber === 4"
            >
              Submit report
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ProgressBar from '../ProgressBar';
import PersonalInformation from './PersonalInformation';
import PhysicalCharacteristics from './PhysicalCharacteristics';
import EventDescription from './EventDescription';
import ImagePicker from '../ImagePicker';
import { toast } from '../../../utils'
import { caseSchema } from '../../../schemas';
import { mapActions } from 'vuex';

export default {
  name: 'case-form',
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
    initialPersonalInformation: {
      type: Object
    },
    initialPhysicalCharacteristics: {
      type: Object
    },
    initialEventDescription: {
      type: Object,
    },
    initialPhoto: {
      type: Object,
    },
    slug: {
      type: String,
    }
  },
  components: {
    ProgressBar,
    PersonalInformation,
    EventDescription,
    PhysicalCharacteristics,
    ImagePicker,
  },
  data() {
    return {
      personalInformation: this.initialPersonalInformation,
      physicalCharacteristics: this.initialPhysicalCharacteristics,
      eventDescription: this.initialEventDescription,
      photo: this.initialPhoto,
      formNumber: 1,
      progressValue: 10,
      fieldWithError: '',
      errorMessage: '',
    };
  },
  methods: {
    ...mapActions('Case', ['submitCase', 'updateCase']),
    scrollUp(){
      window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        })
    },
    async incrementFormNumber() {
      this.fieldWithError = '';
      this.errorMessage = '';
      if (this.formNumber < 4) {
        // Check which form has been completed and validate it
        try {
          switch(this.formNumber){
            case 1:
              await caseSchema.personalInformation.validate(this.personalInformation, { abortEarly: true });
              break;
            case 2:
              await caseSchema.physicalCharacteristics.validate(this.physicalCharacteristics, { abortEarly: true });
              break;
            case 3:
              await caseSchema.eventDescription.validate(this.eventDescription, { abortEarly: true });
              break;
          }

          if(this.errorMessage) return;
          this.formNumber += 1;
          this.progressValue += 25;
          this.scrollUp();
          } catch (error) {
            if(error.name === "ValidationError"){
              this.fieldWithError = error.path;
              this.errorMessage = error.message;
              return;
            }
          }
      }
    },
    decrementFormNumber() {
      this.fieldWithError = '';
      this.errorMessage = '';
      if (this.formNumber > 1) {
        this.formNumber -= 1;
        this.progressValue -= 25;
        this.scrollUp();
      }
    },
    async submitForm() {
      // Check if there was an image
      if(!this.photo.photoURL) return this.errorMessage = 'Please select an image';

      // TODO Check if the image contains a face

      // TODO Might need to add CAPTCHA
      let physicalInformation = {};
      Object.keys(this.physicalCharacteristics).forEach(key => {
        if(this.physicalCharacteristics[key]){
          physicalInformation[key] = this.physicalCharacteristics[key]
        }
      });
      // Get nicknames array
      let nicknamesArr = this.personalInformation.nicknames.split(',');

      const caseData = new FormData();
      caseData.append('fullname', this.personalInformation.fullname);
      if(nicknamesArr.length > 1) caseData.append('nicknames', JSON.stringify(nicknamesArr));
      caseData.append('age', parseInt(this.personalInformation.age));
      caseData.append('residentialAddress', JSON.stringify(this.personalInformation.residentialAddress));
      caseData.append('gender', this.personalInformation.gender);
      caseData.append('language', this.personalInformation.language);
      caseData.append('addressLastSeen', JSON.stringify(this.eventDescription.addressLastSeen));
      caseData.append('dateLastSeen', this.eventDescription.dateLastSeen);
      if(this.eventDescription.lastSeenClothing) caseData.append('lastSeenClothing', this.eventDescription.lastSeenClothing);
      if(this.eventDescription.eventCircumstances) caseData.append('eventCircumstances', this.eventDescription.eventCircumstances);
      if(Object.keys(physicalInformation).length >= 1) caseData.append('physicalInformation', JSON.stringify(physicalInformation))
      if(this.photo.imageFile)  caseData.append('casePhoto', this.photo.imageFile);

      // Check if case is being created or edited
      let result;
      if(this.edit){
        // Make a call to the edit case route
        result = await this.updateCase({ slug: this.slug, caseData });
      } else {
        result = await this.submitCase(caseData);
      }

      if(result){
        // Send the person to the reported cases page
        toast.success(`${this.edit? 'Successfully updated case': 'Your case has been reported'}`)
        this.$router.push('/reported-cases');
      }
    },
  },
};
</script>

<style>
</style>
