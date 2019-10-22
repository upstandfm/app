import reducer, { defaultAudioPlayerState } from './reducer';

describe('audio player reducer', () => {
  it('plays audio', () => {
    const state = defaultAudioPlayerState;
    const fileId = 1;
    const action = {
      type: 'PLAY_AUDIO',
      data: {
        fileId
      }
    };

    const newState = reducer(state, action);
    expect(newState).toEqual({ playingFileId: fileId, isPlaying: true });
  });

  it('pauses audio', () => {
    const fileId = 1;
    const state = {
      playingFileId: fileId,
      isPlaying: true
    };

    const action = {
      type: 'PAUSE_AUDIO',
      data: {
        fileId
      }
    };

    const newState = reducer(state, action);
    expect(newState).toEqual({ playingFileId: fileId, isPlaying: false });
  });

  it('returns default state', () => {
    const state = defaultAudioPlayerState;
    const action = {
      type: 'DOES_NOT_EXIST',
      data: 1
    };

    const newState = reducer(state, action);
    expect(newState).toEqual(state);
  });
});
