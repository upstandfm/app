export const defaultRecordingsState = {
  // 'x9f4hj5k68': {
  //    id: 'x9f4hj5k68',
  //    blob: new Blob(),
  //    name: '',
  //    isUploaded: false
  // }
};

/**
 * Recordings reducer that manages new standup update recordings state.
 *
 * @param {Object} state - Recordings
 * @param {Object} action - Reducer action with "type" and "data" props
 *
 * @returns {Object} Recordings state
 */
function recordingsReducer(state, action) {
  switch (action.type) {
    case 'NEW_UPDATE_RECORDING': {
      const { id, blob } = action.data;

      return {
        ...state,
        [id]: {
          id,
          blob,
          name: '',
          isUploaded: false
        }
      };
    }

    case 'UPDATE_RECORDING_NAME': {
      const { id, name } = action.data;

      return {
        ...state,
        [id]: {
          ...state[id],
          name
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

export default recordingsReducer;
