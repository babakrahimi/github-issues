export function formatDate(
  dateString: string,
  locale: string = "en-US",
  options: Intl.DateTimeFormatOptions = {}
): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };
  const mergedOptions = { ...defaultOptions, ...options };
  const date = new Date(dateString);
  return date.toLocaleString(locale, mergedOptions);
}
