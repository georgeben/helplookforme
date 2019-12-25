import { caseEndpoint } from '@/api';
import { handleError } from '../../utils';

const initialState = () => ({
});
const state = initialState();

const mutations = {

}

const actions = {
  // eslint-disable-next-line no-unused-vars
  async submitCase(context, payload) {
    try {
      let result = await caseEndpoint.submitCase(payload);
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
