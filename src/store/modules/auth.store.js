import { authEndpoint, userEndpoint } from '@/api';
import { storage, handleError } from '../../utils';
import constants from '../../constants';
import { setAuthHeader, removeAuthHeader } from '../../api/httpClient';


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
      await authEndpoint.twitterSignIn();
    }
  },

  async googleSignIn({ commit }, id_token) {
    try {
      let result = await authEndpoint.googleSignIn({ id_token });
      commit('setUser', result.data.data.user);
      commit('updateLoggedInStatus', true);

      storage.updateState(constants.TOKEN, result.data.data.token);
      setAuthHeader();

      return result.data.data.user;

    } catch (error) {
      return handleError(error);
    }
  },
  async localLogIn({ commit }, payload) {
    try {
      // Call the login API endpoint
      let result = await authEndpoint.localLogIn(payload);
  
      // Update the store state to store the current user profile
      commit('setUser', result.data.data.user)
      commit('updateLoggedInStatus', true);
  
      // Store the token
      storage.updateState(constants.TOKEN, result.data.data.token);
      setAuthHeader();
      return result.data.data.user;
    } catch (error) {
      return handleError(error)
    }
  },
  async signUp({ commit }, payload) {
    try {
      let result = await authEndpoint.signUp(payload);
      commit('setUser', result.data.data.user);
      commit('updateLoggedInStatus', true);

      // Store the token
      storage.updateState(constants.TOKEN, result.data.data.user.token);
      setAuthHeader();
      return result.data.data.user;
    } catch (error) {
      return handleError(error);
    }
    
  },
  async getCurrentUserData({ commit }) {
    try {
      let result = await userEndpoint.getUserData();
      commit('setUser', result.data.data.user);
    } catch (error) {
      return handleError(error);
    }
  },
  async verifyEmail({ commit }, payload) {
    try {
      // Call the verify email API endpoint
      let result = await authEndpoint.verifyEmail(payload);
      // Update the state with the updated information
      commit('setUser', result.data.data.user);
      // Store the updated token
      storage.updateState(constants.TOKEN, result.data.data.token);
      return result;
    } catch (error) {
      return handleError(error);
    }
  },
  async logout({ commit }){
    commit('resetState');
    
    // Remove token
    removeAuthHeader();
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