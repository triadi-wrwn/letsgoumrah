export interface AuthResponse {
  access_token: string;
  expiry: number;
  refreshToken: string;
  id: string;
}

interface Privilege {
  id: number;
  code: string;
  menus: PrivilegeMenu[];
}

interface PrivilegeMenu {
  menu: number;
  menu_name: string;
  allow_create: boolean;
  allow_read: boolean;
  allow_update: boolean;
  allow_deactive: boolean;
}

export type Profile = {
  id: string;
  htds_id: string;
  employee_no: string;
  employee_name: string;
  groups: number;
  group_name: string;
  department: string;
  job_position: string;
  employee_email: string;
  username: string;
  password: string;
  status: string;
  privilege: Privilege;
};
