import reducer, { defaultUpdateState } from './reducer';

describe('updates reducer', () => {
  it('fetches members', () => {
    const state = defaultUpdateState;

    const id = '1';
    const members = [{ id }];

    const action = {
      type: 'FETCHED_MEMBERS',
      data: members
    };

    const newState = reducer(state, action);
    expect(newState.membersById[id]).toEqual(members[0]);
  });

  it('fetches updates', () => {
    const state = defaultUpdateState;

    const recordings = [
      { id: '1', name: 'yesterday' },
      { id: '2', name: 'today' }
    ];

    const action = {
      type: 'FETCHED_UPDATES',
      data: recordings
    };

    const newState = reducer(state, action);
    expect(newState.recordings).toEqual(recordings);
  });

  it('fetches more updates', () => {
    const state = {
      ...defaultUpdateState,
      recordings: [{ id: '1', name: 'yesterday' }]
    };

    const recordings = [{ id: '2', name: 'today' }];

    const action = {
      type: 'FETCHED_UPDATES_NEXT_PAGE',
      data: recordings
    };

    const newState = reducer(state, action);
    expect(newState.recordings).toContain(recordings[0]);
  });

  it('returns default state', () => {
    const state = {
      membersById: {
        '1': { id: '1' }
      },
      recordings: [{ id: '1', name: 'today' }]
    };

    const action = {
      type: 'DOES_NOT_EXIST',
      data: {}
    };

    const newState = reducer(state, action);
    expect(newState).toEqual(state);
  });
});
