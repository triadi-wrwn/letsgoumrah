import * as React from 'react';
import type * as SelectPrimitive from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, Cross1Icon } from '@radix-ui/react-icons';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui-base/popover';
import { Button } from '@/components/ui-base/button';
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui-base/command';
import { cn } from '@/lib/utility/cn';
import { ComboboxProps } from './combobox.type';
import { useEffect } from 'react';
import { SelectOption } from '@/lib/types/select.type';
import useDebouncedValue from '@/lib/hooks/use-debounce-value';

const Combobox = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Trigger>, ComboboxProps>((props, ref) => {
  const {
    dataKey = '',
    placeholder = 'Select..',
    searchPlaceHolder = 'Search...',
    options = [],
    isMulti = false,
    closeOnSelect = true,
    showCheckbox = false,
    className,
    value,
    isDisable = false,
    asyncSearch,
    allowClear = true,
    onSearchChange,
    onChange
  } = props;

  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<string[]>([]);
  const [resultedSearchOption, setResultedSearchOption] = React.useState<SelectOption[]>(options);
  const [searchValue, setSearchValue] = React.useState('');
  const debouncedSearchValue = useDebouncedValue(searchValue, 500);

  const handleSelect = (currentValue: string) => {
    let newValue: string[] = [];
    setSelected(oldState => {
      let newState = oldState;
      const exist = oldState.find(el => el?.toLowerCase() === currentValue?.toLowerCase());
      if (exist) {
        newState = isMulti ? newState.filter(el => el !== currentValue) : [];
      } else {
        if (isMulti) {
          newState = newState.concat([currentValue]);
        } else {
          newState = [currentValue];
        }
      }
      newValue = newState;
      return newState;
    });
    onChange && onChange(isMulti ? newValue : newValue[0], dataKey);
    if (closeOnSelect) {
      setOpen(false);
    }
  };

  const handleClear = () => {
    setSelected([]);
    onChange && onChange(isMulti ? [] : undefined, dataKey);
  };

  const RenderValue = () => {
    if (isMulti) {
      return <span>{selected.length ? `${selected.length} selected` : placeholder}</span>;
    }
    return (
      <span>{selected.length ? resultedSearchOption.find(val => val.value === selected[0])?.label : placeholder}</span>
    );
  };

  const handleSearchOptions = (val: string) => {
    setSearchValue(val || '');
  };

  useEffect(() => {
    if (asyncSearch) {
      onSearchChange && onSearchChange(debouncedSearchValue);
    } else {
      if (!debouncedSearchValue) {
        setResultedSearchOption(options || []);
        return;
      }
      const filteredResult = options.filter(option =>
        option.label.toLowerCase().includes(debouncedSearchValue.toLowerCase())
      );
      setResultedSearchOption([...filteredResult]);
    }
  }, [debouncedSearchValue]);

  useEffect(() => {
    setResultedSearchOption(options);
  }, [options]);

  useEffect(() => {
    if (typeof value === 'string') {
      setSelected(value ? [value] : []);
    } else if (Array.isArray(value)) {
      setSelected(value || []);
    } else {
      setSelected([]);
    }
  }, [value]);

  useEffect(() => {
    setSearchValue('');
  }, [open]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild ref={ref}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={isDisable}
          className={cn(
            className,
            'w-full justify-between',
            !selected.length ? 'text-gray-500 font-normal' : '',
            props['aria-invalid'] && 'border-red-500 focus:border-red-500'
          )}
        >
          <RenderValue />
          {selected.length && allowClear ? (
            <Cross1Icon onClick={handleClear} className={cn('ml-2 h-4 w-4 shrink-0 opacity-50 ')} />
          ) : (
            <ChevronDownIcon
              className={cn('ml-2 h-4 w-4 shrink-0 opacity-50 transition-all', open ? 'rotate-180' : 'rotate-0')}
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] left-0 p-0">
        <Command shouldFilter={false}>
          <CommandInput placeholder={searchPlaceHolder} className="h-9" onValueChange={handleSearchOptions} />
          <CommandEmpty>No options</CommandEmpty>
          <CommandGroup className="overflow-y-auto max-h-80">
            {resultedSearchOption?.map(option => {
              const isSelected = selected.find(el => el.toLowerCase() === option.value.toLowerCase());
              return (
                <CommandItem
                  value={option.value}
                  key={option.value}
                  onSelect={e => {
                    handleSelect(e);
                  }}
                >
                  {showCheckbox && (
                    <div
                      className={cn(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                        isSelected ? 'bg-primary text-primary-foreground' : 'opacity-50 [&_svg]:invisible'
                      )}
                    >
                      <CheckIcon className={cn('h-4 w-4')} />
                    </div>
                  )}
                  {option.label}
                  <CheckIcon
                    className={cn('ml-auto h-4 w-4', isSelected === option.value ? 'opacity-100' : 'opacity-0')}
                  />
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
});

Combobox.displayName = 'Combobox';

export default Combobox;
