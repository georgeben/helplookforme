import { httpClient } from './httpClient';
const endpoint = '/auth'


async function localLogIn(payload) {
  return httpClient.post(`${endpoint}/login`, payload);
}

async function signUp(payload) {
  return httpClient.post(`${endpoint}/signup`, payload);
}

async function verifyEmail(payload) {
  return httpClient.put(`${endpoint}/verify-email`, payload);
}

export default {
  localLogIn,
  signUp,
  verifyEmail,
};