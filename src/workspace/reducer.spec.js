import reducer from './reducer';

describe('workspace reducer', () => {
  it('returns fetched workspace', () => {
    const state = {};

    const now = new Date().toISOString();
    const workspace = {
      id: 'xs0Yt56',
      createdBy: 'user|564738575e89e38f47',
      createdAt: now,
      updatedAt: now,
      name: 'My workspace',
      slug: 'my-workspace'
    };

    const action = {
      type: 'FETCHED_WORKSPACE',
      data: workspace
    };

    const newState = reducer(state, action);
    expect(newState).toEqual(workspace);
  });

  it('returns default state', () => {
    const state = { id: '1', name: 'Workspace' };

    const action = {
      type: 'DOES_NOT_EXIST',
      data: {}
    };

    const newState = reducer(state, action);
    expect(newState).toEqual(state);
  });
});
