export const PAGE_CHILD_URLS = {
  CREATE: 'create',
  DETAIL: 'detail',
  UPDATE: 'update'
};

export const PAGE_PARAMS = {
  ID: ':id',
  DETAIL: ':detail',
  UPDATE: ':update',
  NO: ':no'
};

export const PAGE_URLS = {
  AUTH: {
    LOGIN: '/authentication/login'
  },
  DASHBOARD: '/dashboard',
  SETUP_CONFIG: {
    SETUP_CONFIG_INDEX: 'setup-config',
    USERS: 'user-management',
    USERS_GROUP: 'users-group',
    USER_GROUP_OPTIONS: 'user-group-options',
    USERS_GROUP_OUTLET: 'users-group-outlet',
    PRIVILEGE: 'privilege',
    MENUS: 'menus'
  },
  ORGANIZATION_STRUCTURE: 'struktur-warrior',
  MASTER_DATA: {
    MASTER_DATA_INDEX: 'master-data',
    KPI_TYPES: 'kpi-type',
    KPI_TYPES_OPTIONS: 'kpi-type-options',
    KPI_ASPECT: 'kpi-aspect',
    KPI_ASPECT_OPTIONS: 'kpi-aspect-options',
    KPI_CATEGORY: 'kpi-category',
    KPI_CATEGORY_OPTIONS: 'kpi-category-options',
    KPI_ITEM: 'kpi-item',
    KPI_ITEM_OPTIONS: 'kpi-item-options',
    PRIORITY: 'priority',
    GRADING_PERIOD: 'grading-period',
    GRADING_PERIOD_OPTIONS: 'grading-period-options',
    GRADING_RANGE: 'grading-range',
    OUTLET: 'outlet',
    OUTLET_OPTIONS: 'outlet-options',
    DEPARTMENT: 'department',
    DEPARTMENT_OPTIONS: 'department-options',
    DIVISION: 'division',
    DIVISION_OPTIONS: 'division-options'
  },
  KPI: {
    KPI_INDEX: 'kpi',
    KPI_MASTER: 'kpi-master',
    KPI_MASTER_OPTIONS: 'kpi-master-options',

    GRADING_REGISTRATION: 'grading-registration',

    GRADING_SCORE: 'grading-score'
  }
};
