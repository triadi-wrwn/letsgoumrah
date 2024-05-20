export const AUTH_TOKEN_NAME = 'authtoken';
export const AUTH_REFRESH_TOKEN_NAME = 'authrefreshtoken';
export const BASE_API_URL = import.meta.env.VITE_BASE_URL;

export const ACTION = {
  CREATE: 'create',
  EDIT: 'edit',
  UPDATE: 'update',
  DETAIL: 'detail',
  DELETE: 'delete',
  DEACTIVATE: 'deactivate',
  ACTIVATE: 'activate',
  SUBMIT: 'submit'
};

export const DateFormat = {
  base: 'dd-MM-yyyy',
  detail: 'dd MMMM yyyy',
  table: 'dd-MM-yyyy'
};

export const STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  DRAFT: 'DRAFT',
  SUBMIT: 'SUBMIT'
};

export const STATUS_TEXT = {
  [STATUS.ACTIVE]: 'Active',
  [STATUS.INACTIVE]: 'Inactive',
  [STATUS.DRAFT]: 'Draft'
};

export const HTTP_METHOD = {
  GET: 'get' as 'get',
  POST: 'post' as 'post',
  PUT: 'put' as 'put',
  PATCH: 'patch' as 'patch',
  DELETE: 'delete' as 'delete'
};

export const CONTENT_TYPE_EXCEL = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

export const RESPONSE_TYPE = {
  JSON: 'json' as 'json',
  ARRAY_BUFFER: 'arraybuffer' as 'arraybuffer',
  BLOB: 'blob' as 'blob',
  DOCUMENT: 'document' as 'document',
  TEXT: 'text' as 'text',
  STREAM: 'stream' as 'stream'
};
