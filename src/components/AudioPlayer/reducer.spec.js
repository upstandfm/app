import reducer, { defaultAudioPlayerState } from './reducer';

describe('audio player reducer', () => {
  it('loads audio files', () => {
    const state = defaultAudioPlayerState;
    const loadedFile = {
      id: 1,
      url: 'blob:http://localhost:3000/111549dd-f6c2-8e3d-9b16-fb81214bd367'
    };

    const action = {
      type: 'LOAD_AUDIO_FILE',
      data: {
        ...loadedFile
      }
    };

    const newState = reducer(state, action);
    expect(newState.files[loadedFile.id]).toEqual(loadedFile.url);
  });

  it('unloads audio files', () => {
    const loadedFile = {
      id: 1,
      url: 'blob:http://localhost:3000/111549dd-f6c2-8e3d-9b16-fb81214bd367',
      title: 'My audio file'
    };

    const state = {
      playingFile: {
        id: loadedFile.id,
        title: loadedFile.title
      },
      isPlaying: true,
      files: {
        [loadedFile.id]: loadedFile.url
      }
    };

    const action = {
      type: 'UNLOAD_AUDIO_FILE',
      data: {
        id: loadedFile.id
      }
    };

    const newState = reducer(state, action);
    expect(newState).toEqual(defaultAudioPlayerState);
  });

  it('plays audio', () => {
    const state = defaultAudioPlayerState;
    const playingFile = {
      id: 1,
      title: 'My audio file'
    };

    const action = {
      type: 'PLAY_AUDIO',
      data: {
        ...playingFile
      }
    };

    const newState = reducer(state, action);
    expect(newState.playingFile).toEqual(playingFile);
    expect(newState.isPlaying).toEqual(true);
  });

  it('pauses audio', () => {
    const state = defaultAudioPlayerState;
    const action = {
      type: 'PAUSE_AUDIO',
      data: {}
    };

    const newState = reducer(state, action);
    expect(newState.isPlaying).toEqual(false);
  });

  it('resets audio player', () => {
    const id = 1;

    const state = {
      playingFile: {
        id,
        title: 'My audio file'
      },
      isPlaying: true,
      files: {
        [id]: 'blob:http://localhost:3000/111549dd-f6c2-8e3d-9b16-fb81214bd367'
      }
    };

    const action = {
      type: 'RESET_AUDIO_PLAYER',
      data: {}
    };

    const newState = reducer(state, action);
    expect(newState.playingFile.id).toEqual(null);
    expect(newState.playingFile.title).toEqual('');
    expect(newState.isPlaying).toEqual(false);
    expect(newState.files[id]).toBeUndefined();
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
