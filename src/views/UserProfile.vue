<template>
  <section class="bg-gray-100">
    <div class="container">
      <div class="mx-auto sm:w-2/3 lg:w-1/2">
        <form class="bg-white shadow-lg mt-16 p-4">
          <h1 class="text-xl font-semibold mb-4">User profile</h1>
          <div class="mb-3">
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
              :disabled="!editingProfile"
            />
          </div>
          <div class="mb-3">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="address"
            >
              Residential Address
            </label>
            <!-- TODO Use an autocomplete select box -->
            <input
              class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="address"
              type="text"
              placeholder="Where do you live?"
              :disabled="!editingProfile"
            />
          </div>

          <div class="mb-3">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="state"
            >
              State
            </label>
            <input
              class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="state"
              type="text"
              :disabled="!editingProfile"
            />
          </div>

          <div class="mb-3">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="country"
            >
              Country
            </label>
            <input
              class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="country"
              type="text"
              :disabled="!editingProfile"
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
              @click="editingProfile = !editingProfile"
            >
              {{editingProfile ? 'Update profile' : 'Edit profile'}}
            </button>
          </div>
        </form>

        <form class="bg-white shadow-lg mt-4 p-4">
          <h1 class="text-xl font-semibold mb-4">Account settings</h1>
          <div class="mb-3">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="email"
            >
              Email (an email is required)
            </label>
            <input
              class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              :disabled="!editingEmail"
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
              {{editingEmail ? 'Update email' : 'Set email'}}
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
export default {
  name: 'user-profile',
  data() {
    return {
      editingProfile: false,
      editingEmail: false,
      editingPassword: false,
    };
  },
  computed: {
    ...mapState('Auth', ['currentUser']),
  },
  async mounted(){
    if(!this.currentUser){
      await this.getCurrentUserData();
    }
  },
  methods: {
    ...mapActions('Auth', ['getCurrentUserData']),
    cancel(){
      this.editingProfile = false;
    },
    cancelEmailEdit(){
      this.editingEmail = false;
    },
    cancelPasswordEdit(){
      this.editingPassword = false;
    }
  }
};
</script>

<style></style>
