import { Locale, format } from 'date-fns';

export const isValidDate = (d: Date) => {
  return d instanceof Date && !isNaN(d.getTime());
};

export const valueToDate = (value: string): Date => {
  // if (value === '') return null;
  const newDate = new Date(value);
  // if (!isValidDate(newDate)) return null;
  return newDate;
};

export const dateFormat = (
  value: string,
  dateFormat: string,
  options?: {
    locale?: Locale;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    // firstWeekContainsDate?: number;
    useAdditionalWeekYearTokens?: boolean;
    useAdditionalDayOfYearTokens?: boolean;
  }
): string => {
  const newDate = new Date(value);
  if (!isValidDate(newDate)) return '';
  return format(newDate, dateFormat, options);
};
