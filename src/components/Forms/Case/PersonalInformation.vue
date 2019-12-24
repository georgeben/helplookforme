<template>
  <form>
    <div class="mt-4">
      <div class="mb-6">
        <p class=" text-lg leading-relaxed">Personal Information</p>
        <p class="text-gray-600 text-sm">
          Tell us about the person who is missing
        </p>
      </div>
      <div class="sm:flex sm:justify-between">
        <div class="mb-4 sm:w-47">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="fullname"
          >
            Fullname
          </label>
          <input
            class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :class="fieldWithError == 'fullname'? ' border border-red-600': ''"
            type="text"
            placeholder="Firstname Lastname"
            v-model="personalInfo.fullname"
            @input="handleInput"
          />
        </div>
        <div class="mb-4 sm:w-47">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="nicknames"
          >
            Nicknames (optional)
          </label>
          <input
            class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :class="fieldWithError == 'nicknames'? ' border border-red-600': ''"
            type="text"
            placeholder="Separate by commas e.g JBoy, Cindy"
            v-model="personalInfo.nicknames"
            @input="handleInput"
          />
        </div>
      </div>

      <div class="sm:flex sm:justify-between">
        <div class="mb-4 sm:w-47">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="residential-address"
          >
            Residential Address
          </label>
          <LocationAutocomplete class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :class="fieldWithError == 'residentialAddress.state' || fieldWithError == 'residentialAddress.formatted_address' ? ' border border-red-600': ''"
            @select="locationSelect" v-model="personalInfo.residentialAddress.address" placeholder="Where does the missing person live?" />
        </div>
        <div class="mb-4 sm:w-47">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="language"
          >
            Primary Language
          </label>
          <input
            class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :class="fieldWithError == 'language'? ' border border-red-600': ''"
            type="text"
            placeholder="E.g Igbo"
            v-model="personalInfo.language"
            @input="handleInput"
          />
        </div>
      </div>

      <div class="sm:flex sm:justify-between">
        <div class="mb-4 sm:w-47">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="age">
            Age
          </label>
          <input
            class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :class="fieldWithError == 'age'? ' border border-red-600': ''"
            type="number"
            placeholder="How old is the person?"
            v-model="personalInfo.age"
            @input="handleInput"
          />
        </div>
        <div class="mb-4 sm:w-47">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="gender"
          >
            Gender
          </label>
          <select
            class="border border-gray-400 px-3 py-2 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :class="fieldWithError == 'gender'? ' border border-red-600': ''"
            v-model="personalInfo.gender"
            @input="handleInput"
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import LocationAutocomplete from '../LocationAutocomplete';
export default {
  name: 'personal-information',
  components: {
    LocationAutocomplete,
  },
  data() {
    return {
      personalInfo: this.value,
    };
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
    // eslint-disable-next-line no-unused-vars
    handleInput(e) {
      this.$emit('input', this.personalInfo);
    },
    locationSelect(location){
      this.personalInfo.residentialAddress = location;
      this.$emit('input', this.personalInfo);
  }
  },
};
</script>

<style></style>
