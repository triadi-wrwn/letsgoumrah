import useGetData from '@/lib/hooks/use-get-data';
import { OrgStructure, OrgStructuresApi } from '../types/org.types';
import { API_ENDPOINT } from '@/lib/constants/api-urls';
import orgNormalizer from '../normalizer/org-structure.normalizer';

const useOrganizationStructure = () => {
  const { ORG_STRUCTURE } = API_ENDPOINT;
  const { data, isFetching } = useGetData<OrgStructure, OrgStructuresApi[]>(['structures'], ORG_STRUCTURE, {
    normalizer: orgNormalizer
  });

  return {
    data,
    isFetching
  };
};

export default useOrganizationStructure;
