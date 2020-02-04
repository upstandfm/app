import reducer, { defaultWorkspaceState } from './reducer';

describe('workspace reducer', () => {
  it('sets loading state', () => {
    const action = {
      type: 'FETCHING_WORKSPACE',
      data: {}
    };

    const newState = reducer(defaultWorkspaceState, action);
    expect(newState.isFetching).toEqual(true);
    expect(newState.fetchErr).toEqual(null);
  });

  it('returns fetched workspace + updates loading- and error state', () => {
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

    const newState = reducer(defaultWorkspaceState, action);
    expect(newState).toEqual({
      isFetching: false,
      fetchErr: null,
      ...workspace
    });
  });

  it('sets error state', () => {
    const action = {
      type: 'FETCH_WORKSPACE_ERROR',
      data: new Error('Boom!')
    };

    const newState = reducer(defaultWorkspaceState, action);
    expect(newState.isFetching).toEqual(false);
    expect(newState.fetchErr).toEqual(action.data);
  });

  it('returns default state', () => {
    const action = {
      type: 'DOES_NOT_EXIST',
      data: {}
    };

    const newState = reducer(defaultWorkspaceState, action);
    expect(newState).toEqual(defaultWorkspaceState);
    expect(newState.isFetching).toEqual(true);
  });
});
