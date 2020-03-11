/**
 * Channel reducer.
 *
 * @param {Object} state - Channel
 * @param {Object} action - Reducer action with "type" and "data" props
 *
 * @returns {Object} Channel state
 */
function channelReducer(state, action) {
  switch (action.type) {
    case 'FETCHED_CHANNEL': {
      return action.data;
    }

    default: {
      return state;
    }
  }
}

export default channelReducer;
