export const defaultAudioPlayerState = {
  playingFile: {
    id: null,
    title: ''
  },
  isPlaying: false,
  files: {}
};

/**
 * Audio player reducer.
 *
 * @param {Object} state - Audio player
 * @param {Object} action - Reducer action with "type" and "data" props
 *
 * @returns {Object} Audio player state
 */
function audioPlayerReducer(state, action) {
  switch (action.type) {
    case 'LOAD_AUDIO_FILE': {
      return {
        ...state,
        files: {
          ...state.files,
          [action.data.id]: action.data.url
        }
      };
    }

    case 'UNLOAD_AUDIO_FILE': {
      const { id } = action.data;

      const newState = { ...state };

      delete newState.files[id];

      if (id === state.playingFile.id) {
        newState.isPlaying = false;
        newState.playingFile.id = null;
        newState.playingFile.title = '';
      }

      return newState;
    }

    case 'PLAY_AUDIO': {
      return {
        ...state,
        playingFile: {
          id: action.data.id,
          title: action.data.title
        },
        isPlaying: true
      };
    }

    case 'PAUSE_AUDIO': {
      return {
        ...state,
        isPlaying: false
      };
    }

    default: {
      return state;
    }
  }
}

export default audioPlayerReducer;
