import {Text} from 'react-native-paper';
import moment from 'moment';
import { useCallback } from 'react';

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

export const DateComparison = (date: string | Date) => {
  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0]; // Get YYYY-MM-DD

  let displayDate;

  if (date) {
    displayDate =
      formattedToday === date ? 'Verse of the day' : formatDate(new Date(date));
  }

  return displayDate;
};

interface TimeAgoProps {
  date: string; // ISO date string
}

export const TimeAgo: React.FC<TimeAgoProps> = ({date}) => {
  if (!date) return 'Invalid date';

  // Convert the date into a relative time format
  const now = moment();
  const target = moment(date);
  const diffInSeconds = now.diff(target, 'seconds');

  let formattedDate = '';
  if (diffInSeconds < 60) {
    // Less than a minute
    formattedDate = `${diffInSeconds}s ago`;
  } else if (diffInSeconds < 3600) {
    // Less than an hour
    const diffInMinutes = now.diff(target, 'minutes');
    formattedDate = `${diffInMinutes}m ago`;
  } else if (diffInSeconds < 86400) {
    // Less than a day
    const diffInHours = now.diff(target, 'hours');
    formattedDate = `${diffInHours}h ago`;
  } else if (diffInSeconds < 604800) {
    // Less than a week
    const diffInDays = now.diff(target, 'days');
    formattedDate = `${diffInDays}d ago`;
  } else {
    // More than a week
    const diffInWeeks = now.diff(target, 'weeks');
    formattedDate = `${diffInWeeks}w ago`;
  }

  return formattedDate;
};

export const timerFormatter = (time: Date | string) => {
  return moment
    .utc(time, 'HH:mm:ss') // Parse as UTC time
    .local() // Convert to local time
    .format('HH:mm'); // Format in local time
};
