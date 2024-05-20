import { ReactNode } from 'react';

export type TabsItem = {
  id: number;
  label: string;
  tabValue?: string;
  content: string | ReactNode | ReactNode[];
};

export type TabChangeProps = Omit<TabsItem, 'content'>;
export type TabsProps = {
  data: TabsItem[];
  onChange?: (_val: TabChangeProps) => void;
};
