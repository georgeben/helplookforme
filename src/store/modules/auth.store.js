import { authAPI } from '@/api';
import { storage, handleError } from '../../utils';
import constants from '../../constants'


const initialState = () => ({
  isLoggedIn: false,
  currentUser: null,
});
const state = initialState();

const mutations = {
  setUser(state, payload) {
    state.currentUser = payload
  },
  updateLoggedInStatus(state, isLoggedIn) {
    state.isLoggedIn = isLoggedIn;
  },
  resetState(state) {
    const newState = initialState();
    Object.keys(newState).forEach(key => {
      state[key] = newState[key];
    });
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
    try {
      // Call the login API endpoint
      let result = await authAPI.localLogIn(payload);
  
      // Update the store state to store the current user profile
      commit('setUser', result.data.data.user)
      commit('updateLoggedInStatus', true);
  
      // Store the token
      storage.updateState(constants.TOKEN, result.data.data.token);
      return true
    } catch (error) {
      return handleError(error)
    }
  },
  async logout({ commit }){
    commit('resetState');
    
    // Remove token
    storage.removeState(constants.TOKEN)

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