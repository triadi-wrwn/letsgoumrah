import { useCallback, useEffect, useMemo } from 'react';
import { useConfirmation } from '@/lib/hooks/use-confirmation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useGetData from '@/lib/hooks/use-get-data';
import { API_ENDPOINT } from '@/lib/constants/api-urls';
import { useMutateData } from '@/lib/hooks/use-mutate-data';
import { PAGE_CHILD_URLS, PAGE_URLS } from '@/lib/constants/page-urls';
import { pageTitleConverter } from '@/lib/utility';
import {
  UserDetail,
  UserDetailAPI,
  UserFormValues,
  UserPayload
} from '@/features/setup-config/user-management/types/users.type';
import { userFormSchema } from '@/features/setup-config/user-management/data/schema';
import { defaultUserForm } from '@/features/setup-config/user-management/data/default';
import { useQueryClient } from '@tanstack/react-query';
import { SelectOption } from '@/lib/types/select.type';

const useFormUser = () => {
  const {
    SETUP_CONFIG: { USERS: USERS_API, USERS_BY_ID }
  } = API_ENDPOINT;

  const {
    SETUP_CONFIG: { USERS }
  } = PAGE_URLS;

  const { id = '' } = useParams();
  const navigate = useNavigate();
  const route = useLocation();
  const queryClient = useQueryClient();

  const { confirmation } = useConfirmation();

  const isEdit = useMemo(() => route.pathname.includes(PAGE_CHILD_URLS.UPDATE), [route.pathname]);
  const isDetail = useMemo(() => route.pathname.includes(PAGE_CHILD_URLS.DETAIL), [route.pathname]);
  const title = useMemo(() => pageTitleConverter(USERS, route.pathname), [USERS, route.pathname]);

  const userGroupOptions: SelectOption[] = [];
  const departmentOptions: SelectOption[] = [];

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: defaultUserForm,
    mode: 'onChange'
  });

  const normal = (data: UserDetailAPI): UserDetail => {
    return {
      ...data,
      code: data.employee_no,
      name: data.employee_name,
      email: data.employee_email,
      jobPosition: data.job_position,
      userGroupId: String(data.groups?.id) || '',
      userGroupName: data.groups?.name,
      departmentId: String(data.department?.id) || '',
      departmentName: data.department?.name,
      status: data.status
    };
  };

  const {
    data: detail,
    isFetching,
    isFetched
  } = useGetData<UserDetail, UserDetailAPI>([USERS, id], USERS_BY_ID(String(id)), {
    options: { enabled: !!id },
    normalizer: normal
  });

  const { mutate: mutateSubmit, isPending: isSubmiting } = useMutateData({
    url: !isEdit ? `${USERS_API}create/` : `${USERS_BY_ID(String(id))}/update/`,
    method: !isEdit ? 'post' : 'patch',
    options: {
      showNotif: true,
      onSuccess: () => {
        queryClient.invalidateQueries(), navigate('../');
      }
    }
  });

  const submitData = () => {
    const objPayload: UserPayload = {
      department: +form.getValues().departmentId,
      employee_email: form.getValues().email,
      employee_name: form.getValues().name,
      employee_no: form.getValues().code,
      job_position: form.getValues().jobPosition,
      groups: +form.getValues().userGroupId
    };

    mutateSubmit({ body: objPayload });
  };

  const onSubmit = () => {
    confirmation({
      title: 'Confirmation',
      onConfirm: () => submitData()
    });
  };

  const setFormValue = useCallback(
    (data: UserDetail) => {
      form.reset({
        code: data.code,
        name: data.name,
        email: data.email,
        jobPosition: data.jobPosition,
        userGroupId: data.userGroupId || '',
        departmentId: data.departmentId || ''
      });
    },
    [form]
  );

  useEffect(() => {
    if (isFetched && detail) {
      setFormValue(detail);
    }
  }, [detail, isFetched, setFormValue]);

  return {
    form,
    title,
    detail,
    isEdit,
    isDetail,
    isSubmiting,
    isFetching,
    submitData,
    onSubmit,
    userGroupOptions,
    departmentOptions
  };
};

export default useFormUser;
