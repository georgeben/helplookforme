import { httpClient } from './httpClient';
const endpoint = '/cases';

async function submitCase(payload) {
  return httpClient.post(endpoint, payload);
}

export default {
  submitCase,
}