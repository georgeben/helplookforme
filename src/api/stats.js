import { httpClient } from './httpClient';
const endpoint = '/stats';

async function getStats() {
  return httpClient.get(endpoint);
}

export default {
  getStats,
}