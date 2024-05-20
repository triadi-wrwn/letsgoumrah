import { ReactNode } from 'react';

type GeneralPageFormProps = {
  title: string;
  showActionButton?: boolean;
  actionButtons?: ReactNode;
  children: ReactNode;
  isLoading?: boolean;
  className?: string;
  backUrl?: string;
};

export type { GeneralPageFormProps };
