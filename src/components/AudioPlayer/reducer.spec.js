import reducer, { defaultAudioPlayerState } from './reducer';

describe('audio player reducer', () => {
  it('loads and plays audio', () => {
    const state = defaultAudioPlayerState;
    const playingFile = {
      fileId: 1,
      fileKey: 'audio/file'
    };

    const action = {
      type: 'LOAD_AUDIO_FILE',
      data: {
        ...playingFile
      }
    };

    const newState = reducer(state, action);
    expect(newState.playingFile).toEqual(playingFile);
    expect(newState.isPlaying).toEqual(true);
  });

  it('plays and pauses audio', () => {
    const state = defaultAudioPlayerState;
    const action = {
      type: 'PLAY_PAUSE_AUDIO',
      data: {}
    };

    const newState = reducer(state, action);
    expect(newState.isPlaying).toEqual(true);
  });

  it('keeps track of download progress', () => {
    const state = defaultAudioPlayerState;
    const fileId = 1;
    const progress = 71;
    const action = {
      type: 'DOWNLOADING_AUDIO_FILE',
      data: {
        fileId,
        progress
      }
    };

    const newState = reducer(state, action);
    expect(newState.downloadProgress[fileId].isDownloading).toEqual(true);
    expect(newState.downloadProgress[fileId].progress).toEqual(progress);
  });

  it('downloads audio', () => {
    const state = defaultAudioPlayerState;
    const fileId = 1;
    const fileUrl =
      'blob:http://localhost:3000/14fdd0c2-04fb-d34f-9bb5-fa705661578c';
    const action = {
      type: 'DOWNLOADED_AUDIO_FILE',
      data: {
        fileId,
        fileUrl
      }
    };

    const newState = reducer(state, action);
    expect(newState.files[fileId]).toEqual(fileUrl);
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
