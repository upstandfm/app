import React from 'react';

import audioPlayerReducer, { defaultAudioPlayerState } from './reducer';

const StateContext = React.createContext();
const DispatchContext = React.createContext();

export function AudioPlayerProvider(props) {
  const [state, dispatch] = React.useReducer(
    audioPlayerReducer,
    defaultAudioPlayerState
  );

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {props.children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

function useAudioPlayerState() {
  const ctx = React.useContext(StateContext);

  if (!ctx) {
    throw new Error(
      '"useAudioPlayerState" hook must be used in "AudioPlayerProvider"'
    );
  }

  return ctx;
}

function useAudioPlayerDispatch() {
  const ctx = React.useContext(DispatchContext);

  if (!ctx) {
    throw new Error(
      '"useAudioPlayerDispatch" hook must be used in "AudioPlayerProvider"'
    );
  }

  return ctx;
}

export function useAudioPlayer() {
  return [useAudioPlayerState(), useAudioPlayerDispatch()];
}
