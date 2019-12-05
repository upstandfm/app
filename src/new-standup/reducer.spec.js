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
