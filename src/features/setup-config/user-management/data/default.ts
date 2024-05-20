import { UserFormValues } from '../types/users.type';

const defaultUserForm: Partial<UserFormValues> = {
  code: '',
  name: '',
  email: '',
  userGroupId: '',
  jobPosition: '',
  departmentId: ''
};

// const dataDetailPageDummy: DetailItemData[][] = [
//   [
//     {
//       label: 'Code',
//       value: 'XXX'
//     },
//     {
//       label: 'Status',
//       value: 'Active',
//       showAsBadge: true,
//       variant: 'success'
//     }
//   ],
//   [
//     {
//       label: 'Name',
//       value: 'Divisi IT'
//     },
//     {
//       label: 'Description',
//       value: 'Tukang IT'
//     }
//   ]
// ];

export { defaultUserForm };
