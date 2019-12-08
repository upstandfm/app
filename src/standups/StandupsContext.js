import React from 'react';

import standupsReducer, { defaultStandupsState } from './reducer';

const StateContext = React.createContext();
const DispatchContext = React.createContext();

export function StandupsProvider(props) {
  const [state, dispatch] = React.useReducer(
    standupsReducer,
    defaultStandupsState
  );

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {props.children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

function useStandupsState() {
  const ctx = React.useContext(StateContext);

  if (!ctx) {
    throw new Error(
      '"useStandupsState" hook must be used in "StandupsProvider"'
    );
  }

  return ctx;
}

function useStandupsDispatch() {
  const ctx = React.useContext(DispatchContext);

  if (!ctx) {
    throw new Error(
      '"useStandupsDispatch" hook must be used in "StandupsProvider"'
    );
  }

  return ctx;
}

export function useStandups() {
  return [useStandupsState(), useStandupsDispatch()];
}
