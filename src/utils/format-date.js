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
export default function formatDate(epoch) {
  if (!epoch) {
    throw new Error('Provide epoch to format date');
  }

  try {
    // Use browser default settings
    const locale = 'default';
    const options = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };

    const dtf = new Intl.DateTimeFormat(locale, options);
    return dtf.format(epoch);
  } catch (err) {
    console.log('Intl API Error: ', err);
    return new Date(epoch).toString();
  }
}
