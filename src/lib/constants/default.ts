import { GeneralListResponse } from '@/components/ui-group/general-page-list/general-page-list.type';
import { TabsItem } from '@/components/ui-group/tabs/tabs.types';
import { GeneralPaginateParam } from '@/lib/types/param.type';

export const GeneralDefaultParam: GeneralPaginateParam = {
  page: 1,
  page_size: 10,
  search: '',
  sort_by: 'created_at',
  sort_order: 'desc',
  status: ''
};

export const generalListResponse: GeneralListResponse<any> = {
  results: [],
  count: 0,
  next: '',
  previous: ''
};

export const tabsData: TabsItem[] = [
  {
    id: 1,
    label: 'All',
    tabValue: '',
    content: ''
  },
  {
    id: 2,
    label: 'Active',
    tabValue: 'active',
    content: ''
  },
  {
    id: 3,
    label: 'Inactive',
    tabValue: 'inactive',
    content: ''
  }
];

export const HO_BRANCHS_ARR = ['HO', 'Branch'];
export const GRADING_TYPE_ARR = ['HO', '3SA', '3SB', '3SC', '2SA', '2SB', '1SA', '1SB'];

export const HO_BRANCHS_OPTIONS = HO_BRANCHS_ARR.map(option => ({
  label: option,
  value: option.toUpperCase()
}));

export const GRADING_TYPE_OPTIONS = GRADING_TYPE_ARR.map(option => ({
  label: option,
  value: option.toUpperCase()
}));
