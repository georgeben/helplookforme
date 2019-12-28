import { httpClient } from './httpClient';
const endpoint = '/newsletter';

async function subscribe(payload) {
  return httpClient.post(endpoint, payload);
}

export default {
  subscribe,
}
