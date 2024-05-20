import { useToast } from '@/lib/hooks/use-toast';
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from './toast';
import { Icons } from '@/lib/icons/icons';
import { cn } from '@/lib/utility';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function (props) {
        const { id, title, description, action, duration = 2000, showIcon = true, iconType, ...rest } = props;
        return (
          <Toast key={id} {...rest} duration={duration} className="ToastRoot">
            <div className="flex items-center gap-2 ">
              <div className={cn(showIcon ? 'block' : 'hidden')}>
                {iconType === 'error' ? (
                  <Icons.CrossCircleFill className="w-5 h-5 " />
                ) : (
                  <Icons.CheckCircleFill className="w-5 h-5 " />
                )}
              </div>
              <div>
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && <ToastDescription>{description}</ToastDescription>}
              </div>
            </div>
            {action}
            <ToastClose className="text-white hover:text-white" />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
