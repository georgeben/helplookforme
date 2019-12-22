import { httpClient } from './httpClient';
const endpoint = '/users';

async function getUserData() {
  return httpClient.get(`${endpoint}`);
}

async function updateUserProfile(payload) {
  return httpClient.put(`${endpoint}`, payload);
}
export default {
  getUserData,
  updateUserProfile,
}
