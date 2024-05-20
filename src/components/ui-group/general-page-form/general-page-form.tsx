import Spinner from '@/components/ui-base/Spinner';
import { Button } from '@/components/ui-base/button';
import { Card, CardContent } from '@/components/ui-base/card';
import { GeneralPageFormProps } from '@/components/ui-group/general-page-form/general-page-form.type';
import { cn } from '@/lib/utility';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { NavLink } from 'react-router-dom';

const GeneralPageForm = (props: GeneralPageFormProps) => {
  const {
    title,
    showActionButton = false,
    actionButtons,
    isLoading = false,
    children,
    className,
    backUrl = '../'
  } = props;

  return (
    <div className="relative">
      <Spinner loading={isLoading} loadingText="Loading.." />
      <div className="flex justify-start items-center">
        <div className="flex items-center">
          <NavLink to={backUrl}>
            <Button variant="link" size={'default'} className="pl-0">
              <ArrowLeftIcon className="w-6 h-6 mt-1" />
            </Button>
          </NavLink>
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
        {showActionButton && <div>{actionButtons}</div>}
      </div>
      <div className={cn('lg:max-w-screen-xl mt-4', className)}>
        <Card>
          <CardContent className="pt-6">{children}</CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GeneralPageForm;
