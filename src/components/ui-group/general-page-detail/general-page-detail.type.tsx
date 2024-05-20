import { BadgeProps } from '@/components/ui-base/badge';
import { ReactNode } from 'react';

interface DetailItemData extends BadgeProps {
  label: string;
  value: string | ReactNode;
  showAsBadge?: boolean;
}

type DefaultActionButtonDetailProps = {
  queryKeys?: string;
  apiUrl?: string;
  title?: string;
  showDeactivate?: boolean;
  showEdit?: boolean;
};

type GeneralPageDetailProps = DefaultActionButtonDetailProps & {
  showActionButtons?: boolean;
  isLoading?: boolean;
  actionButtons?: ReactNode;
  data: DetailItemData[][];
  children?: ReactNode;
  className?: string;
};

export type { GeneralPageDetailProps, DetailItemData, DefaultActionButtonDetailProps };
