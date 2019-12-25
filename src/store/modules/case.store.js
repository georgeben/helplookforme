import { caseEndpoint } from '@/api';
import { handleError } from '../../utils';

const initialState = () => ({
});
const state = initialState();

const mutations = {

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
  async updateCase(context, payload) {
    try {
      let result = await caseEndpoint.updateCase(payload.slug, payload.caseData);
      return result;
    } catch (error) {
      return handleError(error);
    }
  }
}

const getters = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
