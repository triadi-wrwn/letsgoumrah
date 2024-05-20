import { Button } from '@/components/ui-base/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui-base/dropdown';
import { ActionItem, DatatableActionProps } from '@/components/ui-group/datatable/datatable.type';
import { ACTION } from '@/lib/constants/common';
import { useAuthContext } from '@/lib/contexts/auth-context';
import { DotsVerticalIcon, EyeOpenIcon, MinusCircledIcon, Pencil1Icon } from '@radix-ui/react-icons';

export const defaultActions: ActionItem[] = [
  { label: 'View', actionId: ACTION.DETAIL, icon: <EyeOpenIcon /> },
  { label: 'Edit', actionId: ACTION.EDIT, icon: <Pencil1Icon /> },
  { label: 'Deactivate', actionId: ACTION.DEACTIVATE, icon: <MinusCircledIcon /> }
  // { label: 'Delete', actionId: ACTION.DELETE, icon: <TrashIcon /> }
];

const DatatableAction = <T extends object>(props: DatatableActionProps<T>) => {
  const { actionItems = defaultActions, row, onSelect, menuName } = props;
  const { currentUser } = useAuthContext();

  let actions = actionItems;
  if (menuName) {
    const menuPrivilage = currentUser?.privilege?.menus.find(menu => menu.menu_name === menuName);

    if (!menuPrivilage?.allow_create) {
      actions = actions.filter(item => item.actionId !== ACTION.CREATE);
    }

    if (!menuPrivilage?.allow_read) {
      actions = actions.filter(item => item.actionId !== ACTION.DETAIL);
    }

    if (!menuPrivilage?.allow_deactive) {
      actions = actions.filter(item => item.actionId !== ACTION.DEACTIVATE);
    }

    if (!menuPrivilage?.allow_update) {
      actions = actions.filter(item => item.actionId !== ACTION.EDIT);
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-4 p-0">
          <span className="sr-only">aksi</span>
          <DotsVerticalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {actions.map(item => (
          <DropdownMenuItem
            key={item.label}
            onClick={() => onSelect && onSelect({ action: item.actionId, data: row.original })}
            className="gap-3"
          >
            {item.icon}
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DatatableAction;
