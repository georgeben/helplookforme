import { httpClient } from './httpClient';
const endpoint = '/contact';

/**
 * Sends a message from the contact us form
 * @param {Object} payload - fullname, email and message
 */
async function sendMessage(payload) {
  return httpClient.post(endpoint, payload);
}

export default {
  sendMessage,
};