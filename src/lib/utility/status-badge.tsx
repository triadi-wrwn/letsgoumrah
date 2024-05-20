import { STATUS, STATUS_TEXT } from '@/lib/constants/common';
import { DashboardStatusType } from '@/lib/types/dashboard-status.type';

export const getStatus = (status: string): DashboardStatusType => {
  switch (status) {
    case STATUS.ACTIVE:
      return {
        variant: 'success',
        value: STATUS_TEXT[STATUS.ACTIVE]
      };

    case STATUS.INACTIVE:
      return {
        variant: 'destructive',
        value: STATUS_TEXT[STATUS.INACTIVE]
      };

    case STATUS.DRAFT:
      return {
        variant: 'secondary',
        value: STATUS_TEXT[STATUS.DRAFT]
      };

    default:
      return {
        variant: 'secondary',
        value: STATUS_TEXT[STATUS.DRAFT]
      };
  }
};
