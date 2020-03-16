<template>
  <section class="w-full bg-gray-100">
    <div class="container">
      <div
        class="bg-white shadow-lg mt-1/3 sm:mt-1/4 md:mt-40 sm:w-11/12 md:w-5/6 sm:mx-auto px-4 py-6"
      >
        <div class="w-11/12 mx-auto">
          <div class="flex items-center mb-6" v-if="this.edit">
            <router-link to="/reported-cases">
              <svg
                class="inline-block cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M15.45 17.97L9.5 12.01a.25.25 0 0 1 0-.36l5.87-5.87a.75.75 0 0 0-1.06-1.06l-5.87 5.87c-.69.68-.69 1.8 0 2.48l5.96 5.96a.75.75 0 0 0 1.06-1.06z"
                ></path>
              </svg>
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

          <p class="error-info mt-4" v-if="errorMessage">{{ errorMessage }}</p>
          <!-- Form 1 - Personal information -->
          <PersonalInformation
            v-if="formNumber === 1"
            v-model="personalInformation"
            :fieldWithError="fieldWithError"
          />

          <!-- Form 2 - Physical Characteristics -->
          <PhysicalCharacteristics
            v-if="formNumber === 2"
            v-model="physicalCharacteristics"
            :fieldWithError="fieldWithError"
          />

          <!-- Form 3 - Event Description -->
          <EventDescription
            v-if="formNumber === 3"
            v-model="eventDescription"
            :fieldWithError="fieldWithError"
          />

          <form v-if="formNumber === 4">
            <div class="mt-4">
              <div class="mb-6">
                <p class=" text-lg leading-relaxed">Upload photo</p>
                <p class="text-gray-600 text-sm">
                  Upload a clear photo of the missing person clearly showing
                  their face. Photos without a face will be rejected Avoid
                  photos with special filters.
                </p>
              </div>
              <ImagePicker
                v-model="photo"
                @load="disableSubmit = true"
                @done="disableSubmit = false"
              />
            </div>

            <div class="mx-auto flex justify-center mt-4">
              <vue-recaptcha
                ref="recaptcha"
                sitekey="6LdAnsoUAAAAAIqbOU-QeGz3zZ6h3x3rV5s7uzxb"
                :loadRecaptchaScript="true"
                type="v2 Checkbox"
                @verify="onCaptchaVerified"
                @expired="onCaptchaExpired"
                class="mx-auto block"
              >
              </vue-recaptcha>
            </div>
          </form>

          <div class="flex justify-between mt-10">
            <button
              class="btn bg-gray-200 hover:bg-gray-300"
              v-if="formNumber - 1 > 0"
              @click="decrementFormNumber"
              :disabled="formNumber === 4 && loading"
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

            <SubmitButton
              v-if="formNumber === 4"
              class="ml-auto"
              text="Submit report"
              @click.native="submitForm"
              :loading="loading"
              :disabled="disableSubmit"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ProgressBar from '../ProgressBar';
