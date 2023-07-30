import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

export const Axios = axios.create({
  baseURL: `${BASE_URL}/`,
  // validateStatus: (status) => status < 500,
  timeout: 10000,
});

Axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
Axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);
