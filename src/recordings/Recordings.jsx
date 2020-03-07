import React from 'react';
import PropTypes from 'prop-types';

import { useAudioPlayer } from '../components/AudioPlayer';
import { useSnackbar } from '../components/Snackbar';

import useDownloadFile from './use-download-file';
import downloadProgressReducer, {
  defaultDownloadProgressState
} from './reducer';

import Empty from './Empty';
import { RecordingList } from './RecordingList';
import Recording from './Recording';

export function PureRecordings({
  membersById,
  recordings,
  audioPlayerState,
  downloadProgressState,
  downloadFile,
  playPauseAudio
}) {
  if (recordings.length === 0) {
    return <Empty title="No updates from your team." />;
  }

  return (
    <RecordingList>
      {recordings.map(recording => {
        const { id } = recording;
        const member = membersById[recording.createdBy] || {};
        const hasFile = Boolean(audioPlayerState.files[id]);
        const isSelected = id === audioPlayerState.playingFile.id;
        const isPlaying = isSelected && audioPlayerState.isPlaying;
        const progress = downloadProgressState[id];

        return (
          <Recording
            key={id}
            recording={recording}
            member={member}
            isSelected={isSelected}
            hasFile={hasFile}
            downloadFile={downloadFile}
            downloadProgress={progress}
            playPauseAudio={playPauseAudio}
            isPlaying={isPlaying}
          />
        );
      })}
    </RecordingList>
  );
}

PureRecordings.propTypes = {
  membersById: PropTypes.object.isRequired,
  recordings: PropTypes.array.isRequired,
  audioPlayerState: PropTypes.shape({
    playingFile: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string
    }),
    isPlaying: PropTypes.bool.isRequired,
    files: PropTypes.object.isRequired
  }),
  downloadProgressState: PropTypes.object.isRequired,
  downloadFile: PropTypes.func.isRequired,
  playPauseAudio: PropTypes.func.isRequired
};

function Recordings({ membersById, recordings }) {
  const [audioPlayerState, audioPlayerDispatch] = useAudioPlayer();

  const [downloadProgressState, downloadProgressDispatch] = React.useReducer(
    downloadProgressReducer,
    defaultDownloadProgressState
  );

  const onDownloadFileProgress = (recording, progress) => {
    downloadProgressDispatch({
      type: 'DOWNLOAD_FILE_PROGRESS',
      data: {
        fileId: recording.id,
        progress
      }
    });
  };

  const onDownloadedFile = (recording, fileUrl) => {
    audioPlayerDispatch({
      type: 'LOAD_AUDIO_FILE',
      data: {
        id: recording.id,
        url: fileUrl
      }
    });

    audioPlayerDispatch({
      type: 'PLAY_AUDIO',
      data: {
        id: recording.id,
        title: recording.name
      }
    });
  };

  const [downloadFile, abortDownloadFile, downloadErr] = useDownloadFile(
    onDownloadFileProgress,
    onDownloadedFile
  );

  React.useEffect(() => {
    return () => {
      abortDownloadFile();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [, snackbarDispatch] = useSnackbar();

  React.useEffect(() => {
    if (!downloadErr) {
      return;
    }

    snackbarDispatch({
      type: 'ENQUEUE_SNACKBAR_MSG',
      data: {
        type: 'error',
        title: 'Failed to download audio',
        text: downloadErr.details
          ? `${downloadErr.message}: ${downloadErr.details}`
          : downloadErr.message
      }
    });
  }, [downloadErr]); // eslint-disable-line react-hooks/exhaustive-deps

  const playPauseAudio = (recording, isPlaying) => {
    audioPlayerDispatch({
      type: isPlaying ? 'PAUSE_AUDIO' : 'PLAY_AUDIO',
      data: {
        id: recording.id,
        title: recording.name
      }
    });
  };

  return (
    <PureRecordings
      membersById={membersById}
      recordings={recordings}
      audioPlayerState={audioPlayerState}
      downloadProgressState={downloadProgressState}
      downloadFile={downloadFile}
      playPauseAudio={playPauseAudio}
    />
  );
}

Recordings.propTypes = {
  membersById: PropTypes.object.isRequired,
  recordings: PropTypes.array.isRequired
};

export default Recordings;
