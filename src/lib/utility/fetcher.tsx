import type { AxiosError } from 'axios';

import { BaseError } from '@/lib/types/response.type';
import { AUTH_TOKEN_NAME, BASE_API_URL } from '@/lib/constants/common';
import axiosInstance from '@/config/axios-instance';
import { FetcherProps } from '@/lib/types/fetcher-props.type';
import { getToken } from './token';

const defaultFetcherFn = async <T, TParam = T>(options: FetcherProps<T, TParam>): Promise<T> => {
  getToken(AUTH_TOKEN_NAME);
  const { url, data, normalizer, headers, method = 'get', params, responseType } = options || {};
  const instance = axiosInstance();
  return instance<T>({
    baseURL: BASE_API_URL,
    data,
    headers,
    method,
    params,
    url,
    responseType
  })
    .then(response => {
      const dataRes = response.data;
      if (typeof normalizer === 'function') {
        return normalizer(dataRes as unknown as TParam);
      }
      return dataRes;
    })
    .catch((error: AxiosError<BaseError>) => {
      throw error;
    });
};

export default defaultFetcherFn;
