import { httpClient } from './httpClient';
const endpoint = '/users';

async function getUserData() {
  return httpClient.get(`${endpoint}`);
}

export default {
  getUserData,
}
