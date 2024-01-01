export const toDateTime = (secs: number) => {
  var t = new Date(1970, 0, 1); // Epoch
  t.setSeconds(secs);

  // Array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Formatting the date to "December 22, 2023"
  return `${monthNames[t.getMonth()]} ${t.getDate()}, ${t.getFullYear()}`;
};

export function formatDateString(dateString: string): string {
  const inputDate = new Date(dateString);
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Reset time to start of the day

  const isToday = inputDate.toDateString() === currentDate.toDateString();
  const isOverdue = inputDate < currentDate;

  if (isOverdue && !isToday) {
    const diffTime = Math.abs(currentDate.getTime() - inputDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `Overdue by ${diffDays} day(s)`;
  } else if (isToday) {
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
    };
    return inputDate.toLocaleTimeString("en-US", options);
  } else {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return inputDate.toLocaleDateString("en-US", options);
  }
}
