import reducer from './reducer';

describe('channels reducer', () => {
  it('returns fetched channels', () => {
    const state = [];

    const channels = [
      { id: '1', name: 'One' },
      { id: '2', name: 'Two' }
    ];

    const action = {
      type: 'FETCHED_CHANNELS',
      data: channels
    };

    const newState = reducer(state, action);
    expect(newState).toEqual(channels);
  });

  it('adds fetched channels', () => {
    const state = [{ id: '1', name: 'One' }];
    const channels = [{ id: '2', name: 'Two' }];

    const action = {
      type: 'FETCHED_CHANNELS_NEXT_PAGE',
      data: channels
    };

    const newState = reducer(state, action);
    expect(newState).toContain(channels[0]);
  });

  it('adds a created channel', () => {
    const state = [];

    const createdChannel = {
      id: '1',
      name: 'My channel'
    };

    const action = {
      type: 'CREATED_CHANNEL',
      data: createdChannel
    };

    const newState = reducer(state, action);
    expect(newState).toContain(createdChannel);
  });

  it('returns default state', () => {
    const state = [{ id: '1', name: 'One' }];

    const action = {
      type: 'DOES_NOT_EXIST',
      data: {}
    };

    const newState = reducer(state, action);
    expect(newState).toEqual(state);
  });
});
