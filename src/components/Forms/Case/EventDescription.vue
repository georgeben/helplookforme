<template>
  <form >
    <div class="mt-4">
      <div class="mb-6">
        <p class=" text-lg leading-relaxed">Event description</p>
        <p class="text-gray-600 text-sm">
          Information about how the person got missing
        </p>
      </div>
      <div class="sm:flex sm:justify-between">
        <div class="mb-4 sm:w-47">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="addressLastSeen"
          >
            Address last seen
          </label>
          <LocationAutocomplete class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          :class="fieldWithError == 'addressLastSeen.formatted_address' ? ' border border-red-600': ''"
            @select="locationSelect" v-model="eventDescription.addressLastSeen.address" placeholder="Where did the person get missing?"/>
          
        </div>
        <div class="mb-4 sm:w-47">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="state">
            State
          </label>
          <input
            class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :class="fieldWithError == 'addressLastSeen.state' ? ' border border-red-600': ''"
            type="text"
            id="state"
            v-model="eventDescription.addressLastSeen.state"
          />
        </div>
      </div>

      <div class="sm:flex sm:justify-between">
        <div class="mb-4 sm:w-47">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="country"
          >
            Country
          </label>
          <input
            class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :class="fieldWithError == 'addressLastSeen.country' ? ' border border-red-600': ''"
            id="country"
            type="text"
            v-model="eventDescription.addressLastSeen.country"
          />
        </div>
        <div class="mb-4 sm:w-47">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="dateLastSeen"
          >
            Date last seen
          </label>
          <DatePicker class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="dateLastSeen" v-model="eventDescription.dateLastSeen" />
        </div>
      </div>
      <div class="sm:flex sm:justify-between">
        <div class="mb-4 sm:w-47">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="cloths">
            Cloths worn by the missing person (optional)
          </label>
          <textarea
            class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="cloths"
            rows="2"
            placeholder="E.g orange dress with black hoodie"
            v-model="eventDescription.lastSeenClothing"
          ></textarea>
        </div>
        <div class="mb-4 sm:w-47">
          <!-- TODO Add a min text option to this field, so people don't type rubbish -->
          <label class="block text-gray-700 text-sm font-bold mb-2" for="eventCircumstances">
            Event circumstances (optional)
          </label>
          <textarea
            class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="eventCircumstances"
            rows="2"
            placeholder="Describe how the person got missing"
            v-model="eventDescription.eventCircumstances"
          ></textarea>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import DatePicker from 'vuejs-datepicker';
import LocationAutocomplete from '../LocationAutocomplete';
export default {
  name: 'event-description',
  components: {
    DatePicker,
    LocationAutocomplete,
  },
  data(){
    return {
      eventDescription: this.value,
    }
  },
  props: {
    value: {
      type: Object,
    },
    fieldWithError: {
      type: String,
    }
  },
  methods: {
    locationSelect(location){
        this.eventDescription.addressLastSeen = location;
    }
  }
};
</script>

<style></style>
