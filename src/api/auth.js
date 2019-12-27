import { httpClient } from './httpClient';
const endpoint = '/auth'

/**
 * Send request for user login
 * @param {Object} payload - Request data
 * @returns {Promise} - A promise which resolves to the server response
 */
async function localLogIn(payload) {
  return httpClient.post(`${endpoint}/login`, payload);
}

/**
 * Send request for user sign up
 * @param {Object} payload - Request data
 * @returns {Promise} - A promise which resolves to the server response
 */
async function signUp(payload) {
  return httpClient.post(`${endpoint}/signup`, payload);
}

/**
 * Send request for verifying a user's email
 * @param {Object} payload - Request data
 * @returns {Promise} - A promise which resolves to the server response
 */
async function verifyEmail(payload) {
  return httpClient.put(`${endpoint}/verify-email`, payload);
}

/**
 * Send request to send password reset email
 * @param {String} email - The email to send the password reset mail
 * @returns {Promise} - A promise which resolves to the server response
 */
async function forgotPassword(email) {
  return httpClient.post(`${endpoint}/forgot-password`, { email });
}

/**
 * Send request for resetting a user's password
 * @param {Object} payload - Request data
 * @returns {Promise} - A promise which resolves to the server response
 */
async function resetPassword(payload) {
  return httpClient.put(`${endpoint}/reset-password`, payload);
}

export default {
  localLogIn,
  signUp,
  verifyEmail,
  forgotPassword,
  resetPassword,
};