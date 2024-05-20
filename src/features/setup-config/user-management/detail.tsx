import GeneralPageDetail from '@/components/ui-group/general-page-detail/general-page-detail';

import { API_ENDPOINT } from '@/lib/constants/api-urls';
import { PAGE_URLS } from '@/lib/constants/page-urls';

import { UserDetailField } from './data/normalizer';
import useFormUser from './hooks/form.hook';

const DetailUser = () => {
  const { title, isFetching, detail } = useFormUser();

  return (
    <GeneralPageDetail
      title={title}
      isLoading={isFetching}
      data={UserDetailField(detail)}
      showActionButtons
      apiUrl={API_ENDPOINT.SETUP_CONFIG.USERS}
      queryKeys={PAGE_URLS.SETUP_CONFIG.USERS}
    />
  );
};

export default DetailUser;
