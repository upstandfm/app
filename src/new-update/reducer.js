export const defaultUpdatesState = {
  yesterday: {
    id: 'yesterday',
    blob: null
  },
  today: {
    id: 'today',
    blob: null
  },
  blockers: {
    id: 'blockers',
    blob: null
  }
};

/**
 * Updates reducer that manages standup updates state.
 *
 * @param {Object} state - Updates
 * @param {Object} action - Reducer action with "type" and "data" props
 *
 * @returns {Object} Updates state
 */
function updatesReducer(state, action) {
  switch (action.type) {
    case 'NEW_UPDATE_RECORDING': {
      return {
        ...state,
        [action.data.id]: action.data
      };
    }

    case 'DELETE_UPDATE_RECORDING': {
      return {
        ...state,
        [action.data.id]: {
          ...action.data,
          blob: null
        }
      };
    }

    default: {
      return state;
    }
  }
}

export default updatesReducer;
