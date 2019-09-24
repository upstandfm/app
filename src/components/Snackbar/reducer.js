import shortid from 'shortid';

/**
 * Snackbar reducer.
 *
 * @param {Object} state - Notifications
 * @param {Object} action - Reducer action with "type" and "data" props
 *
 * @returns {Object} Snackbar state
 */
function standupsReducer(state, action) {
  switch (action.type) {
    case 'ENQUEUE_SNACKBAR_MSG': {
      const msg = {
        id: shortid.generate(),
        text: action.data
      };
      return [...state, msg];
    }

    case 'DEQUEUE_SNACKBAR_MSG': {
      return state.filter(msg => msg.id !== action.data);
    }

    default: {
      return state;
    }
  }
}

export default standupsReducer;
