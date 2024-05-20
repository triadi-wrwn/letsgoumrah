import * as React from 'react';

import type {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState
} from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';

import { DataTableColumnHeader } from './components/datatable-column-header';
import DataTablePagination from './components/datatable-pagination';
import type { ActionItem, DataTableProps, SortValue, TableHeaderMeta } from './datatable.type';
import Spinner from '@/components/ui-base/Spinner';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui-base/table';
import DatatableAction from '@/components/ui-group/datatable/components/datatable-actions';

import { cn } from '@/lib/utility';

export const DataTable = <T extends object>(props: DataTableProps<T>) => {
  const {
    data,
    columns,
    isLoading = false,
    frontPagination = false,
    totalPage = -1,
    pageIndex = 1,
    pageSize = 10,
    totalData = 0,
    showActionColumn = true,
    customActions,
    onSelectAction,
    onSortChange,
    onPaginationChange: paginateChange,
    showPaginate = true,
    showTableFooter = false,
    className = ''
  } = props;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [{ pageIndex: pageIdx, pageSize: pageSz }, setPagination] = React.useState<PaginationState>({
    pageIndex: pageIndex - 1,
    pageSize
  });
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const actionGenerator = (actionItems?: ActionItem[]): Array<ColumnDef<T>> => [
    {
      id: 'actions',
      header: 'Aksi',
      size: 80,
      enableSorting: false,
      meta: { align: 'center' },
      cell: ({ row }) => (
        <DatatableAction actionItems={actionItems} onSelect={onSelectAction && onSelectAction} row={row} />
      )
    }
  ];
  const table = useReactTable({
    data,
    columns: showActionColumn ? columns.concat(actionGenerator(customActions)) : columns,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: { pageIndex: pageIdx, pageSize: pageSz }
    },
    enableMultiSort: false,
    manualPagination: !frontPagination,
    manualSorting: !frontPagination,
    pageCount: totalPage,
    defaultColumn: {
      minSize: 0,
      size: Number.MAX_SAFE_INTEGER,
      maxSize: Number.MAX_SAFE_INTEGER
    }
  });

  const onSort = (sortVal: SortValue) => {
    onSortChange && onSortChange(sortVal);
    table.setPageIndex(0);
  };

  React.useEffect(() => {
    table.setPageIndex(pageIndex - 1);
  }, [pageIndex]);

  React.useEffect(() => {
    paginateChange && paginateChange({ pageIndex: pageIdx + 1, pageSize: pageSz });
  }, [pageIdx, pageSz]);

  return (
    <div className="min-w-full max-w-screen-lg overflow-x-auto mb-8">
      <div
        className={cn(
          'rounded-lg rounded-br-none rounded-bl-none rounded-t-none border border-b-0 border-r-0 border-l-0 relative bg-white',
          className
        )}
      >
        <Spinner loading={isLoading} loadingText="Loading.." />
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead
                    key={header.id}
                    style={{
                      width: header.getSize() === Number.MAX_SAFE_INTEGER ? 'auto' : header.getSize(),
                      textAlign: (header.column.columnDef.meta as TableHeaderMeta)?.align
                    }}
                  >
                    <DataTableColumnHeader
                      column={header.column}
                      title={header.column.columnDef.header ? header.column.columnDef.header?.toString() : ''}
                      onSortChange={onSort}
                      className="px-2"
                    />
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell
                      key={cell.id}
                      style={{
                        width: cell.column.getSize() === Number.MAX_SAFE_INTEGER ? 'auto' : cell.column.getSize(),
                        textAlign: (cell.column.columnDef.meta as TableHeaderMeta)?.align
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          {showTableFooter && (
            <TableFooter>
              {table.getFooterGroups().map(footerGroup => (
                <TableRow key={footerGroup.id}>
                  {footerGroup.headers.map(header => (
                    <TableHead
                      key={header.id}
                      style={{
                        width: header.getSize() === Number.MAX_SAFE_INTEGER ? 'auto' : header.getSize(),
                        textAlign: (header.column.columnDef.meta as TableHeaderMeta)?.align
                      }}
                    >
                      {flexRender(header.column.columnDef.footer, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableFooter>
          )}
        </Table>
      </div>
      {showPaginate && (
        <DataTablePagination
          table={table}
          totalData={totalData}
          // onPaginationChange={() =>
          //   paginateChange && paginateChange({ pageIndex: pageIdx + 1, pageSize: pageSz })
          // }
        />
      )}
    </div>
  );
};
