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

export default membersReducer;
export const defaultMembersState = [];
