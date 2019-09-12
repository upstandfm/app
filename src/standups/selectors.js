/**
 * Get a list of standups.
 *
 * @param {Object} state - Normalized state
 *
 * @return {Array} List of standups
 */
export function getStandupsList(state) {
  const ids = Object.keys(state);
  return ids.map(id => state[id]);
}
