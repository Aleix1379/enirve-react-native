import axios from 'axios';
import promise from 'promise';
import StorageService from './storageService';

// Add a request interceptor
const axiosClient = axios.create();
const storageService = new StorageService();

axiosClient.interceptors.request.use(
  async config => {
    // Do something before request is sent
    // If the header does not contain the token and the url not public, redirect to login
    const authToken = await storageService.getAuthToken();
    const accessToken = authToken ? `Bearer: ${authToken.token}` : null;

    // if token is found add it to the header
    if (accessToken) {
      if (config.method !== 'OPTIONS') {
        config.headers.authorization = accessToken;
      }
    }

    console.log('axios client... config:');
    console.log(config);
    console.log('#######################');

    return config;
  },
  error => {
    // Do something with request error
    console.log('Interceptor ERROR');
    console.log(error);
    console.log('*#-*#-*#-*#-*#-*#-*#-*#-*#-*#-*#-*#-*#-*#-*');
    return promise.reject(error);
  },
);

export default axiosClient;
