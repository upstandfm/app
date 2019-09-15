/**
 * Standup reducer that manages standup state when creating a new standup.
 *
 * @param {Object} state - Standup
 * @param {Object} action - Reducer action with "type" and "data" props
 *
 * @returns {Object} Standup state
 */
function standupReducer(state, action) {
  switch (action.type) {
    case 'SET_NAME': {
      return {
        ...state,
        name: action.data
      };
    }

    case 'ADD_USER': {
      return {
        ...state,
        users: [...state.users, action.data]
      };
    }

    case 'REMOVE_USER': {
      return {
        ...state,
        users: state.users.filter(email => email !== action.data)
      };
    }

    default: {
      return state;
    }
  }
}

export default standupReducer;
