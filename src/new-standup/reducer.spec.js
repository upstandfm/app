import reducer from './reducer';

describe('new standup reducer', () => {
  it('sets name', () => {
    const state = {
      name: ''
    };

    const name = 'daniel';
    const action = {
      type: 'SET_NAME',
      data: name
    };

    const newState = reducer(state, action);
    expect(newState.name).toEqual(name);
  });

  it('adds user', () => {
    const state = {
      users: []
    };

    const user = 'daniel@upstand.fm';
    const action = {
      type: 'ADD_USER',
      data: user
    };

    const newState = reducer(state, action);
    expect(newState.users).toContain(user);
  });

  it('removes user', () => {
    const user = 'daniel@upstand.fm';

    const state = {
      users: [user]
    };

    const action = {
      type: 'REMOVE_USER',
      data: user
    };

    const newState = reducer(state, action);
    expect(newState.users).not.toContain(user);
  });

  it('returns default state', () => {
    const state = {
      name: 'daniel'
    };

    const action = {
      type: 'DOES_NOT_EXIST',
      data: 1
    };

    const newState = reducer(state, action);
    expect(newState).toEqual(state);
  });
});
