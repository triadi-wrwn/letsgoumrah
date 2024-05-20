'use client';

import { ArrowDownIcon, ArrowUpIcon, CaretSortIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui-base/button';
import type { DataTableColumnHeaderProps, SortValue } from '@/components/ui-group/datatable/datatable.type';
import { cn } from '@/lib/utility';

export const SortedIcon = ({ sorted }: { sorted: string | boolean }) => {
  if (sorted === 'asc') {
    return <ArrowUpIcon className="ml-2 h-4 w-4" />;
  }

  return <ArrowDownIcon className="ml-2 h-4 w-4" />;
};

export const DataTableColumnHeader = <TData, TValue>({
  column,
  title,
  className,
  onSortChange
}: DataTableColumnHeaderProps<TData, TValue>) => {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  const sortClicked = () => {
    const sortValue: SortValue = { sortBy: column.id, sortDir: 'asc' };
    if (column.getIsSorted() === 'desc') {
      column.clearSorting();
      sortValue.sortBy = '';
      sortValue.sortDir = '';
    } else {
      column.toggleSorting(column.getIsSorted() === 'asc');
      sortValue.sortDir = column.getIsSorted() === 'asc' ? 'desc' : 'asc';
    }
    if (onSortChange) {
      onSortChange(sortValue);
    }
  };

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <Button variant="ghost" size="sm" className="-ml-5 h-8 data-[state=open]:bg-accent text-sm" onClick={sortClicked}>
        <span>{title}</span>
        {column.getIsSorted() ? (
          <SortedIcon sorted={column.getIsSorted()} />
        ) : (
          <CaretSortIcon className="ml-2 h-4 w-4" />
        )}
      </Button>
    </div>
  );
};
