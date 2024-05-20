import { GeneralListResponse } from '@/components/ui-group/general-page-list/general-page-list.type';
import { User, UserApi, UserDetail } from '../types/users.type';
import { DetailItemData } from '@/components/ui-group/general-page-detail/general-page-detail.type';
import { getStatus } from '@/lib/utility/status-badge';

const UserNormalizer = (response: GeneralListResponse<UserApi>): GeneralListResponse<User> => {
  return {
    ...response,
    results: response.results.reduce((result: User[], item: UserApi) => {
      result.push({
        id: String(item.id),
        name: item.employee_name,
        code: item.employee_no,
        email: item.employee_email,
        userGroupId: String(item?.groups?.id) || '',
        userGroupName: item?.groups?.name || '',
        jobPosition: item.job_position,
        status: item.status,
        createdAt: String(item.created_at),
        createdBy: item.created_by,
        createdByFullName: item.created_by,
        lastUpdatedAt: String(item.updated_at),
        lastUpdatedBy: item.updated_by,
        lastUpdatedByFullName: item.updated_by
      });
      return result;
    }, [])
  };
};

const UserDetailField = (data?: UserDetail): DetailItemData[][] => {
  if (!data) {
    return [];
  }
  return [
    [
      {
        label: 'Employee Name',
        value: data.name
      },
      {
        label: 'Status',
        value: getStatus(data.status).value,
        showAsBadge: true,
        variant: getStatus(data.status).variant
      }
    ],
    [
      {
        label: 'Employee No.',
        value: data.code
      },
      {
        label: 'Email',
        value: data.email
      }
    ],
    [
      {
        label: 'User Group',
        value: data.userGroupName || '-'
      },
      {
        label: 'Job Position',
        value: data.jobPosition
      }
    ],
    [
      {
        label: 'Department',
        value: data.departmentName || '-'
      }
    ]
  ];
};

export { UserNormalizer, UserDetailField };
