import { Link, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { Button } from '@/components/ui-base/button';
import { ActionItem } from '@/components/ui-group/datatable/datatable.type';

import { ACTION, HTTP_METHOD, STATUS } from '@/lib/constants/common';
import { confirmation } from '@/lib/hooks/use-confirmation';
import { useMutateData } from '@/lib/hooks/use-mutate-data';
import { MinusCircledIcon, Pencil1Icon, PlusCircledIcon } from '@radix-ui/react-icons';

import { DefaultActionButtonDetailProps } from './general-page-detail.type';
import { useAuthContext } from '@/lib/contexts/auth-context';
import { UserGroupOutletDetail } from '@/features/setup-config/user-group-outlet/types/user-group-outlet.type';

const DefaultActionButtons = (props: DefaultActionButtonDetailProps) => {
  const { currentUser } = useAuthContext();
  const { apiUrl = '', queryKeys = '', title = '', showDeactivate, showEdit } = props;

  const { id = '' } = useParams();
  const queryClient = useQueryClient();

  const dataDetail: any = queryClient.getQueryData([queryKeys, id]);
  const isStatusActive = dataDetail?.status === STATUS.ACTIVE;
  const dynamicAction: ActionItem = {
    label: isStatusActive ? 'Deactivate' : 'Activate',
    actionId: isStatusActive ? ACTION.DEACTIVATE : ACTION.ACTIVATE,
    icon: isStatusActive ? <MinusCircledIcon /> : <PlusCircledIcon />
  };

  const { mutate: editData } = useMutateData({
    url: apiUrl,
    method: HTTP_METHOD.PATCH,
    options: {
      showNotif: true,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [queryKeys, id] });
      }
    }
  });
  let menuName = title;

  if (title == 'Users Group Details') menuName = 'Group Management Details';
  if (title == 'Users Group Outlet Details') menuName = 'Outlet Management Details';
  if (title == 'Privilege Details') menuName = 'Privilege Management Details';
  const menu = currentUser?.privilege?.menus.find(menu => menuName.startsWith(menu.menu_name));
  const allowUpdate = showEdit === undefined ? menu?.allow_update || false : showEdit;
  const allowDeactive = showDeactivate === undefined ? menu?.allow_deactive || false : showDeactivate;
  const handleDeactivate = () => {
    confirmation({
      type: dynamicAction.label.toLowerCase() as 'deactivate' | 'activate',
      onConfirm: () => {
        if (title === 'Users Group Outlet Details') {
          const data = queryClient.getQueryCache().find({ queryKey: [queryKeys, id] })?.state
            .data as UserGroupOutletDetail;
          const payloadData = {
            id: `${id}/${ACTION.UPDATE}/`,
            body: {
              code: data?.code,
              outlet: data?.outlets.map(el => el.id),
              user_group: data?.id,
              status: data?.status === STATUS.ACTIVE ? STATUS.INACTIVE : STATUS.ACTIVE
            }
          };
          editData(payloadData);
          return;
        }
        const payloadData = {
          id: `${id}/${ACTION.UPDATE}/`,
          body: {
            status: dataDetail?.status === STATUS.ACTIVE ? STATUS.INACTIVE : STATUS.ACTIVE
          }
        };
        editData(payloadData);
      }
    });
  };

  return (
    <div className="flex justify-between items-center gap-3">
      {allowDeactive && (
        <Button onClick={handleDeactivate} variant="outline" className="flex items-center gap-2">
          {dynamicAction.icon} {dynamicAction.label}
        </Button>
      )}

      {allowUpdate ? (
        <Link to={`../${ACTION.UPDATE}/${id}`}>
          <Button variant="outline" className="flex items-center gap-2">
            <Pencil1Icon /> Edit
          </Button>
        </Link>
      ) : (
        ''
      )}
    </div>
  );
};

export default DefaultActionButtons;
