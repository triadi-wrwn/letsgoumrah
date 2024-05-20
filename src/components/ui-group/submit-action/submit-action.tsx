import { Button } from '@/components/ui-base/button';
import { SubmitActionProps } from '@/components/ui-group/submit-action/submit-action.type';
import { NavLink } from 'react-router-dom';

const SubmitAction = (props: SubmitActionProps) => {
  const { submitText = 'Save', cancelText = 'Cancel' } = props;
  return (
    <div className="flex justify-end space-x-3 !mt-6">
      <NavLink to={'../'}>
        <Button variant={'secondary'} size={'default'}>
          {cancelText}
        </Button>
      </NavLink>
      <Button type="submit" className="px-6">
        {submitText}
      </Button>
    </div>
  );
};

export default SubmitAction;
