<template>
  <section class="w-full bg-gray-100">
    <div class="container">
      <div
        class="bg-white shadow-lg mt-1/3 sm:mt-1/4 md:mt-40 sm:w-4/5 sm:mx-auto px-4 py-6"
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

          <form>
            <div class="mt-4">
              <div class="mb-6">
                <p class=" text-lg leading-relaxed">Personal Information</p>
                <p class="text-gray-600 text-sm">Tell us about the person who is missing</p>
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
                    id="fullname"
                    type="text"
                    placeholder="Firstname Lastname"
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
                    id="nicknames"
                    type="text"
                    placeholder="Separate by commas e.g JBoy, Cindy"
                  />
                </div>
              </div>

              <div class="sm:flex sm:justify-between">
                <!-- TODO This should be an autocomplete select box -->
                <div class="mb-4 sm:w-47">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="residential-address"
                  >
                    Residential Address
                  </label>
                  <input
                    class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="residential-address"
                    type="text"
                    placeholder="Where does the person live?"
                  />
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
                    id="language"
                    type="text"
                    placeholder="E.g Igbo"
                  />
                </div>
              </div>

              <div class="sm:flex sm:justify-between">
                <!-- TODO This should be an autocomplete select box -->
                <div class="mb-4 sm:w-47">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="age"
                  >
                    Age
                  </label>
                  <input
                    class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="age"
                    type="number"
                    placeholder="How old is the person?"
                  />
                </div>
                <div class="mb-4 sm:w-47">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="gender"
                  >
                    Gender
                  </label>
                  <select id="gender" class="border border-gray-400 px-3 py-2 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                  <!-- <input
                    class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="gender"
                    type="text"
                    placeholder="E.g Igbo"
                  /> -->
                </div>
              </div>

            </div>
          </form>
          <div class="flex justify-between mt-10">
            <button class="btn btn-primary" v-if="formNumber - 1 > 0">Back</button>
            <button class="btn btn-primary ml-auto">Next</button>

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'report-case',
  data() {
    return {
      formNumber: 1,
      progressValue: 10,
    };
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
