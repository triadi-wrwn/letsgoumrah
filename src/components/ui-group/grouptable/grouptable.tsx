import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui-base/table';
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import { DataTableProps, SortValue, TableHeaderMeta } from '../datatable/datatable.type';
import Spinner from '@/components/ui-base/Spinner';
import { cn } from '@/lib/utility';
import DataTablePagination from '../datatable/components/datatable-pagination';
import React from 'react';
import { DataTableColumnHeader } from '../datatable/components/datatable-column-header';

const GroupTable = <T extends object>(props: DataTableProps<T>) => {
  const {
    data,
    columns,
    isLoading = false,
    frontPagination = false,
    totalPage = -1,
    pageIndex = 1,
    pageSize = 10,
    totalData = 0,
    onSortChange,
    onPaginationChange: paginateChange,
    showPaginate = true,
    showTableFooter = false,
    className = '',
    classNameWrapper = ''
  } = props;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [{ pageIndex: pageIdx, pageSize: pageSz }, setPagination] = React.useState<PaginationState>({
    pageIndex: pageIndex - 1,
    pageSize
  });
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    defaultColumn: {
      size: 200, //starting column size
      minSize: 50, //enforced during column resizing
      maxSize: 500 //enforced during column resizing
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: { pageIndex: pageIdx, pageSize: pageSz }
    },
    manualPagination: !frontPagination,
    manualSorting: !frontPagination,
    pageCount: totalPage,
    enableMultiSort: false
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
    <div className={cn('min-w-full max-w-screen-lg overflow-x-auto mb-8', classNameWrapper)}>
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
                {headerGroup.headers.map(header => {
                  const columnRelativeDepth = header.depth - header.column.depth;

                  if (!header.isPlaceholder && columnRelativeDepth > 1 && header.id === header.column.id) {
                    return null;
                  }

                  let rowSpan = 1;
                  if (header.isPlaceholder) {
                    const leafs = header.getLeafHeaders();
                    rowSpan = leafs[leafs.length - 1].depth - header.depth;
                  }
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      rowSpan={rowSpan}
                      className="border"
                      style={{
                        // width: 300,
                        width: header.column.getSize() === Number.MAX_SAFE_INTEGER ? 'auto' : header.column.getSize(),
                        textAlign: (header.column.columnDef.meta as TableHeaderMeta)?.align
                      }}
                    >
                      {/* {flexRender(header.column.columnDef.header, header.getContext())} */}
                      <DataTableColumnHeader
                        column={header.column}
                        title={header.column.columnDef.header ? header.column.columnDef.header?.toString() : ''}
                        onSortChange={onSort}
                        className="px-2"
                      />
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
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
                <TableCell
                  colSpan={table.getAllColumns().reduce((totalCol, col) => {
                    totalCol = totalCol + col.columns.length;
                    return totalCol;
                  }, table.getAllColumns().length)}
                  className="py-12 h-6 text-center w-full"
                >
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

export default GroupTable;
