import reducer from './reducer';

describe('updates reducer', () => {
  it('returns fetched updates', () => {
    const state = {};

    const dateKey = '18-10-2019';
    const updates = [
      { recordingId: '1', filename: 'yesterday' },
      { recordingId: '2', filename: 'today' }
    ];

    const action = {
      type: 'FETCHED_UPDATES_FOR_DATE',
      data: {
        dateKey,
        items: updates
      }
    };

    const newState = reducer(state, action);
    expect(newState[dateKey]).toEqual(updates);
  });

  it('returns default state', () => {
    const state = {
      '18-10-2019': [{ recordingId: '1', filename: 'today' }]
    };

    const action = {
      type: 'DOES_NOT_EXIST',
      data: {}
    };

    const newState = reducer(state, action);
    expect(newState).toEqual(state);
  });
});
