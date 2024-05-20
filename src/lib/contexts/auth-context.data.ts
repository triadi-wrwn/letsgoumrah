import { Profile } from '@/lib/types/auth-response.type';

export const defaultProfile: Profile = {
  id: '',
  htds_id: '',
  employee_no: '',
  employee_name: '',
  groups: 0,
  group_name: '',
  department: '',
  job_position: '',
  employee_email: '',
  username: '',
  password: '',
  status: '',
  privilege: {
    id: 0,
    code: '',
    menus: []
  }
};
