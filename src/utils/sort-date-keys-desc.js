/**
 * Sort date keys in descending order by returning a list of objects with the
 * date key and corresponding epoch time.
 *
 * @param {Array} dateKeys - List of date strings with format "YYYY-MM-DD"
 *
 * @return {Array} List of objects { dateKey:String, epoch:Number }
 */
export default function sortDateKeysDesc(dateKeys) {
  const isList = Array.isArray(dateKeys);
  if (!isList) {
    throw new Error('Provide a list of dates with format "YYYY-MM-DD"');
  }

  const hasValidFormat = dateKeys.every(key => /^\d{4}-\d{2}-\d{2}$/.test(key));
  if (!hasValidFormat) {
    throw new Error('Invalid date in list, valid format is "YYYY-MM-DD"');
  }

  return dateKeys
    .map(dateKey => {
      return {
        dateKey,
        epoch: new Date(dateKey).getTime()
      };
    })
    .sort((a, b) => b.epoch - a.epoch);
}
