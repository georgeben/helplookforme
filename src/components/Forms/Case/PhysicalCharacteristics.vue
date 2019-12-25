<template>
  <form>
    <div class="mt-4">
      <div class="mb-6">
        <p class=" text-lg leading-relaxed">Physical characteristics</p>
        <p class="text-gray-600 text-sm">
          Information about how the person looks like
        </p>
      </div>
      <div class="sm:flex sm:justify-between">
        <div class="mb-4 sm:w-47">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="height"
          >
            Height in meters (optional)
          </label>
          <input
            class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :class="fieldWithError == 'height'? ' border border-red-600': ''"
            type="number"
            id="height"
            v-model="physicalCharacteristics.height"
          />
        </div>
        <div class="mb-4 sm:w-47">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="weight"
          >
            Weight in kg (optional)
          </label>
          <input
            class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :class="fieldWithError == 'weight'? ' border border-red-600': ''"
            type="number"
            id="weight"
            v-model="physicalCharacteristics.weight"
          />
        </div>
      </div>

      <div class="sm:flex sm:justify-between">
        <div class="mb-4 sm:w-47">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="special-characteristics"
          >
            Special characteristics (optional)
          </label>
          <textarea
            class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :class="fieldWithError == 'specialCharacteristics'? ' border border-red-600': ''"
            type="text"
            rows="4"
            id="special-characteristics"
            placeholder="Does the person have any scar, tribal marks or tattoos?"
            v-model="physicalCharacteristics.specialCharacteristics"
          >
          </textarea>
        </div>
        <div class="mb-4 sm:w-47">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="health"
          >
            Health information (optional)
          </label>
          <textarea
            class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :class="fieldWithError == 'healthInformation'? ' border border-red-600': ''"
            type="text"
            id="health"
            rows="4"
            placeholder="Specify health information, e.g is the person disabled in anyway?"
            v-model="physicalCharacteristics.healthInformation"
          ></textarea>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'physical-characteristics',
  data(){
    return {
      physicalCharacteristics: this.value,
    }
  },
  props: {
    value: {
      type: Object,
    },
    fieldWithError: {
      type: String,
    }
  }
};
</script>

<style></style>
