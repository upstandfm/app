/**
 * Create a date key with format "YYYY-MM-DD".
 *
 * @param {Object} date
 *
 * @return {String}
 */
export default function createDateKey(date) {
  const isDate = date instanceof Date;
  if (!isDate) {
    throw new Error('Provided "date" is not a valid Date Object');
  }

  // Produces a date string with format "MM/DD/YYYY"
  const dateStr = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

  const [mm, dd, yyyy] = dateStr.split('/');
  return `${yyyy}-${mm}-${dd}`;
}
