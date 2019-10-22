export const defaultAudioPlayerState = {
  playingFileId: null,
  isPlaying: false
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
    case 'PLAY_AUDIO': {
      return {
        ...state,
        playingFileId: action.data.fileId,
        isPlaying: true
      };
    }

    case 'PAUSE_AUDIO': {
      return {
        ...state,
        playingFileId: action.data.fileId,
        isPlaying: false
      };
    }

    default: {
      return state;
    }
  }
}

export default audioPlayerReducer;
