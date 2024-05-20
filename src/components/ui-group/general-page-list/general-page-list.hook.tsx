import useGetData from '@/lib/hooks/use-get-data';
import { useEffect, useState } from 'react';
import { PaginationValue, SortValue } from '@/components/ui-group/datatable/datatable.type';
import { TabChangeProps } from '@/components/ui-group/tabs/tabs.types';
import { GeneralPaginateParam } from '@/lib/types/param.type';
import { GeneralDefaultParam, generalListResponse } from '@/lib/constants/default';
import { GeneralListResponse } from '@/components/ui-group/general-page-list/general-page-list.type';

export type GeneralPageHook<T, TParam = T> = {
  apiUrl: string;
  queryKeys: string[];
  normalizer?: (_data: GeneralListResponse<TParam>) => GeneralListResponse<T>;
};

const useGeneralPageList = <T extends object, TParam>(props: GeneralPageHook<T, TParam>) => {
  const { apiUrl, queryKeys, normalizer } = props;
  const [params, setParams] = useState<GeneralPaginateParam>(GeneralDefaultParam);

  const { data, isFetching, refetch } = useGetData<GeneralListResponse<T>, GeneralListResponse<TParam>>(
    queryKeys,
    apiUrl,
    {
      params: params,
      options: {
        initialData: generalListResponse
      },
      normalizer
    }
  );
  const dataTableWithNumber = data?.results?.map((item, index) => ({
    ...item,
    itemNumber: index + 1 + params.page * params.page_size - params.page_size
  }));

  const onSortChange = (sort: SortValue) => {
    setParams(param => ({
      ...param,
      sort_by: sort.sortBy || GeneralDefaultParam.sort_by,
      sort_order: sort.sortDir || GeneralDefaultParam.sort_order,
      page: 1
    }));
  };

  const onPaginationChange = (pagination: PaginationValue) => {
    setParams(param => ({
      ...param,
      page_size: pagination.pageSize,
      page: pagination.pageIndex
    }));
  };

  const onFilterChange = (value: string | string[] | undefined, key: string) => {
    setParams(param => ({ ...param, page: 1, [key]: value }));
  };

  const onFilterTabChange = (val: TabChangeProps) => {
    setParams(param => ({ ...param, status: val.tabValue }));
  };

  useEffect(() => {
    refetch();
  }, [params.sort_by, params.sort_order, params.page, params.page_size, params.search, params.status, refetch]);

  return {
    data,
    dataTableWithNumber,
    isFetching,
    params,
    onPaginationChange,
    onSortChange,
    onFilterTabChange,
    onFilterChange
  };
};

export default useGeneralPageList;
