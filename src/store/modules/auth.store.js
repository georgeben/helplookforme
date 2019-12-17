import { authAPI } from '@/api';
import { storage } from '../../utils';
import constants from '../../constants'

const state = {
  isLoggedIn: false,
  currentUser: null,
}

const mutations = {
  setUser(state, payload) {
    state.currentUser = payload
  },
  updateLoggedInStatus(state, isLoggedIn) {
    state.isLoggedIn = isLoggedIn;
  }
}

const actions = {
  /**
   * Logs a user in via Facebook, Twitter and google
   * @param {String} provider - The oauth provider used for logging in
   */
  async oauthLogin(context, { provider }) {
    console.log({ provider });
    // Call the auth api to send the request
    if (provider === 'twitter') {
      await authAPI.twitterSignIn();
    }
  },
  async localLogIn({ commit }, payload) {
    // Call the login API endpoint
    let result = await authAPI.localLogIn(payload);

    // Update the store state to store the current user profile
    commit('setUser', result.data.data.user)
    commit('updateLoggedInStatus', true);

    // Store the token
    storage.updateState(constants.TOKEN, result.data.data.token);
    console.log({result})
  }
}

const getters = {
  getCurrentUser(state) {
    return state.currentUser;
  },
  getLoginStatus(state) {
    return state.isLoggedIn;
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}