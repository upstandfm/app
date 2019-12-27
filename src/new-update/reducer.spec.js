import reducer, { defaultRecordingsState } from './reducer';

describe('recordings reducer', () => {
  it('adds a new recording', () => {
    const state = defaultRecordingsState;

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
    expect(newState[id].name).toEqual('');
    expect(newState[id].isUploaded).toBe(false);
  });

  it('updates a recording name', () => {
    const state = defaultRecordingsState;

    const id = '123xyz';
    const name = 'My awesome recording';

    const action = {
      type: 'UPDATE_RECORDING_NAME',
      data: {
        id,
        name
      }
    };

    const newState = reducer(state, action);
    expect(newState[id].name).toEqual(name);
  });

  it('deletes a recording', () => {
    const id = '123xyz';
    const state = {
      [id]: {
        id,
        blob: {},
        name: '',
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

  it('updates recording upload state', () => {
    const state = defaultRecordingsState;
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
    const state = defaultRecordingsState;

    const action = {
      type: 'DOES_NOT_EXIST',
      data: {}
    };

    const newState = reducer(state, action);
    expect(newState).toEqual(state);
  });
});
