import reducer from './reducer';

describe('standup reducer', () => {
  it('returns fetched standup', () => {
    const state = {};

    const standup = {
      standupId: '1',
      standupName: 'One'
    };

    const action = {
      type: 'FETCHED_STANDUP',
      data: standup
    };

    const newState = reducer(state, action);
    expect(newState).toEqual(standup);
  });

  it('returns default state', () => {
    const state = { standupId: '1', standupName: 'One' };

    const action = {
      type: 'DOES_NOT_EXIST',
      data: {}
    };

    const newState = reducer(state, action);
    expect(newState).toEqual(state);
  });
});
