/**
 * Creates a HTTP Client for making HTTP requests
 */

import axios from 'axios';
import { storage } from '../utils/';
import constants from '../constants';
import config from '../config';
let { baseURL } = config;

let authInterceptorID;

const httpClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const authInterceptor = config => {
  let token = storage.loadState(constants.TOKEN)
  config.headers['authorization'] = token;
  return config;
}

/**
 * Sets the authorization header of the request to the JWT token returned by the API
 */
function setAuthHeader() {
  authInterceptorID = httpClient.interceptors.request.use(authInterceptor);
}

/**
 * Removes the authorization header of the request
 */
function removeAuthHeader() {
  httpClient.interceptors.request.eject(authInterceptorID);
}

export {
  httpClient,
  setAuthHeader,
  removeAuthHeader,
};