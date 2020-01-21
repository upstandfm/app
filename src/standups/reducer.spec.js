import reducer from './reducer';

describe('standups reducer', () => {
  it('returns fetched standups', () => {
    const state = [];

    const standups = [
      { id: '1', name: 'One' },
      { id: '2', name: 'Two' }
    ];

    const action = {
      type: 'FETCHED_STANDUPS',
      data: standups
    };

    const newState = reducer(state, action);
    expect(newState).toEqual(standups);
  });

  it('adds fetched standups', () => {
    const state = [{ id: '1', name: 'One' }];
    const standups = [{ id: '2', name: 'Two' }];

    const action = {
      type: 'FETCHED_STANDUPS_NEXT_PAGE',
      data: standups
    };

    const newState = reducer(state, action);
    expect(newState).toContain(standups[0]);
  });

  it('adds a created standup', () => {
    const state = [];

    const createdStandup = {
      id: '1',
      name: 'My standup'
    };

    const action = {
      type: 'CREATED_STANDUP',
      data: createdStandup
    };

    const newState = reducer(state, action);
    expect(newState).toContain(createdStandup);
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
