import { ReactNode } from 'react';

export type GeneralHeaderPageDetailProps = {
  title: string;
  showActionButtons?: boolean;
  actionButtons?: ReactNode;
  backUrl?: string;
  showDeactivate?: boolean;
  showEdit?: boolean;
};
