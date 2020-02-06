import reducer, { defaultMembersState } from './reducer';

describe('members reducer', () => {
  it('fetches members', () => {
    const state = defaultMembersState;

    const nowISO = new Date().toISOString();
    const members = [
      {
        id: 'qxO8Y67r',
        createdBy: 'user|56565768576947573eaf4',
        createdAt: nowISO,
        updatedAt: nowISO,
        fullName: 'Some User',
        email: 'some.user@domain.com'
      }
    ];

    const action = {
      type: 'FETCHED_MEMBERS',
      data: members
    };

    const newState = reducer(state, action);
    expect(newState).toEqual(members);
  });

  it('returns default state', () => {
    const nowISO = new Date().toISOString();
    const state = [
      {
        id: 'qxO8Y67r',
        createdBy: 'user|56565768576947573eaf4',
        createdAt: nowISO,
        updatedAt: nowISO,
        fullName: 'Some User',
        email: 'some.user@domain.com'
      }
    ];

    const action = {
      type: 'DOES_NOT_EXIST',
      data: {}
    };

    const newState = reducer(state, action);
    expect(newState).toEqual(state);
  });
});
