// export type PaginateData<T> = {
//   hasNextPage: boolean;
//   page: number;
//   size: number;
//   totalPage: number;
//   total: number;
//   data: T[];
// };

export type PaginationData<T> = {
  next: string;
  previous: string;
  count: number;
  results: T[];
};

export interface BaseError {
  code: number;
  message: string;
  payload?: ErrorPayload[];
}

export interface ErrorPayload {
  attemptedValue: string;
  errorCode: string;
  message: string;
  propertyName: string;
}

export interface BaseQueryParams {
  [key: string]: unknown;
  page: number;
  size: number;
  orderType: string;
  orderBy: string;
}

export interface OptionItemResponse {
  key: string;
  value: string;
}

export interface AuditTrail {
  createdBy: string;
  createdByFullName: string;
  createdAt: string;
  lastUpdatedBy: string;
  lastUpdatedByFullName: string;
  lastUpdatedAt: string;
}

export type BaseItem = {
  id: number;
  name: string;
};

export type SearchOptions = OptionItemResponse[];
