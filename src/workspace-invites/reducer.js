/**
 * Invite reducer.
 *
 * @param {Array} state - Workspace invites
 * @param {Object} action - Reducer action with "type" and "data" props
 *
 * @returns {Array} Invite state
 */
function inviteReducer(state, action) {
  switch (action.type) {
    case 'FETCHED_INVITES': {
      return action.data;
    }

    case 'CREATED_INVITE': {
      return [...state, action.data];
    }

    default: {
      return state;
    }
  }
}

export default inviteReducer;
export const defaultInviteState = [];
