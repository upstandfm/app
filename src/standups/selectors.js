/**
 * Get a list of standups.
 *
 * @param {Object} state - Normalized state
 *
 * @return {Array} List of standups
 */
export function getStandupsList(state) {
  const ids = Object.keys(state);
  const list = ids.map(id => state[id]);
  return list;
}
