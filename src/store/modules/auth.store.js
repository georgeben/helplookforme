import { authEndpoint, userEndpoint } from '@/api';
import { storage, handleError } from '../../utils';
import constants from '../../constants';
import store from '../index';
import { setAuthHeader, removeAuthHeader } from '../../api/httpClient';


const initialState = () => ({
  isLoggedIn: false,
  currentUser: null,
});
const state = initialState();

const mutations = {
  /**
   * Updates the state with the details of the current user
   * @param {Object} payload - The user data
   */
  setUser(state, payload) {
    state.currentUser = payload;
  },
  /**
   * Updates if a user is logged in or not
   * @param {Boolean} isLoggedIn - Is the user logged in?
   */
  updateLoggedInStatus(state, isLoggedIn) {
    state.isLoggedIn = isLoggedIn;
  },
  /**
   * Resets the Vuex store state
   * @param {Object} state - The vuex state
   */
  resetState(state) {
    const newState = initialState();
    Object.keys(newState).forEach((key) => {
      state[key] = newState[key];
    });
  },
};

const actions = {
  /**
   * Retrieves the twitter redirect URL
   */
  async getTwitterRedirectURL() {
    try {
      let result = await authEndpoint.getTwitterRedirectURL();
      return result;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Handles sign in with twitter
   * @param {Object} param0 - The vuex store instance
   * @param {Object} payload - The request data
   */
  async twitterSignIn({ commit }, payload) {
    try {
      let result = await authEndpoint.twitterSignIn(payload);
      const user = result.data.data.user;
      commit('setUser', user);
      commit('updateLoggedInStatus', true);

      storage.updateState(constants.TOKEN, result.data.data.token);
      setAuthHeader();

      return user;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   *  Handles sign in with google
   * @param {String} id_token - the id token returned by Google
   */
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
  /**
   *  Handles sign in with twitter
   * @param {String} access_token - Access token returned by Facebook
   */
  async facebookSignIn({ commit }, access_token) {
    try {
      let result = await authEndpoint.facebookSignIn({ access_token });

      commit('setUser', result.data.data.user);
      commit('updateLoggedInStatus', true);

      storage.updateState(constants.TOKEN, result.data.data.token);
      setAuthHeader();

      return result.data.data.user;
    } catch (error) {
      return handleError(error);
    }
  },
  /**
   * Signs in a user with email and password
   * @param {Object} payload - User's login credentials
   */
  async localLogIn({ commit }, payload) {
    try {
      // Call the login API endpoint
      let result = await authEndpoint.localLogIn(payload);

      // Update the store state to store the current user profile
      commit('setUser', result.data.data.user);
      commit('updateLoggedInStatus', true);

      // Store the token
      storage.updateState(constants.TOKEN, result.data.data.token);
      setAuthHeader();
      return result.data.data.user;
    } catch (error) {
      return handleError(error);
    }
  },
  /**
   * Handles user sign up
   * @param {*} payload - The user signup credentials
   */
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
  /**
   * Fetches the data of the currently logged in user from the API
   */
  async getCurrentUserData({ commit }) {
    try {
      let result = await userEndpoint.getUserData();
      commit('setUser', result.data.data.user);
    } catch (error) {
      return handleError(error);
    }
  },
  /**
   * Verifies a user's email
   * @param {Object} payload - Object containing the email to verify
   */
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
  /**
   * Logs a user out
   */
  async logout({ commit }) {
    commit('resetState');

    // Reset state in the user store
    store.commit('User/resetState');

    // Remove token
    removeAuthHeader();
    storage.removeState(constants.TOKEN);
  },
};

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