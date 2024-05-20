import { Input } from '@/components/ui-base/input';
import { DataTable } from '@/components/ui-group/datatable/datatable';
import useGeneralPageList from '@/components/ui-group/general-page-list/general-page-list.hook';
import { GeneralPageProps } from '@/components/ui-group/general-page-list/general-page-list.type';
import Tabs from '@/components/ui-group/tabs/tabs';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useAuthContext } from '@/lib/contexts/auth-context';

const GeneralPageList = <T extends object, TApi>(props: GeneralPageProps<T, TApi>) => {
  const { currentUser } = useAuthContext();

  const {
    title,
    actionButtons,
    showFilterTab,
    tabs = [],
    showFilterSearch,
    apiUrl,
    queryKeys,
    columns,
    frontPagination = false,
    loading = false,
    normalizer,
    onSelectAction,
    initialData = []
  } = props;

  const {
    onFilterTabChange,
    onFilterChange,
    onSortChange,
    onPaginationChange,
    dataTableWithNumber,
    data,
    isFetching,
    params
  } = useGeneralPageList<T, TApi>({ apiUrl, queryKeys, normalizer });

  const menu = currentUser?.privilege?.menus.find(menu => title.endsWith(menu.menu_name));

  const allowCreate = menu?.allow_create || false;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{title}</h3>
        {allowCreate && actionButtons}
      </div>
      <div className="mt-4 border border-border border-b-0 rounded-lg">
        <div className="ml-2">{showFilterTab && <Tabs data={tabs} onChange={onFilterTabChange} />}</div>
        <div className="pl-2 pr-2">
          {showFilterSearch && (
            <Input
              placeholder="Search"
              prefixIcon={<MagnifyingGlassIcon />}
              className="flex mb-4 min-w-min "
              classNameWrapper="max-w-[500px]"
              showClearButton={true}
              onKeyDown={e => e.key === 'Enter' && onFilterChange((e.target as HTMLInputElement).value, 'search')}
              onClear={() => onFilterChange(undefined, 'search')}
            />
          )}
        </div>

        <DataTable
          data={dataTableWithNumber?.length ? dataTableWithNumber : initialData}
          columns={columns}
          totalPage={Math.ceil((data?.count || 0) / params.page_size)}
          pageIndex={params.page}
          pageSize={params.page_size}
          isLoading={isFetching || loading}
          onSortChange={onSortChange}
          onPaginationChange={onPaginationChange}
          frontPagination={frontPagination}
          onSelectAction={onSelectAction}
          showActionColumn={false}
          totalData={data?.count}
        />
      </div>
    </div>
  );
};

export default GeneralPageList;
