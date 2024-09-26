export function formatDateToMonthDay(dateString: string): string {
    const date = new Date(dateString); 
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
  