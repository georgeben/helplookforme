import { httpClient } from './httpClient';
const endpoint = '/cases';

/**
 * Creates a reported case
 * @param {Object} payload - The case being reported
 * @returns {Promise} - The API request to create the case
 */
async function submitCase(payload) {
  return httpClient.post(endpoint, payload);
}

/**
 * 
 * @param {String} slug - The slug if the case to retrieve
 * @returns {Promise} - The API request to fetch the case
 */
async function getCase(slug) {
  return httpClient.get(`${endpoint}/${slug}`);
}

/**
 * 
 * @param {String} slug - The slug of case to update
 * @param {Object} payload - The updated case
 * @returns {Promise} - The API request to update the case
 */
async function updateCase(slug, payload) {
  return httpClient.put(`${endpoint}/${slug}`, payload);
}

export default {
  submitCase,
  getCase,
  updateCase,
};