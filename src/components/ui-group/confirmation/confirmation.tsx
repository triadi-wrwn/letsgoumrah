import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui-base/alert-dialog';
import { buttonVariants } from '@/components/ui-base/button';
import { ACTION } from '@/lib/constants/common';
import { useConfirmation } from '@/lib/hooks/use-confirmation';
import { cn } from '@/lib/utility';

const defaultTitle = 'Confirmation';
const defaultDesc = 'Are you sure you want to save this data?';
const defaultCancelText = 'Cancel';
const defaultConfirmedText = 'Yes, Submit';

const Confirmation = () => {
  const { confirmations } = useConfirmation();

  const getText = (type?: string) => {
    switch (type) {
      case ACTION.SUBMIT:
        return {
          title: 'Submit Confirmation',
          desc: 'Are you sure you want to save this data?',
          confirmText: defaultConfirmedText
        };
      case ACTION.DELETE:
        return {
          title: 'Delete Confirmation',
          desc: 'Are you sure you want to delete the item?',
          confirmText: 'Yes, Delete'
        };
      case ACTION.DEACTIVATE:
        return {
          title: 'Deactivate Confirmation',
          desc: 'Are you sure you want to deactivate the item?',
          confirmText: 'Yes, Deactivate'
        };
      case ACTION.ACTIVATE:
        return {
          title: 'Activate Confirmation',
          desc: 'Are you sure you want to activate the item?',
          confirmText: 'Yes, Activate'
        };
      default:
        return { title: defaultTitle, desc: defaultDesc, confirmText: defaultConfirmedText };
    }
  };

  return (
    <>
      {confirmations.map(
        ({
          id,
          title,
          description,
          cancelText = defaultCancelText,
          confirmedText,
          type = 'custom',
          onConfirm,
          ...props
        }) => {
          const text = getText(type);
          return (
            <AlertDialog key={id} {...props}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{type && !title ? text.title : title}</AlertDialogTitle>
                  <AlertDialogDescription>{type && !description ? text.desc : description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{cancelText}</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={onConfirm}
                    className={cn(
                      buttonVariants({
                        variant: type === 'delete' || type === 'deactivate' ? 'destructive' : 'default'
                      })
                    )}
                  >
                    {type && !confirmedText ? text.confirmText : confirmedText}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          );
        }
      )}
    </>
  );
};

export default Confirmation;
