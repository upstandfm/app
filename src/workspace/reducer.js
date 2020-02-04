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
    case 'FETCHING_WORKSPACE': {
      return {
        ...state,
        isFetching: true,
        fetchErr: null
      };
    }

    case 'FETCHED_WORKSPACE': {
      return {
        ...state,
        isFetching: false,
        ...action.data
      };
    }

    case 'FETCH_WORKSPACE_ERROR': {
      return {
        ...state,
        isFetching: false,
        fetchErr: action.data
      };
    }

    default: {
      return state;
    }
  }
}

export const defaultWorkspaceState = {
  isFetching: true,
  fetchErr: null,
  id: undefined,
  createdBy: undefined,
  createdAt: undefined,
  updatedAt: undefined,
  name: undefined,
  slug: undefined
};
