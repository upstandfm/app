import reducer, { defaultUpdatesState } from './reducer';

describe('updates reducer', () => {
  it('fetches members', () => {
    const state = defaultUpdatesState;

    const members = [{ id: '1' }];

    const action = {
      type: 'FETCHED_MEMBERS',
      data: members
    };

    const newState = reducer(state, action);
    expect(newState.members).toEqual(members);
  });

  it('fetches updates', () => {
    const state = defaultUpdatesState;

    const date = '2020-01-29';
    const updates = [
      { id: '1', name: 'yesterday' },
      { id: '2', name: 'today' }
    ];

    const action = {
      type: 'FETCHED_UPDATES',
      data: {
        date,
        items: updates
      }
    };

    const newState = reducer(state, action);
    expect(newState.updatesByDate[date]).toEqual(updates);
  });

  it('returns default state', () => {
    const state = {
      members: [{ id: '1' }],
      updatesByDate: {
        '2020-01-29': [{ id: '1', name: 'today' }]
      }
    };

    const action = {
      type: 'DOES_NOT_EXIST',
      data: {}
    };

    const newState = reducer(state, action);
    expect(newState).toEqual(state);
  });
});
