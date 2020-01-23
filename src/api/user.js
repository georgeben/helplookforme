import { httpClient } from './httpClient';
const endpoint = '/users';

/**
 * Retrieves the details of the current user
 * @returns {Promise} A promise which resolves to the server response
 */
async function getUserData() {
  return httpClient.get(endpoint);
}

/**
 * Retrieves the list of cases reported by a user
 * @returns {Promise} - A promise which resolves to the server response
 */
async function getUserCases() {
  return httpClient.get(`${endpoint}/cases`);
}

/**
 * Sends a request to update a user's profile
 * @param {Object} payload - The new user profile
 * @returns {Promise} - A promise which resolves to the server response
 */
async function updateUserProfile(payload) {
  return httpClient.put(endpoint, payload);
}

/**
 * Updates a user's password
 * @param {Object} payload - Request data
 * @returns {Promise} - A promise which resolves to the server response
 */
async function updatePassword(payload) {
  return httpClient.put(`${endpoint}/password`, payload);
}

/**
 * Updates a user's email
 * @param {Object} payload - The new email
 * @returns {Promise} - A promise which resolves to the server response
 */
async function updateEmail(payload) {
  return httpClient.put(`${endpoint}/email`, payload);
}

export default {
  getUserData,
  updateUserProfile,
  getUserCases,
  updatePassword,
  updateEmail,
};
