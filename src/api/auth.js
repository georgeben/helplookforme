import httpClient from './httpClient';
const endpoint = '/auth'


async function localLogIn(payload) {
  return httpClient.post(`${endpoint}/login`, payload);
}

async function signUp(payload) {
  return httpClient.post(`${endpoint}/signup`, payload);
}

export default {
  localLogIn,
  signUp,
};