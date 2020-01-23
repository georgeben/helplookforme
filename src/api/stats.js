import { httpClient } from './httpClient';
const endpoint = '/stats';

/**
 * Retrieves app statistics
 * @returns {Promise} - A promise which resolves to the server response
 */
async function getStats() {
  return httpClient.get(endpoint);
}

export default {
  getStats,
}