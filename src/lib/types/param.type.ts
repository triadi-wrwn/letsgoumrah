type GeneralPaginateParam = {
  search: string;
  page: number;
  page_size: number;
  sort_by: string;
  sort_order: 'asc' | 'desc' | '';
  status?: string;
};

export type { GeneralPaginateParam };
