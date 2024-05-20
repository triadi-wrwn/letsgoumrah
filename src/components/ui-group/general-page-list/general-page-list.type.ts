import { onSelectActionValue } from '@/components/ui-group/datatable/datatable.type';
import { TabsItem } from '@/components/ui-group/tabs/tabs.types';
import { PaginationData } from '@/lib/types/response.type';
import { ColumnDef } from '@tanstack/react-table';
import { ReactNode } from 'react';

type GeneralPageProps<T, TApi> = {
  title: string;
  showFilterTab?: boolean;
  showFilterSearch?: boolean;
  actionButtons?: ReactNode;
  tabs?: TabsItem[];
  apiUrl: string;
  queryKeys: string[];
  columns: ColumnDef<T>[];
  frontPagination?: boolean;
  initialData?: T[];
  loading?: boolean;
  onSelectAction?: (_val: onSelectActionValue<T>) => void;
  normalizer?: (_data: GeneralListResponse<TApi>) => GeneralListResponse<T>;
};

type GeneralListResponse<T> = PaginationData<T>;

export type { GeneralPageProps, GeneralListResponse };
