<template>
  <section>
    <div class="container newsletter shadow-xl">
      <h3 class="text-white text-xl font-bold text-center mt-4">
        Get involved
      </h3>
      <p class="text-center text-white">
        Would you like to receive email notifications of reported missing people
        in your area? Together we can do much more!
      </p>
      <form class="mt-4">
        <p class="error-info" v-if="errorMessage">{{errorMessage}}</p>
        <div class="flex justify-between flex-wrap">
          <input
            type="email"
            class="px-4 py-2 w-full sm:w-1/3 mt-3 shadow-lg rounded-sm"
            placeholder="Enter your email"
            v-model="email"
          />
          
          <LocationAutocomplete
            class="px-4 py-2 w-full sm:w-1/3 mt-3 shadow-lg rounded-sm"
            @select="locationSelect"
            v-model="address.address"
            placeholder="Where do you live?"
          />

          <select
            name="frequency"
            class="px-4 py-2 w-full sm:w-30 mt-3 shadow-lg"
            v-model="frequency"
          >
            <option value="DAILY">Daily</option>
            <option value="WEEKLY">Weekly</option>
          </select>
        </div>

        <div class="mt-6 text-center">
          <SubmitButton class="w-full sm:w-1/4 sm:ml-8 bg-primary-dark rounded-sm shadow-xl"
            text="Subscribe"
            @click.native="subscribe"
            :loading="loading" />
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import LocationAutocomplete from '../Forms/LocationAutocomplete.vue';
import SubmitButton from '../Forms/SubmitButton';
import { newsletterSchema } from '../../schemas';
import { handleError, toast } from '../../utils';
import { newsletterEndpoint } from '../../api'
export default {
  name: 'newsletter',
  components: {
    LocationAutocomplete,
    SubmitButton,
  },
  data() {
    return {
      email: '',
      address: {
        state: '',
        country: '',
        formatted_address: '', // The address from the Google places API
        address: '', // The value in the address field
      },
      frequency: 'DAILY',
      errorMessage: '',
      fieldWithError: '',
      loading: false,
    };
  },
  methods: {
    locationSelect(location) {
      this.address = location;
    },
    async subscribe(){
      this.errorMessage = '';
      this.fieldWithError = '';
      try {
        let data = {
          email: this.email,
          address: this.address,
          frequency: this.frequency
        }
        await newsletterSchema.validate(data , {abortEarly: true});
        this.loading = true;
        let result = await newsletterEndpoint.subscribe(data);
        this.loading = false;
        if(result.data.data){
          toast.success('Thank you for subscribing to our newsletter ❤️')
        }

      } catch (error) {
        if(error.name === "ValidationError"){
          this.fieldWithError = error.path;
          this.errorMessage = error.message;
          return;
        }
        this.loading = false;
        return handleError(error);
      }
    }
  },
};
</script>

<style>
.newsletter{
  background: linear-gradient(97.06deg, rgba(89, 215, 182, 0.9) 28.21%, rgba(102, 195, 204, 0.9) 96.06%);
}
</style>
