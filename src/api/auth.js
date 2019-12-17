import httpClient from './httpClient';
const endpoint = '/auth'


async function localLogIn(payload) {
  return httpClient.post(`${endpoint}/login`, payload);
}

export default {
  localLogIn,
}