import VueRecaptcha from 'vue-recaptcha';
import PersonalInformation from './PersonalInformation';
import PhysicalCharacteristics from './PhysicalCharacteristics';
import EventDescription from './EventDescription';
import ImagePicker from '../ImagePicker';
import SubmitButton from '../SubmitButton';
import { toast } from '../../../utils';
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
      type: Object,
    },
    initialPhysicalCharacteristics: {
      type: Object,
    },
    initialEventDescription: {
      type: Object,
    },
    initialPhoto: {
      type: Object,
    },
    slug: {
      type: String,
    },
  },
  components: {
    ProgressBar,
    PersonalInformation,
    EventDescription,
    PhysicalCharacteristics,
    ImagePicker,
    SubmitButton,
    VueRecaptcha,
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
      loading: false,
      recaptchaToken: '',
      disableSubmit: false,
    };
  },
  methods: {
    ...mapActions('Case', ['submitCase', 'updateCase']),
    onCaptchaVerified(recaptchaToken) {
      this.recaptchaToken = recaptchaToken;
    },
    onCaptchaExpired() {
      this.$refs.recaptcha.reset();
    },
    scrollUp() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    },
    async incrementFormNumber() {
      this.fieldWithError = '';
      this.errorMessage = '';
      if (this.formNumber < 4) {
        // Check which form has been completed and validate it
        try {
          switch (this.formNumber) {
            case 1:
              await caseSchema.personalInformation.validate(
                this.personalInformation,
                { abortEarly: true },
              );
              break;
            case 2:
              await caseSchema.physicalCharacteristics.validate(
                this.physicalCharacteristics,
                { abortEarly: true },
              );
              break;
            case 3:
              await caseSchema.eventDescription.validate(
                this.eventDescription,
                { abortEarly: true },
              );
              break;
          }

          if (this.errorMessage) return;
          this.formNumber += 1;
          this.progressValue += 25;
          this.scrollUp();
        } catch (error) {
          if (error.name === 'ValidationError') {
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
      this.errorMessage = '';
      // Check if there was an image
      if (!this.photo.photoURL)
        return (this.errorMessage = 'Please select an image');
      if (!this.photo.valid)
        return toast.error(
          "We couldn't find a face in the photo you selected, please select a better one",
        );

      if (!this.recaptchaToken) {
        return toast.error('Please confirm that you are not a robot.');
      }

      this.loading = true;
      let physicalInformation = {};
      Object.keys(this.physicalCharacteristics).forEach((key) => {
        if (this.physicalCharacteristics[key]) {
          physicalInformation[key] = this.physicalCharacteristics[key];
        }
      });
      // Get nicknames array
      let nicknamesArr = this.personalInformation.nicknames.split(',');

      const caseData = new FormData();
      caseData.append('recaptchaToken', this.recaptchaToken);
      caseData.append('fullname', this.personalInformation.fullname);
      if (nicknamesArr.length > 1)
        caseData.append('nicknames', JSON.stringify(nicknamesArr));
      if (this.personalInformation.age)
        caseData.append('age', parseInt(this.personalInformation.age));
      if (
        this.personalInformation.residentialAddress.country &&
        this.personalInformation.residentialAddress.formatted_address &&
        this.personalInformation.residentialAddress.state
      )
        caseData.append(
          'residentialAddress',
          JSON.stringify(this.personalInformation.residentialAddress),
        );
      caseData.append('gender', this.personalInformation.gender);
      if (this.personalInformation.language)
        caseData.append('language', this.personalInformation.language);
      caseData.append(
        'addressLastSeen',
        JSON.stringify(this.eventDescription.addressLastSeen),
      );
      caseData.append('dateLastSeen', this.eventDescription.dateLastSeen);
      if (this.eventDescription.lastSeenClothing)
        caseData.append(
          'lastSeenClothing',
          this.eventDescription.lastSeenClothing,
        );
      if (this.eventDescription.eventCircumstances)
        caseData.append(
          'eventCircumstances',
          this.eventDescription.eventCircumstances,
        );
      if (Object.keys(physicalInformation).length >= 1)
        caseData.append(
          'physicalInformation',
          JSON.stringify(physicalInformation),
        );
      if (this.photo.imageFile)
        caseData.append('casePhoto', this.photo.imageFile);

      // Check if case is being created or edited
      let result;
      if (this.edit) {
        // Make a call to the edit case route
        result = await this.updateCase({ slug: this.slug, caseData });
      } else {
        result = await this.submitCase(caseData);
      }
      this.$refs.recaptcha.reset();

      this.loading = false;

      if (result) {
        // Send the person to the reported cases page
        toast.success(
          `${
            this.edit
              ? 'Successfully updated case'
              : 'Your case has been reported'
          }`,
        );
        this.$router.push('/reported-cases');
      }
    },
  },
};
</script>

<style></style>
