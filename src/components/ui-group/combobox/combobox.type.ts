import { SelectOption } from '@/lib/types/select.type';

export type ComboboxProps = {
  dataKey?: string;
  options: SelectOption[];
  placeholder?: string;
  searchPlaceHolder?: string;
  showCheckbox?: boolean;
  isMulti?: boolean;
  closeOnSelect?: boolean;
  className?: string;
  'aria-invalid'?: boolean;
  value?: string | string[];
  isDisable?: boolean;
  asyncSearch?: boolean;
  allowClear?: boolean;
  onSearchChange?: (_value: string) => void;
  onChange?: (_value: string | string[] | undefined, _key: string) => void;
};
