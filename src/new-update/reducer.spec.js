import reducer, { defaultUpdatesState } from './reducer';

describe('updates reducer', () => {
  it('adds a new recording', () => {
    const state = defaultUpdatesState;

    const action = {
      type: 'NEW_UPDATE_RECORDING',
      data: {
        blob: {}
      }
    };

    const newState = reducer(state, action);
    const id = Object.keys(newState)[0];
    expect(id).toBeDefined();
    expect(newState[id].blob).toEqual(action.data.blob);
    expect(newState[id].isUploaded).toBe(false);
  });

  it('deletes a recording', () => {
    const id = '123xyz';
    const state = {
      [id]: {
        id,
        blob: {},
        isUploaded: false
      }
    };

    const action = {
      type: 'DELETE_UPDATE_RECORDING',
      data: {
        id
      }
    };

    const newState = reducer(state, action);
    expect(newState[id]).not.toBeDefined();
  });

  it('updates upload state', () => {
    const state = defaultUpdatesState;
    const id = '123xyz';
    const action = {
      type: 'UPLOADED_UPDATE_RECORDING',
      data: {
        id
      }
    };

    const newState = reducer(state, action);
    expect(newState[id].isUploaded).toEqual(true);
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
