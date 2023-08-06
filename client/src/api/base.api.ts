import { formatCustomError } from '@/utils/errorHandling';
import axios from 'axios';

const API_PORT = import.meta.env.VITE_API_PORT;
const BASE_URL = `http://localhost:${API_PORT}/api`;

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
    // response.data.success가 false인 값을 에러 형태로 바꿔준다.
    if (response.data.success === false) {
      return formatCustomError(response);
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);
