/**
 * Workspace reducer.
 *
 * @param {Object} state - Workspace
 * @param {Object} action - Reducer action with "type" and "data" props
 *
 * @returns {Object} Workspace state
 */
export default function workspaceReducer(state, action) {
  switch (action.type) {
    case 'FETCHED_WORKSPACE': {
      return action.data;
    }

    default: {
      return state;
    }
  }
}

export const defaultWorkspaceState = {
  id: undefined,
  createdBy: undefined,
  createdAt: undefined,
  updatedAt: undefined,
  name: undefined,
  slug: undefined
};
