import React from 'react';

import { useUser } from '../auth0';

import workspaceReducer, { defaultWorkspaceState } from './reducer';
import useFetchWorkspace from './use-fetch-workspace';

const StateContext = React.createContext();
const DispatchContext = React.createContext();

export function WorkspaceProvider(props) {
  const { workspaceId } = useUser();

  const [state, dispatch] = React.useReducer(
    workspaceReducer,
    defaultWorkspaceState
  );

  const [fetchWorkspace, abortFetchWorkspace] = useFetchWorkspace(dispatch);

  React.useEffect(() => {
    if (!workspaceId) {
      return;
    }

    fetchWorkspace(workspaceId);

    return () => {
      abortFetchWorkspace();
    };
  }, [workspaceId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {props.children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

function useWorkspaceState() {
  const ctx = React.useContext(StateContext);

  if (!ctx) {
    throw new Error(
      '"useWorkspaceState" hook must be used in "WorkspaceProvider"'
    );
  }

  return ctx;
}

function useWorkspaceDispatch() {
  const ctx = React.useContext(DispatchContext);

  if (!ctx) {
    throw new Error(
      '"useWorkspaceDispatch" hook must be used in "WorkspaceProvider"'
    );
  }

  return ctx;
}

export function useWorkspace() {
  return [useWorkspaceState(), useWorkspaceDispatch()];
}
