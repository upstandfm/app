import reducer from './reducer';

describe('standup reducer', () => {
  it('returns fetched standup', () => {
    const state = {};

    const standup = {
      id: '1',
      name: 'One'
    };

    const action = {
      type: 'FETCHED_STANDUP',
      data: standup
    };

    const newState = reducer(state, action);
    expect(newState).toEqual(standup);
  });

  it('returns default state', () => {
    const state = { id: '1', name: 'One' };

    const action = {
      type: 'DOES_NOT_EXIST',
      data: {}
    };

    const newState = reducer(state, action);
    expect(newState).toEqual(state);
  });
});
