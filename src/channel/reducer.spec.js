import reducer from './reducer';

describe('channel reducer', () => {
  it('returns fetched channel', () => {
    const state = {};

    const channel = {
      id: '1',
      name: 'One'
    };

    const action = {
      type: 'FETCHED_CHANNEL',
      data: channel
    };

    const newState = reducer(state, action);
    expect(newState).toEqual(channel);
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
