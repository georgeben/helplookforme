import { httpClient } from './httpClient';
const endpoint = '/auth'

/**
 * Send request for google login
 * @param {Object} payload - The user's google credentials
 */
async function googleSignIn(payload) {
  return httpClient.post(`${endpoint}/google`, payload);
}

/**
 * Send request for facebook login
 * @param {Object} payload - The user's facebook credentials
 */
async function facebookSignIn(payload) {
  return httpClient.post(`${endpoint}/facebook`, payload);
}

/**
 * Send a request to fetch the twitter redirect URL
 */
async function getTwitterRedirectURL() {
  return httpClient.get(`${endpoint}/twitter`);
}

/**
 * Send request for twitter login
 * @param {Object} payload - The oauth_token and oauth_verifier from twitter
 */
async function twitterSignIn(payload) {
  return httpClient.post(`${endpoint}/twitter/callback`, payload);
}

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
  googleSignIn,
  facebookSignIn,
  twitterSignIn,
  getTwitterRedirectURL,
};