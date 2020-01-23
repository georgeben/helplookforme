import { httpClient } from './httpClient';
const endpoint = '/newsletter';

/**
 * 
 * @param {Object} payload - Details about the subscriber
 * @returns {Promise} - A promise which resolves to the server response
 */
async function subscribe(payload) {
  return httpClient.post(endpoint, payload);
}

export default {
  subscribe,
}
