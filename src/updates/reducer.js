/**
 * Updates reducer.
 *
 * @param {Object} state - Standup updates
 * @param {Object} action - Reducer action with "type" and "data" props
 *
 * @returns {Object} Standups state
 */
function updatesReducer(state, action) {
  switch (action.type) {
    case 'FETCHED_UPDATES_FOR_DATE': {
      return {
        ...state,
        [action.data.dateKey]: action.data.items
      };
    }

    default: {
      return state;
    }
  }
}

export default updatesReducer;
