import React from 'react';

import channelReducer, { defaultChannelState } from './reducer';

const StateContext = React.createContext();
const DispatchContext = React.createContext();

export function ChannelsProvider(props) {
  const [state, dispatch] = React.useReducer(
    channelReducer,
    defaultChannelState
  );

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {props.children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

function useChannelState() {
  const ctx = React.useContext(StateContext);

  if (!ctx) {
    throw new Error(
      '"useChannelState" hook must be used in "ChannelsProvider"'
    );
  }

  return ctx;
}

function useChannelDispatch() {
  const ctx = React.useContext(DispatchContext);

  if (!ctx) {
    throw new Error(
      '"useChannelDispatch" hook must be used in "ChannelsProvider"'
    );
  }

  return ctx;
}

export function useChannels() {
  return [useChannelState(), useChannelDispatch()];
}
