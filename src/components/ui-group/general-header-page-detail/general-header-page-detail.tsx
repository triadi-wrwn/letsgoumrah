import { NavLink } from 'react-router-dom';

import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui-base/button';

import { GeneralHeaderPageDetailProps } from './general-header-page-detail.type';

const GeneralHeaderPageDetail = (props: GeneralHeaderPageDetailProps) => {
  const { title, showActionButtons, actionButtons, backUrl = '../' } = props;

  return (
    <header className="flex justify-between items-center w-full">
      <div className="flex items-center">
        <NavLink to={backUrl}>
          <Button variant="link" size={'default'} className="pl-0">
            <ArrowLeftIcon className="w-6 h-6 mt-1" />
          </Button>
        </NavLink>
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
      {showActionButtons && <div>{actionButtons}</div>}
    </header>
  );
};

export default GeneralHeaderPageDetail;
