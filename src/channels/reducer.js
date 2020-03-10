export const defaultChannelState = [];

/**
 * Channel reducer.
 *
 * @param {Object} state - Channels
 * @param {Object} action - Reducer action with "type" and "data" props
 *
 * @returns {Object} Channel state
 */
function channelReducer(state, action) {
  switch (action.type) {
    case 'FETCHED_CHANNELS': {
      return action.data;
    }

    case 'FETCHED_CHANNELS_NEXT_PAGE': {
      return [...state, ...action.data];
    }

    case 'CREATED_CHANNEL': {
      return [...state, action.data];
    }

    default: {
      return state;
    }
  }
}

export default channelReducer;
