import reducer from './reducer';

describe('download progress reducer', () => {
  it('updates file download progress', () => {
    const state = {};

    const fileId = '1a2z3x';
    const progress = 33;

    const action = {
      type: 'DOWNLOAD_FILE_PROGRESS',
      data: {
        fileId,
        progress
      }
    };

    const newState = reducer(state, action);
    expect(newState[fileId]).toEqual(progress);
  });

  it('returns default state', () => {
    const state = {
      '1a2z3x': 100
    };

    const action = {
      type: 'DOES_NOT_EXIST',
      data: {}
    };

    const newState = reducer(state, action);
    expect(newState).toEqual(state);
  });
});
