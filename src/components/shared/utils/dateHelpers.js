// src/utils/dateHelpers.js

import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth,
         startOfQuarter, endOfQuarter, startOfYear, endOfYear, subMonths } from 'date-fns';

export const getDateRangeDates = (rangeKey) => {
  const now = new Date();
  let startDate = now;
  let endDate = now;

  switch (rangeKey) {
    case 'today':
      startDate = now;
      endDate = now;
      break;
    case 'this_week':
      startDate = startOfWeek(now, { weekStartsOn: 1 }); // Monday start
      endDate = endOfWeek(now, { weekStartsOn: 1 });
      break;
    case 'this_month':
      startDate = startOfMonth(now);
      endDate = endOfMonth(now);
      break;
    case 'this_quarter':
      startDate = startOfQuarter(now);
      endDate = endOfQuarter(now);
      break;
    case 'this_year':
      startDate = startOfYear(now);
      endDate = endOfYear(now);
      break;
    case 'last_month':
      startDate = startOfMonth(subMonths(now, 1));
      endDate = endOfMonth(subMonths(now, 1));
      break;
    case 'all_time':
      startDate = new Date(2000, 0, 1); // Arbitrary old date
      endDate = new Date(3000, 0, 1); // Arbitrary future date
      break;
    default:
      startDate = new Date(2000, 0, 1); // Default to all time or specific period
      endDate = new Date(3000, 0, 1);
  }

  // Set time to start/end of day for accurate filtering
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);

  return { startDate, endDate };
};

export const isDateInRange = (date, startDate, endDate) => {
  const checkDate = new Date(date);
  return checkDate >= startDate && checkDate <= endDate;
};

export const getPeriodLabel = (date, rangeKey) => {
  switch (rangeKey) {
    case 'this_month':
    case 'last_month':
      return format(date, 'MMM yy');
    case 'this_quarter':
      const quarter = Math.floor((date.getMonth() / 3));
      return `Q${quarter + 1} ${format(date, 'yy')}`;
    case 'this_year':
      return format(date, 'yyyy');
    default:
      return format(date, 'MMM yy'); // Default to month
  }
};