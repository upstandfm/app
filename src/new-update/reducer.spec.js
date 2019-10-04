import reducer, { defaultUpdatesState } from './reducer';

describe('updates reducer', () => {
  it('adds a new recording', () => {
    const state = defaultUpdatesState;

    const newUpdate = {
      id: 'yesterday',
      blob: {}
    };

    const action = {
      type: 'NEW_UPDATE_RECORDING',
      data: newUpdate
    };

    const newState = reducer(state, action);
    expect(newState[newUpdate.id].blob).toEqual(newUpdate.blob);
  });

  it('deletes a recording', () => {
    const id = 'yesterday';
    const state = {
      [id]: {
        id,
        blob: {}
      }
    };

    const action = {
      type: 'DELETE_UPDATE_RECORDING',
      data: {
        id
      }
    };

    const newState = reducer(state, action);
    expect(newState[id].blob).toEqual(null);
  });

  it('returns default state', () => {
    const state = defaultUpdatesState;

    const action = {
      type: 'DOES_NOT_EXIST',
      data: {}
    };

    const newState = reducer(state, action);
    expect(newState).toEqual(state);
  });
});