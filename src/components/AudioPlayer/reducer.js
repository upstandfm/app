export const defaultAudioPlayerState = {
  playingFile: {
    fileId: null,
    fileKey: null
  },
  isPlaying: false,

  // Maps a "fileId" to a progress Object with "isDownloading" and "progress"
  // props
  downloadProgress: {},

  // Maps a "fileId" to a file "ObjectURL"
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
    case 'PLAY_AUDIO': {
      return {
        ...state,
        playingFile: action.data.playingFile,
        isPlaying: true
      };
    }

    case 'PAUSE_AUDIO': {
      return {
        ...state,
        isPlaying: false
      };
    }

    case 'DOWNLOADING_AUDIO_FILE': {
      return {
        ...state,
        downloadProgress: {
          ...state.downloadProgress,
          [action.data.fileId]: {
            isDownloading: action.data.progress !== 100,
            progress: action.data.progress
          }
        }
      };
    }

    case 'DOWNLOADED_AUDIO_FILE': {
      return {
        ...state,
        files: {
          ...state.files,
          [action.data.fileId]: action.data.fileUrl
        }
      };
    }

    default: {
      return state;
    }
  }
}

export default audioPlayerReducer;
