import reducer, { defaultInviteState } from './reducer';

describe('invites reducer', () => {
  it('fetches invites', () => {
    const state = defaultInviteState;

    const nowISO = new Date().toISOString();
    const invites = [
      {
        id: 'e3Dr4pQ1',
        createdBy: 'user|565657e8a76f47573eaf4',
        createdAt: nowISO,
        updatedAt: nowISO,
        email: 'test@upstand.fm',
        inviterFullName: 'Some user',
        status: 'accepted'
      }
    ];

    const action = {
      type: 'FETCHED_INVITES',
      data: invites
    };

    const newState = reducer(state, action);
    expect(newState).toEqual(invites);
  });

  it('creates invite', () => {
    const state = defaultInviteState;

    const nowISO = new Date().toISOString();
    const newInvite = {
      id: 'e3Dr4pQ1',
      createdBy: 'user|565657e8a76f47573eaf4',
      createdAt: nowISO,
      updatedAt: nowISO,
      email: 'test@upstand.fm',
      inviterFullName: 'Some user',
      status: 'accepted'
    };

    const action = {
      type: 'CREATED_INVITE',
      data: newInvite
    };

    const newState = reducer(state, action);
    expect(newState).toEqual([newInvite]);
  });

  it('returns default state', () => {
    const nowISO = new Date().toISOString();
    const state = [
      {
        id: 'e3Dr4pQ1',
        createdBy: 'user|565657e8a76f47573eaf4',
        createdAt: nowISO,
        updatedAt: nowISO,
        email: 'test@upstand.fm',
        inviterFullName: 'Some user',
        status: 'accepted'
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
