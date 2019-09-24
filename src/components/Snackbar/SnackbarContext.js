import React from 'react';

import snackbarReducer from './reducer';

const StateContext = React.createContext();
const DispatchContext = React.createContext();

export function SnackbarProvider(props) {
  const [state, dispatch] = React.useReducer(snackbarReducer, []);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {props.children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

function useSnackbarState() {
  const ctx = React.useContext(StateContext);

  if (!ctx) {
    throw new Error(
      '"useSnackbarState" hook must be used in "SnackbarProvider"'
    );
  }

  return ctx;
}

function useSnackbarDispatch() {
  const ctx = React.useContext(DispatchContext);

  if (!ctx) {
    throw new Error(
      '"useSnackbarDispatch" hook must be used in "SnackbarProvider"'
    );
  }
  return ctx;
}

export function useSnackbar() {
  return [useSnackbarState(), useSnackbarDispatch()];
}
