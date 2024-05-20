import { ColumnDef } from '@tanstack/react-table';
// import { Link } from 'react-router-dom';

import { Badge } from '@/components/ui-base/badge';
// import { ActionItem } from '@/components/ui-group/datatable/datatable.type';

import { getStatus } from '@/lib/utility/status-badge';

import { User } from '../types/users.type';
import { ActionItem, onSelectActionValue } from '@/components/ui-group/datatable/datatable.type';
// import { ACTION } from '@/lib/constants/common';
// import { EyeOpenIcon, Pencil1Icon } from '@radix-ui/react-icons';
import DatatableAction from '@/components/ui-group/datatable/components/datatable-actions';
import { Link } from 'react-router-dom';
import { ACTION, STATUS } from '@/lib/constants/common';
import { EyeOpenIcon, MinusCircledIcon, Pencil1Icon, PlusCircledIcon } from '@radix-ui/react-icons';
// import DatatableAction from '@/components/ui-group/datatable/components/datatable-actions';

export const columns = ({
  onSelectAction
}: {
  onSelectAction: (_val: onSelectActionValue<User>) => void;
}): ColumnDef<User>[] => [
  {
    accessorKey: 'itemNumber',
    header: '',
    size: 5,
    enableSorting: false
  },
  {
    accessorKey: 'name',
    header: 'Employee Name',
    cell: ({ row }) => {
      const item = row.getValue('name') as string;
      return (
        <Link to={`./detail/${row.original.id}`} className="text-blue-500 ">
          <p className="min-w-max">{item}</p>
        </Link>
      );
    }
  },
  {
    accessorKey: 'code',
    header: 'Employee No',
    size: 5
  },
  {
    accessorKey: 'email',
    header: 'Email',
    size: 5
  },
  {
    accessorKey: 'userGroupName',
    header: 'User Group',
    size: 5
  },
  {
    accessorKey: 'jobPosition',
    header: 'Job Position',
    cell: ({ row }) => {
      const item = row.getValue('jobPosition') as string;
      return <p className="min-w-max">{item}</p>;
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    size: 80,
    cell: ({ row }) => {
      const item = getStatus(row.getValue('status'));
      return (
        <Badge className="block w-fit" variant={item.variant}>
          {item.value}
        </Badge>
      );
    }
  },
  {
    id: 'actions',
    header: '',
    size: 5,
    enableSorting: false,
    meta: { align: 'center' },
    cell: ({ row }) => {
      const isStatusActive = row.original.status === STATUS.ACTIVE;
      const dynamicAction: ActionItem = {
        label: isStatusActive ? 'Deactivate' : 'Activate',
        actionId: isStatusActive ? ACTION.DEACTIVATE : ACTION.ACTIVATE,
        icon: isStatusActive ? <MinusCircledIcon /> : <PlusCircledIcon />
      };
      const actions: ActionItem[] = [
        { label: dynamicAction.label, actionId: dynamicAction.actionId, icon: dynamicAction.icon },
        { label: 'View', actionId: ACTION.DETAIL, icon: <EyeOpenIcon /> },
        { label: 'Edit', actionId: ACTION.EDIT, icon: <Pencil1Icon /> }
      ];
      return <DatatableAction actionItems={actions} onSelect={onSelectAction} row={row} />;
    }
  }
];
