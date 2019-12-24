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
              <div class="text-center">
                <img
                  class=" h-56 object-cover block mx-auto"
                  :src="imageUrl"
                />
                <input type="file" class="hidden" accept="image/*" ref="imageInput" @change="onFilePicked">
                <button class="btn bg-gray-300 hover:bg-gray-400 mt-5 mx-auto" @click="pickFile">Click to upload picture</button>
              </div>

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
import PersonalInformation from '@/components/Forms/Case/PersonalInformation';
import PhysicalCharacteristics from '@/components/Forms/Case/PhysicalCharacteristics';
import EventDescription from '@/components/Forms/Case/EventDescription';
import { caseSchema } from '../schemas';
export default {
  name: 'report-case',
  components: {
    PersonalInformation,
    PhysicalCharacteristics,
    EventDescription,
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
      formNumber: 3,
      progressValue: 10,
      imageName: '',
      imageUrl: 'https://p7.hiclipart.com/preview/419/473/131/computer-icons-user-profile-login-user.jpg',
      imageFile: '',
      fieldWithError: '',
      errorMessage: '',
    };
  },
  methods: {
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
              break
          }

          if(this.errorMessage) return;
          this.formNumber += 1;
          this.progressValue += 25;
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
          })
          } catch (error) {
            console.log(error)
            if(error.name === "ValidationError"){
              this.fieldWithError = error.path;
              this.errorMessage = error.message;
              return;
            }
          }
      }
    },
    decrementFormNumber() {
      if (this.formNumber > 1) {
        this.formNumber -= 1;
        this.progressValue -= 25;
      }
      window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        })
    },
    pickFile(e) {
      e.preventDefault();
      this.$refs.imageInput.click()
    },
    onFilePicked(e){
      const files = e.target.files
			if(files[0] !== undefined) {
        /* TODO Facial detection - Try to detect a face in the image the user picks
          If no face is detected, tell the  user to pick a better photo. This will prevent
          users from uploading rubbish*/
				this.imageName = files[0].name
				if(this.imageName.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader ()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
					this.imageUrl = fr.result
					this.imageFile = files[0] 
				})
			} else {
				this.imageName = 'No image selected yet'
				this.imageFile = ''
				this.imageUrl = 'https://p7.hiclipart.com/preview/419/473/131/computer-icons-user-profile-login-user.jpg'
			}
    },
    submitForm() {
      console.log('Finish!');
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
