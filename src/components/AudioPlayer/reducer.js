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

    case 'PLAY_AUDIO': {
      return {
        ...state,
        playingFile: action.data,
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
