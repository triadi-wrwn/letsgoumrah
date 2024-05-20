import type { AxiosInstance } from 'axios';
import axios from 'axios';

import HttpStatusCode from '@/lib/constants/http-status';
import { getToken } from '@/lib/utility/token';
import { AUTH_TOKEN_NAME, BASE_API_URL } from '@/lib/constants/common';
import { PAGE_URLS } from '@/lib/constants/page-urls';

const axiosInstance = <T>(): AxiosInstance => {
  const axiosClient = axios.create();
  const token = getToken(AUTH_TOKEN_NAME);

  axiosClient.defaults.baseURL = BASE_API_URL;

  axiosClient.defaults.headers.common = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  };

  axiosClient.interceptors.request.use(
    config => {
      const newCfg = { ...config };
      if (token) {
        newCfg.headers.Authorization = `Bearer ${token}`;
      }
      return newCfg;
    },
    error => Promise.reject(error)
  );

  axiosClient.interceptors.response.use(
    res => res,
    err => {
      const originalConfig = err.config;
      if (originalConfig.url !== PAGE_URLS.AUTH.LOGIN && err.response) {
        // Access Token was expired
        if (err.response.status === HttpStatusCode.Unauthorized && !originalConfig.retry) {
          originalConfig.retry = true;
          return Promise.reject(err);
        }
      }

      return Promise.reject(err);
    }
  );
  return axiosClient<T>;
};

export default axiosInstance;
