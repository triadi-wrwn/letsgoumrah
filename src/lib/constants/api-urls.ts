export const API_ENDPOINT = {
  AUTH: {
    LOGIN: '/user/login',
    PROFILE: '/user/profile/',
    REFRESH: '/auth/refresh'
  },
  SETUP_CONFIG: {
    USERS: '/user/',
    USERS_BY_ID: (id: string) => `/user/${id}`,

    USER_GROUP: '/user-group/',
    USER_GROUP_BY_ID: (id: string) => `/user-group/${id}`,
    USER_GROUP_OPTIONS: '/user-group/list-form/',

    USER_GROUP_OUTLET: '/user-group-outlet/',
    USER_GROUP_OUTLET_BY_ID: (id: string) => `/user-group-outlet/${id}`,

    PRIVILEGE: '/privilege/',
    PRIVILEGE_BY_ID: (id: string) => `/privilege/${id}`,

    MENUS: '/menu/list-form/'
  },
  MASTER_DATA: {
    KPI_TYPE: '/kpi-type/',
    KPI_TYPE_BY_ID: (id: string) => `/kpi-type/${id}`,
    KPI_TYPE_OPTIONS: '/kpi-type/list-form',

    KPI_ASPECT: '/kpi-aspect/',
    KPI_ASPECT_BY_ID: (id: string) => `/kpi-aspect/${id}`,
    KPI_ASPECT_OPTIONS: '/kpi-aspect/list-form',

    KPI_CATEGORY: '/kpi-category/',
    KPI_CATEGORY_BY_ID: (id: string) => `/kpi-category/${id}`,
    KPI_CATEGORY_OPTIONS: '/kpi-category/list-form',

    KPI_ITEM: '/kpi-item/',
    KPI_ITEM_BY_ID: (id: string) => `/kpi-item/${id}`,
    KPI_ITEM_OPTIONS: '/kpi-item/list-form',

    PRIORITY: '/priority/',
    PRIORITY_BY_ID: (id: string) => `/priority/${id}`,

    GRADING_PERIOD: '/grading-period/',
    GRADING_PERIOD_BY_ID: (id: string) => `/grading-period/${id}`,
    GRADING_PERIOD_MONTH_YEAR: (id: string) => `/grading-period/month-year/${id}`,
    GRADING_PERIOD_OPTIONS: '/grading-period/list-form',

    GRADING_RANGE: '/grading-range/',
    GRADING_RANGE_BY_ID: (id: string) => `/grading-range/${id}`,

    OUTLET: '/outlet/',
    OUTLET_BY_ID: (id: string) => `/outlet/${id}`,
    OUTLET_OPTIONS: '/outlet/list-form/',

    DEPARTMENT: '/department/',
    DEPARTMENT_BY_ID: (id: string) => `/department/${id}`,
    DEPARTMENT_OPTIONS: '/department/list-form',

    DIVISION: '/division/',
    DIVISION_BY_ID: (id: string) => `/division/${id}`,
    DIVISION_OPTIONS: '/division/list-form'
  },
  KPI: {
    KPI_MASTER: '/kpi-master/',
    KPI_MASTER_UPLOAD_FILE: '/kpi-master/upload-excel/',
    KPI_MASTER_CHECK_FILE: '/kpi-master/check-excel/',
    KPI_MASTER_EXPORT: '/kpi-master/export-excel/',
    KPI_MASTER_DOWNLOAD: '/kpi-master/download-template',
    KPI_MASTER_EXPORT_BY_ID: (id: string) => `/kpi-master/export-excel/${id}`,
    KPI_MASTER_BY_KPI_NUMBER: (id: string) => `/kpi-master/by-kpi-number/${id}/`,
    KPI_MASTER_BY_ID: (id: string) => `/kpi-master/detail/by-id/${id}/`,
    KPI_MASTER_UPDATE_BY_ID: (id: string) => `/kpi-master/${id}`,
    KPI_MASTER_OPTIONS: '/kpi-master/list-form',

    GRADING_REGISTRATION: '/grading-registration/',
    GRADING_REGISTRATION_BY_ID: (id: string) => `/grading-registration/by-id/${id}/`,

    GRADING_SCORE: '/grading-score/',
    GRADING_SCORE_BY_ID: (kpiNum: string, periodId: string) => `/grading-score/by-kpi-number/${kpiNum}/${periodId}`,
    GRADING_SCORE_EXPORT: (kpiNum: string, periodId: string) => `/grading-score/export-excel/${kpiNum}/${periodId}`,
    GRADING_SCORE_IMPORT: '/grading-score/import-excel/'
  },
  ORG_STRUCTURE: '/warrior/struktur/1'
} as const;
