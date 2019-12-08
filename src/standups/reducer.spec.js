import reducer from './reducer';

describe('standups reducer', () => {
  it('returns fetched standups', () => {
    const state = [];

    const standups = [
      { standupId: '1', standupName: 'One' },
      { standupId: '2', standupName: 'Two' }
    ];

    const action = {
      type: 'FETCHED_STANDUPS',
      data: standups
    };

    const newState = reducer(state, action);
    expect(newState).toEqual(standups);
  });

  it('adds fetched standups', () => {
    const state = [{ standupId: '1', standupName: 'One' }];
    const standups = [{ standupId: '2', standupName: 'Two' }];

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
      standupId: '1',
      standupName: 'My standup'
    };

    const action = {
      type: 'CREATED_STANDUP',
      data: createdStandup
    };

    const newState = reducer(state, action);
    expect(newState).toContain(createdStandup);
  });

  it('returns default state', () => {
    const state = [{ standupId: '1', standupName: 'One' }];

    const action = {
      type: 'DOES_NOT_EXIST',
      data: {}
    };

    const newState = reducer(state, action);
    expect(newState).toEqual(state);
  });
});
