import Spinner from '@/components/ui-base/Spinner';
import { Badge } from '@/components/ui-base/badge';

import { Card, CardContent } from '@/components/ui-base/card';
import { Label } from '@/components/ui-base/label';
import { GeneralPageDetailProps } from '@/components/ui-group/general-page-detail/general-page-detail.type';

import DefaultActionButtons from './general-action-button-detail';

import { cn } from '@/lib/utility';

import GeneralHeaderPageDetail from '../general-header-page-detail/general-header-page-detail';

const GeneralPageDetail = (props: GeneralPageDetailProps) => {
  const {
    isLoading = false,
    showActionButtons = true,
    title,
    data,
    children,
    className,
    showDeactivate,
    showEdit,
    actionButtons = (
      <DefaultActionButtons
        showDeactivate={showDeactivate}
        showEdit={showEdit}
        apiUrl={props.apiUrl}
        queryKeys={props.queryKeys}
        title={title}
      />
    )
  } = props;

  return (
    <div className="relative">
      <Spinner loading={isLoading} loadingText="Loading.." />
      <div
        className={cn(
          'flex justify-between items-center',
          data.length > 5 ? 'lg:max-w-screen-xl' : 'lg:max-w-3xl',
          className
        )}
      >
        <GeneralHeaderPageDetail
          title={title || ''}
          showActionButtons={showActionButtons}
          actionButtons={actionButtons}
          showDeactivate={showDeactivate}
          showEdit={showEdit}
        />
      </div>
      <div className={cn('mt-4', data.length > 5 ? 'lg:max-w-screen-xl' : 'lg:max-w-3xl', className)}>
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-5">
              {data.map((dataRow, index) => (
                <div key={index} className="w-full grid grid-flow-col auto-cols-fr gap-3">
                  {dataRow.map(item => (
                    <div key={item.label}>
                      <Label className="text-gray-500">{item.label}</Label>
                      {item.showAsBadge ? (
                        <div>
                          <Badge variant={item.variant}>{item.value}</Badge>
                        </div>
                      ) : (
                        <div>{item.value}</div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {children}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GeneralPageDetail;
