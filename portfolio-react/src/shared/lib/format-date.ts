type DateStyle = Intl.DateTimeFormatOptions['dateStyle'];

export function formatDate(date: string, dateStyle: DateStyle = 'medium', locales = 'en') {
  if (!date || date.trim() === '') {
    return 'Invalid Date';
  }

  const dateToFormat = new Date(date.replaceAll('-', '/'));
  
  // Check if date is valid
  if (isNaN(dateToFormat.getTime())) {
    return 'Invalid Date';
  }

  const dateFormatter = new Intl.DateTimeFormat(locales, { dateStyle });
  return dateFormatter.format(dateToFormat);
}
