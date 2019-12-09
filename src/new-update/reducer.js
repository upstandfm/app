import shortid from 'shortid';

export const defaultUpdatesState = {
  // 'x9f4hj5k68': {
  //    id: 'x9f4hj5k68',
  //    blob: new Blob(),
  //    isUploaded: false
  // }
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
      const id = shortid.generate();

      return {
        ...state,
        [id]: {
          id,
          blob: action.data.blob,
          isUploaded: false
        }
      };
    }

    case 'DELETE_UPDATE_RECORDING': {
      const newState = { ...state };
      delete newState[action.data.id];
      return newState;
    }

    case 'UPLOADED_UPDATE_RECORDING': {
      const { id } = action.data;
      const oldUpdateState = state[id];

      return {
        ...state,
        [id]: {
          ...oldUpdateState,
          isUploaded: true
        }
      };
    }

    default: {
      return state;
    }
  }
}

export default updatesReducer;
