/**
 * Standups reducer.
 *
 * @param {Object} state - Standups
 * @param {Object} action - Reducer action with "type" and "data" props
 *
 * @returns {Object} Standups state
 */
function standupsReducer(state, action) {
  switch (action.type) {
    case 'FETCHED_STANDUPS': {
      return action.data;
    }

    case 'FETCHED_STANDUPS_NEXT_PAGE': {
      return [...state, ...action.data];
    }

    default: {
      return state;
    }
  }
}

export default standupsReducer;
