import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import defaultFetcherFn from '@/lib/utility/fetcher';
import { BaseError } from '@/lib/types/response.type';
import { FetchQueryExtras } from '@/lib/types/queries.type';
import HttpStatusCode from '@/lib/constants/http-status';
import { removeAuth } from '@/lib/utility/token';
import { useNavigate } from 'react-router-dom';
import { PAGE_URLS } from '@/lib/constants/page-urls';

const useGetData = <T, TParam = T>(key: string[], url: string, extras?: FetchQueryExtras<T, TParam>) => {
  const queryCLient = useQueryClient();
  const navigate = useNavigate();

  const { options, params, normalizer } = extras || {};
  const {
    onSuccess,
    onError,
    enabled = true,
    initialData = undefined,
    retry = 2,
    contentType = 'application/json',
    responseType = 'json'
  } = options || {};

  const handleSuccess = (data: T) => {
    onSuccess && onSuccess(data);
  };

  const handleError = (error: AxiosError<BaseError>, variables?: unknown) => {
    onError && onError(error, variables);
  };

  const { data, error, isError, isFetching, isFetched, isLoading, refetch } = useQuery<T, AxiosError<BaseError>>({
    queryKey: key,
    queryFn: () =>
      defaultFetcherFn<T, TParam>({
        headers: {
          Accept: 'application/json',
          'Content-Type': contentType
        },
        responseType,
        method: 'get',
        normalizer,
        url,
        params
      })
        .then(response => {
          handleSuccess(response);
          return response;
        })
        .catch(err => {
          handleError(err);
          return err;
        }),
    enabled,
    initialData,
    retry
    // refetchOnMount: false
  });

  if (isError && error.response?.status === HttpStatusCode.Unauthorized) {
    removeAuth();
    queryCLient.removeQueries({ queryKey: ['profile'] });
    navigate(PAGE_URLS.AUTH.LOGIN);
  }

  return {
    data,
    error,
    isError,
    isFetching,
    isFetched,
    isLoading,
    refetch
  };
};

export default useGetData;
