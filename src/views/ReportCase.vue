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

          <!-- Form 1 - Physical information -->
          <form v-if="formNumber === 1">
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
                  <select
                    id="gender"
                    class="border border-gray-400 px-3 py-2 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
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

          <form v-if="formNumber === 2">
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
                    id="height"
                    type="number"
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
                    id="weight"
                    type="number"
                    placeholder=""
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
                    id="special-characteristics"
                    type="text"
                    rows="4"
                    placeholder="Does the person have any scar, tribal marks or tattoos?"
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
                    id="health"
                    type="text"
                    rows="4"
                    placeholder="Specify health information, e.g is the person disabled in anyway?"
                  ></textarea>
                </div>
              </div>
            </div>
          </form>

          <form v-if="formNumber === 3">
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
                  <!-- TODO This should use an autocomplete form with Google places API -->
                  <input
                    class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="addressLastSeen"
                    type="text"
                  />
                </div>
                <div class="mb-4 sm:w-47">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="state"
                  >
                    State
                  </label>
                  <!-- TODO This should use an autocomplete form with Google places API -->
                  <input
                    class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="state"
                    type="text"
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
                  <!-- TODO This should use an autocomplete form with Google places API -->
                  <input
                    class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="country"
                    type="text"
                  />
                </div>
                <div class="mb-4 sm:w-47">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="dateLastSeen"
                  >
                    Date last seen
                  </label>
                  <!-- TODO This should use an autocomplete form with Google places API -->
                  <input
                    class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="dateLastSeen"
                    type="date"
                  />
                </div>
              </div>
              <div class="mb-4 sm:w-47">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="cloths"
                  >
                    Cloths worn by the missing person (optional)
                  </label>
                  <textarea
                    class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="cloths"
                    type="text"
                    rows="2"
                    placeholder="E.g orange dress with black hoodie"
                  ></textarea>
                </div>
            </div>
          </form>

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
              class="btn btn-primary"
              v-if="formNumber - 1 > 0"
              @click="decrementFormNumber"
            >
              Back
            </button>
            <button
              class="btn btn-primary ml-auto"
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
              Finish
            </button>
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
      imageName: '',
      imageUrl: 'https://p7.hiclipart.com/preview/419/473/131/computer-icons-user-profile-login-user.jpg',
      imageFile: '',
    };
  },
  methods: {
    incrementFormNumber() {
      if (this.formNumber < 4) {
        this.formNumber += 1;
        this.progressValue += 25;
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        })
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
