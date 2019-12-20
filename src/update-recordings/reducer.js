export const defaultDownloadProgressState = {};

/**
 * Download progress reducer.
 *
 * @param {Object} state - Update recordings file download progress
 * @param {Object} action - Reducer action with "type" and "data" props
 *
 * @returns {Object} Standups state
 */
function downloadProgressReducer(state, action) {
  switch (action.type) {
    case 'DOWNLOAD_FILE_PROGRESS': {
      return {
        ...state,
        [action.data.fileId]: action.data.progress
      };
    }

    default: {
      return state;
    }
  }
}

export default downloadProgressReducer;
