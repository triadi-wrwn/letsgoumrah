import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import defaultFetcherFn from '@/lib/utility/fetcher';
import { BaseError } from '@/lib/types/response.type';
import { MutateFnParam, MutateQueryExtras } from '@/lib/types/queries.type';
import { useToast } from './use-toast';
import { capitalize } from '../utility';

export const useMutateData = <T = void>(param: MutateQueryExtras<T>) => {
  const { toast } = useToast();
  const { normalizer, options, url, method = 'post' } = param || {};
  const {
    onSuccess,
    onError,
    retry,
    contentType = 'application/json',
    showNotif = false,
    notifSuccessTitle,
    notifSuccessText,
    notifErrorTitle,
    notifErrorText
  } = options || {};

  const handleSuccess = (data: T) => {
    if (showNotif) {
      toast({
        title: notifSuccessTitle || '',
        variant: 'primary',
        description: notifSuccessText || 'Data successfully saved'
      });
    }
    onSuccess && onSuccess(data);
  };

  const handleError = (error: AxiosError<BaseError>, variables: unknown) => {
    const errMsg = error.response?.data as any;
    let errTextArr = [''];
    if (typeof errMsg === 'string') {
      errTextArr = [errMsg];
    } else {
      errTextArr = Object.keys(errMsg).reduce((ress: string[], key) => {
        if (Array.isArray(errMsg[key])) {
          errMsg[key].forEach((element: string) => {
            ress.push(`${capitalize(key)} ${element}`);
          });
        }
        return ress;
      }, []);
    }
    if (showNotif) {
      toast({
        title: notifErrorTitle || '',
        variant: 'primary',
        iconType: 'error',
        description:
          notifErrorText || errTextArr[0] || error.response?.data.message || error.message || 'Something wrong happen.'
      });
    }
    onError && onError(error, variables);
  };

  const { mutate, data, isPending } = useMutation<T, AxiosError<BaseError>, MutateFnParam | undefined, unknown>({
    mutationFn: param =>
      defaultFetcherFn<T>({
        headers: {
          Accept: 'application/json',
          'Content-Type': contentType
        },
        data: param?.body,
        method,
        normalizer,
        url: param?.id ? `${url}${param.id}` : url
      }),
    onSuccess: handleSuccess,
    onError: handleError,
    retry
  });

  return {
    data,
    isPending,
    mutate
  };
};

export const usePostData = <T = void>(param: MutateQueryExtras<T>) => useMutateData(param);

export const usePutData = <T = void>(param: MutateQueryExtras<T>) => useMutateData(param);

export const usePatchData = <T = void>(param: MutateQueryExtras<T>) => useMutateData(param);

export const useDeleteData = <T = void>(param: MutateQueryExtras<T>) => useMutateData(param);
