import axios from 'axios';
import { storage } from '../utils/';
import constants from '../constants';
import config from '../config';
let { baseURL } = config;

let authInterceptorID;

/* const baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.VUE_APP_API_BASE_URL
    : process.env.VUE_APP_DEV_API_BASE_URL; */

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

function setAuthHeader() {
  authInterceptorID = httpClient.interceptors.request.use(authInterceptor);
}

function removeAuthHeader() {
  httpClient.interceptors.request.eject(authInterceptorID);
}

export {
  httpClient,
  setAuthHeader,
  removeAuthHeader,
};