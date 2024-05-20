import { z } from 'zod';
import { userFormSchema } from '../data/schema';
import { AuditTrail } from '@/lib/types/response.type';

export type User = {
  id: string;
  code: string;
  name: string;
  email: string;
  status: string;
  userGroupId: string;
  userGroupName: string;
  jobPosition: string;
} & Partial<AuditTrail>;

export type GroupsItemAPI = {
  id: number;
  code: string;
  name: string;
  description: string;
  status: string;
};

export type UserApi = {
  id: number;
  htds_id: string;
  groups?: GroupsItemAPI;
  employee_name: string;
  employee_no: string;
  employee_email: string;
  job_position: string;
  status: string;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
  deleted_at: string;
  deleted_by: string;
};

export type GroupDetailItemAPI = {
  id: number;
  name: string;
};

export type UserDetailAPI = {
  id: string;
  htds_id: string;
  groups: GroupDetailItemAPI;
  department: GroupDetailItemAPI;
  employee_no: string;
  employee_email: string;
  employee_name: string;
  job_position: string;
  status: string;
};

export type UserDetail = User & {
  departmentId: string;
  departmentName: string;
};

export type UserPayload = {
  employee_name: string;
  employee_no: string;
  employee_email: string;
  groups: number;
  job_position: string;
  department: number;
};

export type UserFormValues = z.infer<typeof userFormSchema>;
