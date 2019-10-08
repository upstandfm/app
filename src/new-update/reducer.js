export const defaultUpdatesState = {
  yesterday: {
    id: 'yesterday',
    blob: null,
    isUploaded: false
  },
  today: {
    id: 'today',
    blob: null,
    isUploaded: false
  },
  blockers: {
    id: 'blockers',
    blob: null,
    isUploaded: false
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
      const { id } = action.data;
      const oldUpdateState = state[id];

      return {
        ...state,
        [id]: {
          ...oldUpdateState,
          ...action.data
        }
      };
    }

    case 'DELETE_UPDATE_RECORDING': {
      const { id } = action.data;
      const oldUpdateState = state[id];

      return {
        ...state,
        [action.data.id]: {
          ...oldUpdateState,
          ...action.data,
          blob: null
        }
      };
    }

    case 'UPLOADED_UPDATE_RECORDING': {
      const { id } = action.data;
      const oldUpdateState = state[id];

      return {
        ...state,
        [id]: {
          ...oldUpdateState,
          ...action.data
        }
      };
    }

    default: {
      return state;
    }
  }
}

export default updatesReducer;
