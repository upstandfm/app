import reducer, { defaultStandupMembersState } from './reducer';

describe('standup members reducer', () => {
  it('fetches standup members', () => {
    const state = defaultStandupMembersState;

    const members = [
      {
        userId: '1'
      }
    ];

    const action = {
      type: 'FETCHED_STANDUP_MEMBERS',
      data: members
    };

    const newState = reducer(state, action);
    expect(newState).toEqual(members);
  });

  it('returns default state', () => {
    const state = defaultStandupMembersState;
    const action = {
      type: 'DOES_NOT_EXIST',
      data: 1
    };

    const newState = reducer(state, action);
    expect(newState).toEqual(state);
  });
});
