import { PAGE_CHILD_URLS } from '@/lib/constants/page-urls';
import { capitalize } from '@/lib/utility';

const tabTitleConverter = (prefix: string, pathname: string, defaultTitle?: string) => {
  let newTitle = document.title;
  const titleArr = pathname.split('/').filter(el => el);
  const lastItemArr = titleArr[titleArr.length - 1];
  const thirdLastItemArr = titleArr[titleArr.length - 3];
  const isDetail = lastItemArr === 'detail';
  const isCreate = lastItemArr === 'create';
  const isId = !isNaN(+lastItemArr);
  const isLoginPage = lastItemArr?.toLowerCase() === 'login' || lastItemArr?.toLowerCase() === 'signin';
  if (isDetail || isCreate || isId) {
    newTitle = prefix + ' - ' + capitalize(thirdLastItemArr?.replaceAll('-', ' '));
  } else if (isLoginPage && defaultTitle) {
    newTitle = prefix + ' - ' + defaultTitle;
  } else {
    newTitle = prefix + ' - ' + capitalize(lastItemArr?.replaceAll('-', ' '));
  }
  return newTitle;
};

const pageTitleConverter = (moduleName: string, pathname: string) => {
  const titleArr = pathname.split('/').filter(el => el);
  const tempTitle = capitalize(moduleName.replaceAll('-', ' '));
  const moduleTitle = capitalize(tempTitle.replaceAll('Kpi', 'KPI'));
  const lastItemArr = titleArr[titleArr.length - 1];
  const secondLastItemArr = titleArr[titleArr.length - 2];
  const isCreate = lastItemArr === PAGE_CHILD_URLS.CREATE;
  const isDetail = secondLastItemArr === PAGE_CHILD_URLS.DETAIL;
  const isEdit = secondLastItemArr === PAGE_CHILD_URLS.UPDATE;
  let title = '';
  if (isCreate) {
    title = `Create New ${moduleTitle}`;
  } else if (isDetail) {
    title = `${moduleTitle} Details`;
  } else if (isEdit) {
    title = `Edit ${moduleTitle}`;
  }
  return title;
};

export { tabTitleConverter, pageTitleConverter };
