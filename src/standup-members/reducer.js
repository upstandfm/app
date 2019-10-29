export const defaultStandupMembersState = [];

/**
 * Standup members reducer.
 *
 * @param {Array} state - Standup members
 * @param {Object} action - Reducer action with "type" and "data" props
 *
 * @returns {Array} Standup members state
 */
function standupMembersReducer(state, action) {
  switch (action.type) {
    case 'FETCHED_STANDUP_MEMBERS': {
      return action.data;
    }

    default: {
      return state;
    }
  }
}

export default standupMembersReducer;
