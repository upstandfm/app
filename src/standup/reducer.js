/**
 * Standup reducer.
 *
 * @param {Object} state - Standup
 * @param {Object} action - Reducer action with "type" and "data" props
 *
 * @returns {Object} Standup state
 */
function standupReducer(state, action) {
  switch (action.type) {
    case 'FETCHED_STANDUP': {
      return action.data;
    }

    default: {
      return state;
    }
  }
}

export default standupReducer;
