import GeneralPage from '@/components/ui-group/general-page-list/general-page-list';

import { API_ENDPOINT } from '@/lib/constants/api-urls';
import { tabsData } from '@/lib/constants/default';
import { PAGE_URLS } from '@/lib/constants/page-urls';

import { columns } from './data/columns';
import { UserNormalizer } from './data/normalizer';
import useListUserManagement from './hooks/list.hook';

const UserManagement = () => {
  const { onSelectAction, isDeleting, isUpdating } = useListUserManagement();

  return (
    <GeneralPage
      title="User Management"
      apiUrl={API_ENDPOINT.SETUP_CONFIG.USERS}
      queryKeys={[PAGE_URLS.SETUP_CONFIG.USERS]}
      showFilterTab
      tabs={tabsData}
      showFilterSearch
      columns={columns({ onSelectAction })}
      loading={isDeleting || isUpdating}
      frontPagination={false}
      normalizer={UserNormalizer}
      // initialData={dataDummy}
      // actionButtons={
      //   <NavLink to={'./create'}>
      //     <Button variant={'default'} size={'default'}>
      //       Create New
      //     </Button>
      //   </NavLink>
      // }
    />
  );
};

export default UserManagement;
