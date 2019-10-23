import React from 'react';

import { useSnackbar } from '../Snackbar';

import { useAudioPlayer } from './AudioPlayerContext';
import useDownloadFile from './use-download-file';

function AudioPlayer() {
  const [audioPlayerState, audioPlayerDispatch] = useAudioPlayer();
  const [downloadFile, abortDownloadFile, , err] = useDownloadFile(
    audioPlayerDispatch
  );
  const [, snackbarDispatch] = useSnackbar();

  const { playingFile, downloadedFiles } = audioPlayerState;
  const { fileId, fileKey } = playingFile;
  const hasDownloadedFile = Boolean(downloadedFiles[fileId]);

  React.useEffect(() => {
    if (!fileId || !fileKey) {
      return;
    }

    if (hasDownloadedFile) {
      return;
    }

    downloadFile(fileId, fileKey);

    return () => {
      abortDownloadFile();
    };
  }, [fileId, fileKey, hasDownloadedFile]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (!err) {
      return;
    }

    snackbarDispatch({
      type: 'ENQUEUE_SNACKBAR_MSG',
      data: {
        type: 'error',
        title: 'Failed to download audio',
        text: err.details
          ? `${err.message}: ${err.details}.`
          : err.message + '.'
      }
    });
  }, [err]); // eslint-disable-line react-hooks/exhaustive-deps

  const audioPlayer = React.createRef();
  const { isPlaying } = audioPlayerState;
  const fileUrl = downloadedFiles[fileId];

  React.useEffect(() => {
    if (!fileUrl) {
      return;
    }

    if (isPlaying) {
      audioPlayer.current.play();
    } else {
      audioPlayer.current.pause();
    }
  }, [isPlaying, fileUrl]); // eslint-disable-line react-hooks/exhaustive-deps

  // eslint-disable-next-line jsx-a11y/media-has-caption
  return <audio ref={audioPlayer} controls src={fileUrl}></audio>;
}

export default AudioPlayer;
