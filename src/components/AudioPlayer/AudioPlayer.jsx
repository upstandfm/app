import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useSnackbar } from '../Snackbar';
import Button from '../Button';

import { useAudioPlayer } from './AudioPlayerContext';
import useDownloadFile from './use-download-file';

import { Container, Controls, Main, Title, Meta } from './Layout';
import { ProgressBar, Timing, PlayTime, TotalTime } from './Progress';

export function PureAudioPlayer({ isPlaying, fileUrl }) {
  const audioPlayer = React.createRef();

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
  // return <audio ref={audioPlayer} controls src={fileUrl}></audio>;

  return (
    <Container>
      <Controls>
        <Button tertiary>
          {isPlaying ? (
            <FontAwesomeIcon icon="pause" size="2x" />
          ) : (
            <FontAwesomeIcon icon="play" size="2x" />
          )}
        </Button>
      </Controls>

      <Main>
        <Title>Audio file title</Title>

        <ProgressBar percent={40} handleSeek={() => console.log('seek')} />

        <Timing>
          <PlayTime>0:33</PlayTime>
          <TotalTime>3:00</TotalTime>
        </Timing>
      </Main>

      <Meta />
    </Container>
  );
}

PureAudioPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  fileUrl: PropTypes.string
};

function AudioPlayer() {
  const [audioPlayerState, audioPlayerDispatch] = useAudioPlayer();
  const [downloadFile, abortDownloadFile, err] = useDownloadFile(
    audioPlayerDispatch
  );
  const [, snackbarDispatch] = useSnackbar();

  const { playingFile, files } = audioPlayerState;
  const { fileId, fileKey } = playingFile;
  const hasFile = Boolean(files[fileId]);

  React.useEffect(() => {
    if (!fileId || !fileKey) {
      return;
    }

    if (hasFile) {
      return;
    }

    downloadFile(fileId, fileKey);

    return () => {
      abortDownloadFile();
    };
  }, [fileId, fileKey, hasFile]); // eslint-disable-line react-hooks/exhaustive-deps

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

  const { isPlaying } = audioPlayerState;
  const fileUrl = files[fileId];

  return <PureAudioPlayer isPlaying={isPlaying} fileUrl={fileUrl} />;
}

export default AudioPlayer;
