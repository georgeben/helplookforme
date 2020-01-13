import { httpClient } from './httpClient';
const endpoint = '/users';

async function getUserData() {
  return httpClient.get(endpoint);
}

async function getUserCases() {
  return httpClient.get(`${endpoint}/cases`);
}

async function updateUserProfile(payload) {
  return httpClient.put(endpoint, payload);
}

async function updatePassword(payload) {
  return httpClient.put(`${endpoint}/password`, payload);
}

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
