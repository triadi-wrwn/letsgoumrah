import { useNavigate } from 'react-router-dom';

import { ACTION, HTTP_METHOD, STATUS } from '@/lib/constants/common';
import { useConfirmation } from '@/lib/hooks/use-confirmation';
import { useMutateData } from '@/lib/hooks/use-mutate-data';
import { User } from '../types/users.type';
import { onSelectActionValue } from '@/components/ui-group/datatable/datatable.type';
import { useQueryClient } from '@tanstack/react-query';
import { API_ENDPOINT } from '@/lib/constants/api-urls';
import { PAGE_CHILD_URLS, PAGE_URLS } from '@/lib/constants/page-urls';

const useListUserManagement = () => {
  const navigate = useNavigate();
  const { confirmation } = useConfirmation();
  const queryClient = useQueryClient();

  const {
    SETUP_CONFIG: { USERS: USER_API }
  } = API_ENDPOINT;

  const {
    SETUP_CONFIG: { USERS }
  } = PAGE_URLS;

  const { mutate: deleteData, isPending: isDeleting } = useMutateData({
    url: USER_API,
    method: HTTP_METHOD.DELETE,
    options: {
      showNotif: true,
      onSuccess: () => queryClient.invalidateQueries({ queryKey: [USERS] })
    }
  });

  const { mutate: editData, isPending: isUpdating } = useMutateData({
    url: USER_API,
    method: HTTP_METHOD.PATCH,
    options: {
      showNotif: true,
      onSuccess: () => queryClient.invalidateQueries({ queryKey: [USERS] })
    }
  });

  const submitData = (action: string, data: User) => {
    if (action === ACTION.DELETE) {
      deleteData({ id: `${data.id}/${ACTION.DELETE}/` });
    } else {
      editData({
        id: `${data.id}/${ACTION.UPDATE}/`,
        body: { status: data.status === STATUS.ACTIVE ? STATUS.INACTIVE : STATUS.ACTIVE }
      });
    }
  };

  const onSelectAction = (val: onSelectActionValue<User>) => {
    switch (val.action) {
      case ACTION.DETAIL:
        navigate(`./${PAGE_CHILD_URLS.DETAIL}/${val.data.id}`);
        break;
      case ACTION.UPDATE:
        navigate(`./${PAGE_CHILD_URLS.UPDATE}/${val.data.id}`);
        break;
      case ACTION.EDIT:
        navigate(`./${PAGE_CHILD_URLS.UPDATE}/${val.data.id}`);
        break;
      // case ACTION.DELETE:
      case ACTION.DEACTIVATE:
        confirmation({
          type: val.action === ACTION.DELETE ? 'delete' : 'deactivate',
          onConfirm: () => submitData(val.action, val.data)
        });
        break;
      case ACTION.ACTIVATE:
        confirmation({
          type: 'activate',
          onConfirm: () => submitData(val.action, val.data)
        });
        break;
      default:
        break;
    }
  };

  return { onSelectAction, isDeleting, isUpdating };
};

export default useListUserManagement;
