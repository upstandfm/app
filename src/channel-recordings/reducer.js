export const defaultRecordingState = {
  membersById: {},
  recordings: []
};

/**
 * Members by ID reducer.
 *
 * @param {Object} state - Workspace members by ID
 * @param {Object} action - Reducer action with "type" and "data" props
 *
 * @returns {Object} Members state
 */
function membersByIdReducer(state, action) {
  switch (action.type) {
    case 'FETCHED_MEMBERS': {
      const membersById = action.data.reduce((mapping, member) => {
        mapping[member.id] = member;

        return mapping;
      }, {});

      return membersById;
    }

    default: {
      return state;
    }
  }
}

/**
 * Recordings reducer.
 *
 * @param {Array} state - Update recordings
 * @param {Object} action - Reducer action with "type" and "data" props
 *
 * @returns {Array} Updates recordings state
 */
function recordingsReducer(state, action) {
  switch (action.type) {
    case 'FETCHED_RECORDINGS': {
      return action.data;
    }

    case 'FETCHED_RECORDINGS_NEXT_PAGE': {
      return [...state, ...action.data];
    }

    default: {
      return state;
    }
  }
}

/**
 * Channel recordings root reducer.
 *
 * @param {Object} state - Channel recordings root state
 * @param {Object} action - Reducer action with "type" and "data" props
 *
 * @returns {Object} Channel recordings root state
 */
function recordingReducer(state, action) {
  return {
    membersById: membersByIdReducer(state.membersById, action),
    recordings: recordingsReducer(state.recordings, action)
  };
}

export default recordingReducer;
