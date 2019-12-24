<template>
  <section class="bg-gray-100">
    <div class="container">
      <div class="mx-auto sm:w-2/3 lg:w-1/2 mt-16">
        <p class="text-red-500 font-bold" v-if="!currentUser.completedProfile">Please complete your profile to be able to report a case</p>
        <form class="bg-white shadow-lg p-4 mt-4">
          <h1 class="text-xl font-semibold mb-4">User profile</h1>
          <p v-if="errorMessage" class="text-sm mb-4 text-red-600">{{errorMessage}}</p>
          <div class="mb-3">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="fullname"
            >
              Fullname
            </label>
            <input
              class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              :class="fieldWithError == 'fullname'? ' border border-red-600': ''"
              id="fullname"
              type="text"
              placeholder="Firstname Lastname"
              :disabled="!editingProfile"
              v-model="user.fullname"
            />
          </div>
          <div class="mb-3">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="address"
            >
              Residential Address (required)
            </label>
            <!-- TODO Use an autocomplete select box -->
            <LocationAutocomplete class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               @select="locationSelect" v-model="address" :disabled="!editingProfile" placeholder="Where do you live?" />
          
          </div>

          <!-- Use a location suggest box -->
          <div class="mb-3">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="state"
            >
              State (required)
            </label>
            <input
              class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              :class="fieldWithError == 'residentialAddress.state'? ' border border-red-600': ''"
              id="state"
              type="text"
              :disabled="!editingProfile"
              v-model="user.residentialAddress.state"
            />
          </div>

          <div class="mb-3">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="country"
            >
              Country (required)
            </label>
            <input
              class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              :class="fieldWithError == 'residentialAddress.country'? ' border border-red-600': ''"
              id="country"
              type="text"
              :disabled="!editingProfile"
              v-model="user.residentialAddress.country"
            />
          </div>

          <div class="flex justify-between">
            <button
              class="btn bg-gray-200 hover:bg-gray-300"
              type="button"
              v-if="editingProfile"
              @click="cancel"
            >
              Cancel
            </button>
            <button
              class="btn"
              :class="editingProfile ? 'btn-primary':'bg-gray-200 hover:bg-gray-300'"
              type="button"
              @click="editingProfile ? updateProfile(): editingProfile = !editingProfile"
            >
              {{editingProfile ? 'Update profile' : 'Edit profile'}}
            </button>
          </div>
        </form>

        <form class="bg-white shadow-lg mt-4 p-4">
          <h1 class="text-xl font-semibold">Account settings</h1>
          <p class="text-red-500 text-sm mt-3" v-if=" user.email && !user.verifiedEmail">Your email has not been verified yet. A email confirmation has been 
            sent to the email displayed below. Please check your email inbox to confirm your email. If no email has been sent to you, please re-enter
            your email.
          </p>
          <div class="my-3">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="email"
            >
              Email (required)
            </label>
            <input
              class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              :disabled="!editingEmail"
              v-model="user.email"
            />
          </div>
          <div class="flex justify-between">
            <button
              class="btn bg-gray-200 hover:bg-gray-300"
              type="button"
              v-if="editingEmail"
              @click="cancelEmailEdit"
            >
              Cancel
            </button>
            <button
              class="btn"
              :class="editingEmail ? 'btn-primary':'bg-gray-200 hover:bg-gray-300'"
              type="button"
              @click="editingEmail = !editingEmail"
            >
              {{editingEmail ? 'Update email' : 'Update email'}}
            </button>
          </div>
        </form>

        <form class="bg-white shadow-lg mt-4 p-4">
          <h1 class="text-xl font-semibold mb-3">Set password</h1>
          <div class="mb-3">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Current Password (if any)
            </label>
            <input
              class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              :disabled="!editingPassword"
              v-model="currentPassword"
            />
          </div>

          <div class="mb-3">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="newPassword"
            >
              New Password
            </label>
            <input
              class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="newPassword"
              type="password"
              placeholder="Choose a new password"
              :disabled="!editingPassword"
              v-model="newPassword"
            />
          </div>

          <div class="flex justify-between">
            <button
              class="btn bg-gray-200 hover:bg-gray-300"
              type="button"
              v-if="editingPassword"
              @click="cancelPasswordEdit"
            >
              Cancel
            </button>
            <button
              class="btn"
              :class="editingPassword ? 'btn-primary':'bg-gray-200 hover:bg-gray-300'"
              type="button"
              @click="editingPassword = !editingPassword"
            >
              {{editingPassword ? 'Update password' : 'Set password'}}
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { toast } from '../utils';
import { updateUserProfileSchema } from '../schemas'
import LocationAutocomplete from '../components/Forms/LocationAutocomplete.vue';
export default {
  name: 'user-profile',
  components: {
    LocationAutocomplete,
  },
  data() {
    return {
      user: {},
      editingProfile: false,
      editingEmail: false,
      editingPassword: false,
      newPassword: '',
      currentPassword: '',
      address: '',
      errorMessage: '',
      fieldWithError: '',
    };
  },
  computed: {
    ...mapState('Auth', ['currentUser']),
  },
  async mounted(){
    if(!this.currentUser){
      await this.getCurrentUserData();
    }
    
    /* eslint-disable no-unused-vars */
    this.initUser(this.currentUser)
    this.$store.subscribe((mutation, state) => {
      if(mutation.type === 'Auth/setUser'){
        // Update the user object
        this.initUser(this.currentUser)
      }
    })
  },
  methods: {
    ...mapActions('Auth', ['getCurrentUserData']),
    ...mapActions('User', ['updateUserProfile']),
    initUser(userData){
      this.user = {
      ...userData,
      residentialAddress: {
        ...userData.residentialAddress,
      }
    };
    if(Object.keys(this.user.residentialAddress).length < 1 ){
      this.$set(this.user, 'residentialAddress', {
        state: '',
        country: '',
        formatted_address: ''
      })
    }
    this.address = this.user.residentialAddress.formatted_address;
    },
    cancel(){
      this.errorMessage = '';
      this.fieldWithError = '';
      this.initUser(this.currentUser)
      this.editingProfile = false;
    },
    cancelEmailEdit(){
      this.editingEmail = false;
      // Reset the email
      this.user.email = this.currentUser.email;
    },
    cancelPasswordEdit(){
      this.editingPassword = false;
      this.newPassword = '';
      this.currentPassword = '';
    },
    locationSelect(location){
      this.user.residentialAddress = location;
    },
    async updateProfile(){
      try {
        this.fieldWithError = '';
        this.errorMessage = '';
        // Check if the fullname is in the right format
        let names = this.user.fullname.split(' ');
        if(names.length !== 2){
          this.fieldWithError = 'fullname';
          this.errorMessage = 'Please enter firstname and lastname';
          return;
        }
        names = names.map(name => name.trim())
        names.forEach((name, i) => {
          if(name.length < 2){
            this.errorMessage = `Please enter a valid ${i === 0 ? 'first':'last'}name`,
            this.fieldWithError = 'fullname'
          }
        });
        if(this.errorMessage) return;
        await updateUserProfileSchema.validate(this.user, {abortEarly: true});

        let result = await this.updateUserProfile(this.user);
        if(result)toast.success('Successfully updated profile');
        
      } catch (error) {
        if(error.name === "ValidationError"){
          this.fieldWithError = error.path;
          this.errorMessage = error.message;
          return;
        }
      }
      
    }
  }
};
</script>

<style></style>
