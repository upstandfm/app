import React from 'react';

import standupMembersReducer, { defaultStandupMembersState } from './reducer';

const StateContext = React.createContext();
const DispatchContext = React.createContext();

export function StandupMembersProvider(props) {
  const [state, dispatch] = React.useReducer(
    standupMembersReducer,
    defaultStandupMembersState
  );

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {props.children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

function useStandupMembersState() {
  const ctx = React.useContext(StateContext);

  if (!ctx) {
    throw new Error(
      '"useStandupMembersState" hook must be used in "StandupMembersProvider"'
    );
  }

  return ctx;
}

function useStandupMembersDispatch() {
  const ctx = React.useContext(DispatchContext);

  if (!ctx) {
    throw new Error(
      '"useStandupMembersDispatch" hook must be used in "StandupMembersProvider"'
    );
  }

  return ctx;
}

export function useStandupMembers() {
  return [useStandupMembersState(), useStandupMembersDispatch()];
}
