import { Button } from '@/components/ui-base/button';
import { Icons } from '@/lib/icons/icons';
import { cn } from '@/lib/utility/cn';
import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  showClearButton?: boolean;
  classNameWrapper?: string;
  onClear?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, classNameWrapper, type, prefixIcon, suffixIcon, showClearButton, onClear, onChange, value, ...props },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);
    const [currentVal, setCurrentVal] = React.useState(value);
    return (
      <div className={cn('relative w-full', classNameWrapper)}>
        {prefixIcon && (
          <div className="h-9 w-9 absolute">
            <div className="h-full flex items-center justify-center">{prefixIcon}</div>
          </div>
        )}
        <input
          type={type}
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            props['aria-invalid'] && 'border-red-500 focus:border-red-500',
            prefixIcon ? 'pl-9' : '',
            suffixIcon ? 'pr-9' : '',
            className
          )}
          value={value}
          onChange={val => {
            onChange && onChange(val);
            setCurrentVal(val.target.value);
          }}
          ref={inputRef}
          {...props}
        />
        <div className={cn('h-9 w-9 absolute right-0 top-0')}>
          <div className="h-full flex items-center justify-center">
            {showClearButton && !!currentVal && (
              <Button
                variant="link"
                className="p-0"
                onClick={() => {
                  setCurrentVal(undefined);
                  if (inputRef.current) {
                    inputRef.current.value = '';
                  }
                  onClear && onClear();
                }}
              >
                <Icons.CrossCircleFill className="w-4 h-4 " />
              </Button>
            )}
            {suffixIcon}
          </div>
        </div>
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
