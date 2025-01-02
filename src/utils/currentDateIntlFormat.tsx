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
