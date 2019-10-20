/**
 * Sort date keys in descending order by returning a list of objects with the
 * date key and corresponding epoch time.
 *
 * @param {Array} dateKeys - List of date strings with format "(D)D-(M)M-YYYY"
 *
 * @return {Array} List of objects { dateKey:String, epoch:Number }
 */
export function sortDateKeysDescending(dateKeys) {
  return dateKeys
    .map(dateKey => {
      const [day, month, year] = dateKey.split('-');
      const monthIndex = month - 1;

      return {
        dateKey,
        epoch: new Date(year, monthIndex, day).getTime()
      };
    })
    .sort((a, b) => b.epoch - a.epoch);
}
