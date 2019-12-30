export const defaultRecordingsState = {
  // 'x9f4hj5k68': {
  //    id: 'x9f4hj5k68',
  //    blob: new Blob(),
  //    name: '',
  //    isValid: true
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
          isValid: true,
          isUploaded: false
        }
      };
    }

    case 'UPDATE_RECORDING_NAME': {
      const { id, name, isValid } = action.data;

      return {
        ...state,
        [id]: {
          ...state[id],
          name,
          isValid
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
