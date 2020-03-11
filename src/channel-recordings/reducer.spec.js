import reducer, { defaultRecordingState } from './reducer';

describe('recording reducer', () => {
  it('fetches members', () => {
    const state = defaultRecordingState;

    const id = '1';
    const members = [{ id }];

    const action = {
      type: 'FETCHED_MEMBERS',
      data: members
    };

    const newState = reducer(state, action);
    expect(newState.membersById[id]).toEqual(members[0]);
  });

  it('fetches recordings', () => {
    const state = defaultRecordingState;

    const recordings = [
      { id: '1', name: 'yesterday' },
      { id: '2', name: 'today' }
    ];

    const action = {
      type: 'FETCHED_RECORDINGS',
      data: recordings
    };

    const newState = reducer(state, action);
    expect(newState.recordings).toEqual(recordings);
  });

  it('fetches more recordings', () => {
    const state = {
      ...defaultRecordingState,
      recordings: [{ id: '1', name: 'yesterday' }]
    };

    const recordings = [{ id: '2', name: 'today' }];

    const action = {
      type: 'FETCHED_RECORDINGS_NEXT_PAGE',
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
