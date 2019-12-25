<template>
  <section class="w-full bg-gray-100">
    <div class="container">
      <div
        class="bg-white shadow-lg mt-1/3 sm:mt-1/4 md:mt-40 sm:w-11/12 md:w-5/6 sm:mx-auto px-4 py-6"
      >
        <div class="w-11/12 mx-auto">
          <h1 class="text-center text-xl font-semibold pb-6 mx-auto">
            Report a case
          </h1>
          <!-- TODO Create a separate component for progress bar -->
          <progress
            class="w-full h-2"
            max="100"
            :value="progressValue"
          ></progress>
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
              Submit case
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import PersonalInformation from '@/components/Forms/Case/PersonalInformation';
import PhysicalCharacteristics from '@/components/Forms/Case/PhysicalCharacteristics';
import EventDescription from '@/components/Forms/Case/EventDescription';
import ImagePicker from '@/components/Forms/ImagePicker.vue';
import { caseSchema } from '../schemas';
import { mapActions } from 'vuex';
import { toast } from '../utils'
export default {
  name: 'report-case',
  components: {
    PersonalInformation,
    PhysicalCharacteristics,
    EventDescription,
    ImagePicker,
  },
  data() {
    return {
      personalInformation: {
        fullname: '',
        nicknames: '',
        residentialAddress: {
          state: '',
          country: '',
          formatted_address: '', // The address from the Google places API
          address: '', // The value in the address field
        },
        language: '',
        age: 0,
        gender: '',
      },
      physicalCharacteristics: {
        height: '',
        weight: '',
        healthInformation: '',
        specialCharacteristics: '',
      },
      eventDescription: {
        addressLastSeen: {
          state: '',
          country: '',
          formatted_address: '', // The address from the Google places API
          address: '', // The value in the address field
        },
        dateLastSeen: new Date(),
        lastSeenClothing: '',
        eventCircumstances: '',
      },
      photo: {
        imageName: '',
        imageUrl: 'https://p7.hiclipart.com/preview/419/473/131/computer-icons-user-profile-login-user.jpg',
        imageFile: '',
      },
      formNumber: 1,
      progressValue: 10,
      fieldWithError: '',
      errorMessage: '',
    };
  },
  methods: {
    ...mapActions('Case', ['submitCase']),
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
      if(!this.photo.imageFile) return this.errorMessage = 'Please select an image';

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
      caseData.append('casePhoto', this.photo.imageFile);

      let result = await this.submitCase(caseData);
      if(result){
        // Send the person to the reported cases page
        toast.success('Your case has been reported')
        this.$router.push('/reported-cases');
      }
    },
  },
};
</script>

<style>
progress[value]::-webkit-progress-bar {
  background-color: #dbdcdc;
}
progress[value]::-moz-progress-bar {
  background-color: #dbdcdc;
}

progress[value]::-webkit-progress-value {
  background: linear-gradient(90deg, #308894 53.33%, #67d9bc 100%);
}

progress[value]::-moz-progress-bar {
  background: linear-gradient(90deg, #308894 53.33%, #67d9bc 100%);
}
</style>
