import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui-base/popover';
import { Button } from '@/components/ui-base/button';
import { cn } from '@/lib/utility';
import { Calendar } from '@/components/ui-base/calendar';
import { CalendarIcon } from '@radix-ui/react-icons';
import { DatePickerProps } from '@/components/ui-group/date-pickers/date-picker.type';

export function DatePicker(props: DatePickerProps) {
  const { selected, placeholder = 'Select Date', onChange } = props;

  const handleChange = (e?: Date) => {
    if (e) {
      onChange && onChange(format(e, 'dd MMMM yyyy'));
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn('relative w-full justify-start text-left font-normal', !selected && 'text-muted-foreground')}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selected ? format(new Date(selected), 'dd MMMM yyyy') : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selected ? new Date(selected) : undefined}
          onSelect={handleChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
