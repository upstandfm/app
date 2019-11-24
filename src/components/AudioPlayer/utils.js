/***
 * Formats a number in seconds to a human readable string.
 *
 * @param {Number} - Number in seconds to format
 *
 * @return {String} Formatted string: "MM:SS"
 */
export function formatTime(sec = 0) {
  if (!sec) {
    return '00:00';
  }

  return new Date(sec * 1e3).toISOString().substr(14, 5);
}
