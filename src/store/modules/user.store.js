import { userEndpoint } from '@/api';
import { handleError } from '../../utils';
import store from '../index'

const initialState = () => (
  {
    userCases: [],
  }
)

const state = initialState();

const mutations = {
  /**
   * Updates the list of user cases
   * @param {Object} state - The current state
   * @param {*} payload - The user cases array
   */
  setUserCases(state, payload) {
    state.userCases = payload;
  }
}

const actions = {
  /**
   * Updates the user's profile
   * @param {Object} context - The Vuex store instance
   * @param {Object} payload - The updated user profile
   */
  async updateUserProfile(context, payload) {
    try {
      // Call the user endpoint to update the user profile
      let result = await userEndpoint.updateUserProfile(payload);
      const updatedUser = result.data.data;
      // Update the current user in the auth store with the returned user
      store.commit('Auth/setUser', updatedUser);
      return updatedUser;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Retrieves all the cases reported by the user
   * @param {Object} context - The Vuex store instance 
   */
  async getUserCases({ commit }) {
    try {
      let result = await userEndpoint.getUserCases();
      commit('setUserCases', result.data.data.cases);
      return result.data.data.cases;
    } catch (error) {
      return handleError(error);
    }
  }
};

const getters = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
