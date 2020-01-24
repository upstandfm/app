/**
 * Create a date key with format "YYYY-MM-DD".
 *
 * @return {String}
 */
export function createDateKey() {
  const dateStr = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

  const [dd, mm, yyyy] = dateStr.split('/');
  return `${yyyy}-${mm}-${dd}`;
}
