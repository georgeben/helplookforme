import { caseEndpoint } from '@/api';
import { handleError } from '../../utils';

const initialState = () => ({
  cases: [],
  fetchMoreCases: true,
});
const state = initialState();

const mutations = {
  setCases(state, cases) {
    state.cases = [...state.cases, ...cases];
  },

  setFetchMoreCases(state, payload) {
    state.fetchMoreCases = payload;
  }
}

const actions = {
  // eslint-disable-next-line no-unused-vars
  /**
   * Reports a new case
   * @param {Object} context - The vuex store instance
   * @param {Object} payload - The new case to report
   */
  async submitCase(context, payload) {
    try {
      let result = await caseEndpoint.submitCase(payload);
      return result;
    } catch (error) {
      return handleError(error);
    }
  },

  // eslint-disable-next-line no-unused-vars
  /**
   * Updates a reported case
   * @param {Object} context - The vuex store instance
   * @param {Object} payload - The new case data
   */
  async updateCase(context, payload) {
    try {
      let result = await caseEndpoint.updateCase(
        payload.slug,
        payload.caseData,
      );
      return result;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Updates the status of a case
   * @param {Object} context - The vuex store instance 
   * @param {Object} data - Request data
   */
  async updateCaseStatus(context, { slug, solved}){
    try {
      let result = await caseEndpoint.updateCaseStatus(slug, solved);
      return result;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Retrieves a list of all cases that have been reported 
   * @param {Object} param0 - The Vuex store instance
   * @param {Object} payload - Object containing the offset and limit of the cases to fetch
   */
  async getCases({ commit }, { offset, limit }) {
    try {
      let result = await caseEndpoint.getCases(offset, limit);
      const cases = result.data.data;
      if (cases.length > 0) {
        commit('setCases', result.data.data);
      } else {
        // No more data, stop fetching
        commit('setFetchMoreCases', false);
      }
      return cases;
    } catch (error) {
      commit('setFetchMoreCases', false);
      return handleError(error);
    }
  },
};

const getters = {
  /**
   * Retrieves a case from the state by the case slug
   */
  getCaseBySlug: (state) => (slug) => {
    return state.cases.find(item => item.slug === slug)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
