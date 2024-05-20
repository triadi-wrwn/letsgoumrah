import { PAGE_URLS } from '@/lib/constants/page-urls';
import { Menu } from '../sidebar/sidebar.type';
import { Icons } from '@/lib/icons/icons';

const {
  MASTER_DATA: {
    MASTER_DATA_INDEX,
    KPI_TYPES,
    KPI_ASPECT,
    KPI_CATEGORY,
    KPI_ITEM,
    PRIORITY,
    GRADING_PERIOD,
    GRADING_RANGE,
    OUTLET,
    DEPARTMENT,
    DIVISION
  },
  SETUP_CONFIG: { SETUP_CONFIG_INDEX, USERS, USERS_GROUP, USERS_GROUP_OUTLET, PRIVILEGE },
  KPI: { KPI_INDEX, KPI_MASTER, GRADING_SCORE, GRADING_REGISTRATION }
} = PAGE_URLS;

export const menus: Menu[] = [
  {
    label: 'Dashboard',
    pathname: '',
    icon: <Icons.Dashboard className="mr-2" />,
    childrens: []
  },
  {
    label: 'Setup & Config',
    pathname: SETUP_CONFIG_INDEX,
    icon: <Icons.SetupConfig className="mr-2" />,
    childrens: [
      {
        label: 'User Management',
        pathname: USERS,
        childrens: []
      },
      {
        label: 'Group Management',
        pathname: USERS_GROUP,
        childrens: []
      },
      {
        label: 'Outlet Management',
        pathname: USERS_GROUP_OUTLET,
        childrens: []
      },
      {
        label: 'Privilege Management',
        pathname: PRIVILEGE,
        childrens: []
      }
    ]
  },
  {
    label: 'Master Data',
    pathname: MASTER_DATA_INDEX,
    icon: <Icons.MasterData className="mr-2" />,
    childrens: [
      {
        label: 'KPI Type',
        pathname: KPI_TYPES,
        childrens: []
      },
      {
        label: 'KPI Aspect',
        pathname: KPI_ASPECT,
        childrens: []
      },
      {
        label: 'KPI Category',
        pathname: KPI_CATEGORY,
        childrens: []
      },
      {
        label: 'KPI Item',
        pathname: KPI_ITEM,
        childrens: []
      },
      {
        label: 'Priority',
        pathname: PRIORITY,
        childrens: []
      },
      {
        label: 'Grading Period',
        pathname: GRADING_PERIOD,
        childrens: []
      },
      {
        label: 'Grading Range',
        pathname: GRADING_RANGE,
        childrens: []
      },
      {
        label: 'Outlet',
        pathname: OUTLET,
        childrens: []
      },
      {
        label: 'Department',
        pathname: DEPARTMENT,
        childrens: []
      },
      {
        label: 'Division',
        pathname: DIVISION,
        childrens: []
      }
    ]
  },
  {
    label: 'KPI',
    pathname: KPI_INDEX,
    icon: <Icons.Kpi className="mr-2" />,
    childrens: [
      {
        label: 'KPI Master',
        pathname: KPI_MASTER,
        childrens: []
      },
      {
        label: 'Grading Registration',
        pathname: GRADING_REGISTRATION,
        childrens: []
      },
      {
        label: 'Grading Score',
        pathname: GRADING_SCORE,
        childrens: []
      }
    ]
  },
  {
    label: 'Logout',
    pathname: 'logout',
    icon: <Icons.Logout className="mr-2" />,
    childrens: []
  }
];
