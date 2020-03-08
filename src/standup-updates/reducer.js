export const defaultUpdateState = {
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
    case 'FETCHED_UPDATES': {
      return action.data;
    }

    case 'FETCHED_UPDATES_NEXT_PAGE': {
      return [...state, ...action.data];
    }

    default: {
      return state;
    }
  }
}

/**
 * Updates root reducer.
 *
 * @param {Object} state - Updates root state
 * @param {Object} action - Reducer action with "type" and "data" props
 *
 * @returns {Object} Updates root state
 */
function updateReducer(state, action) {
  return {
    membersById: membersByIdReducer(state.membersById, action),
    recordings: recordingsReducer(state.recordings, action)
  };
}

export default updateReducer;
