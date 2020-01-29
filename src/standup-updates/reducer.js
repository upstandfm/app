export const defaultUpdatesState = {
  members: [],
  updatesByDate: {}
};

/**
 * Members reducer.
 *
 * @param {Array} state - Workspace members
 * @param {Object} action - Reducer action with "type" and "data" props
 *
 * @returns {Array} Members state
 */
function membersReducer(state, action) {
  switch (action.type) {
    case 'FETCHED_MEMBERS': {
      return action.data;
    }

    default: {
      return state;
    }
  }
}

/**
 * Updates by date reducer.
 *
 * @param {Object} state - Updates by date
 * @param {Object} action - Reducer action with "type" and "data" props
 *
 * @returns {Object} Updates by date state
 */
function updatesByDateReducer(state, action) {
  switch (action.type) {
    case 'FETCHED_UPDATES': {
      return {
        ...state,
        [action.data.date]: action.data.items
      };
    }

    default: {
      return state;
    }
  }
}

/**
 * Updates root reducer.
 *
 * @param {Object} state - Updates root state
 * @param {Object} action - Reducer action with "type" and "data" props
 *
 * @returns {Object} Updates root state
 */
function updatesReducer(state, action) {
  return {
    members: membersReducer(state.members, action),
    updatesByDate: updatesByDateReducer(state.updatesByDate, action)
  };
}

export default updatesReducer;
