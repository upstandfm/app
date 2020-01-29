/**
 * Create a date key with format "YYYY-MM-DD".
 *
 * @param {Object} date
 *
 * @return {String}
 */
export function createDateKey(date) {
  // Will produce a date string with format "MM/DD/YYYY"
  const dateStr = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

  const [mm, dd, yyyy] = dateStr.split('/');
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Sort date keys in descending order by returning a list of objects with the
 * date key and corresponding epoch time.
 *
 * @param {Array} dateKeys - List of date strings with format "YYYY-MM-DD"
 *
 * @return {Array} List of objects { dateKey:String, epoch:Number }
 */
export function sortDateKeysDescending(dateKeys) {
  return dateKeys
    .map(dateKey => {
      const [year, month, day] = dateKey.split('-');
      const monthIndex = parseInt(month, 10) - 1;

      return {
        dateKey,
        epoch: new Date(year, monthIndex.toString(), day).getTime()
      };
    })
    .sort((a, b) => b.epoch - a.epoch);
}

/**
 * Format the epoch to a human readable date.
 *
 * @param {Number} epoch
 *
 * @return {String} Formatted date
 *
 * The Internationalization API is used to format the date.
 * For more info see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
 */
export function formatDate(epoch) {
  try {
    // Use browser default settings
    const locale = 'default';
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    const dtf = new Intl.DateTimeFormat(locale, options);
    return dtf.format(epoch);
  } catch (err) {
    console.log('Intl API Error: ', err);
    return new Date(epoch).toString();
  }
}

/**
 * Determines if epoch is "today".
 *
 * @param {Number} epoch
 *
 * @return {Bool} If epoch is today or not
 */
export function isDateToday(epoch) {
  const epochDate = new Date(epoch);
  const now = new Date();

  return (
    epochDate.getDate() === now.getDate() &&
    epochDate.getMonth() === now.getMonth() &&
    epochDate.getFullYear() === now.getFullYear()
  );
}
