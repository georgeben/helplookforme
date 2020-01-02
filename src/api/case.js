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
 * Retrieves data about a single case
 * @param {String} slug - The slug if the case to retrieve
 * @returns {Promise} - The API request to fetch the case
 */
async function getCase(slug) {
  return httpClient.get(`${endpoint}/${slug}`);
}

/**
 * Updates an already reported case
 * @param {String} slug - The slug of case to update
 * @param {Object} payload - The updated case
 * @returns {Promise} - The API request to update the case
 */
async function updateCase(slug, payload) {
  return httpClient.put(`${endpoint}/${slug}`, payload);
}

/**
 * Retrieves reported cases
 * @param {Number} offset - The number of documents to skip
 * @param {Number} limit - The maximum number of documents to retrieve
 */
async function getCases(offset, limit) {
  return httpClient.get(`${endpoint}?offset=${offset}&limit=${limit}`);
}

/**
 * Updates the status of a reported case
 * @param {String} slug - The slug of the case to update
 * @param {Boolean} solved - The status of the case
 */
async function updateCaseStatus(slug, solved){
  return httpClient.put(`${endpoint}/${slug}/status`, { solved, })
}

/**
 * Retrieves cases related to a case
 * @param {String} slug - The slug of the case
 */
async function getRelatedCases(slug) {
  return httpClient.get(`${endpoint}/${slug}/related`);
}

export default {
  submitCase,
  getCase,
  updateCase,
  getCases,
  updateCaseStatus,
  getRelatedCases,
};