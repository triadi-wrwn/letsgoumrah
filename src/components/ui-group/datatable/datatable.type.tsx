import type { Column, ColumnDef, Row, SortDirection, Table } from '@tanstack/react-table';
import type React from 'react';
import { ReactNode } from 'react';

export type SortValue = {
  sortBy: string;
  sortDir: SortDirection | '';
};

export type PaginationValue = {
  pageIndex: number;
  pageSize: number;
};

export type ActionItem = {
  label: string;
  icon: ReactNode;
  actionId: string;
};

export type onSelectActionValue<T> = {
  action: string;
  data: T;
};

export type DataTableProps<T> = {
  data: T[];
  columns: Array<ColumnDef<T>>;
  isLoading?: boolean;
  frontPagination?: boolean;
  totalPage?: number;
  pageIndex?: number;
  pageSize?: number;
  totalData?: number;
  showActionColumn?: boolean;
  customActions?: ActionItem[];
  onSelectAction?: (_val: onSelectActionValue<T>) => void;
  onPaginationChange?: (_val: PaginationValue) => void;
  onSortChange?: (_val: SortValue) => void;
  className?: string;
  classNameWrapper?: string;
  showPaginate?: boolean;
  showTableFooter?: boolean;
};

export interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title?: string;
  onSortChange?: (_val: SortValue) => void;
}

export interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  totalData?: number;
}

export type TableHeaderMeta = {
  align?: 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | 'match-parent' | undefined;
  width?: string;
  rowSpan?: number;
};

export type DatatableActionProps<T> = {
  row: Row<T>;
  actionItems?: ActionItem[];
  menuName?: string;
  onSelect?: (_val: onSelectActionValue<T>) => void;
};
