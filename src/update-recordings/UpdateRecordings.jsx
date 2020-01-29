import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { useAudioPlayer } from '../components/AudioPlayer';
import { useSnackbar } from '../components/Snackbar';
import Avatar from '../components/Avatar';
import { List, ListItem, ListEmpty } from '../components/List';

import useDownloadFile from './use-download-file';
import downloadProgressReducer, {
  defaultDownloadProgressState
} from './reducer';

import { Container, RecordingsList } from './Layout';
import Empty from './Empty';
import UpdateRecording from './UpdateRecording';

const EmptyRecordings = styled(ListEmpty)`
  text-align: left;
`;

const UserListItem = styled(ListItem)`
  :hover {
    background-color: inherit;
  }
`;

export function PureUpdateRecordings({
  members,
  recordings,
  audioPlayerState,
  downloadProgressState,
  downloadFile,
  playPauseAudio
}) {
  if (recordings.length === 0) {
    return <Empty title="No updates from your team." />;
  }

  const recordingsByUserId = recordings.reduce((mapping, recording) => {
    const userId = recording.createdBy;

    if (!mapping[userId]) {
      mapping[userId] = [];
    }

    mapping[userId].push(recording);
    return mapping;
  }, {});

  return (
    <Container>
      <List as="div">
        {members.map(member => {
          const { id, fullName } = member;
          const userRecordings = recordingsByUserId[id] || [];

          return (
            <div key={id}>
              <UserListItem as="div">
                <Avatar
                  title={fullName}
                  fullName={fullName}
                  avatarUrl={member.avatarUrl}
                  altText={`avatar of ${fullName}`}
                />

                {fullName}
              </UserListItem>

              <RecordingsList>
                {userRecordings.length === 0 ? (
                  <EmptyRecordings>No updates.</EmptyRecordings>
                ) : (
                  userRecordings.map(recording => {
                    const { id } = recording;
                    const hasFile = Boolean(audioPlayerState.files[id]);
                    const isSelected = id === audioPlayerState.playingFile.id;
                    const isPlaying = isSelected && audioPlayerState.isPlaying;
                    const progress = downloadProgressState[id];

                    return (
                      <UpdateRecording
                        key={id}
                        recording={recording}
                        isSelected={isSelected}
                        hasFile={hasFile}
                        downloadFile={downloadFile}
                        downloadProgress={progress}
                        playPauseAudio={playPauseAudio}
                        isPlaying={isPlaying}
                      />
                    );
                  })
                )}
              </RecordingsList>
            </div>
          );
        })}
      </List>
    </Container>
  );
}

PureUpdateRecordings.propTypes = {
  members: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.string.isRequired,
      userFullName: PropTypes.string,
      avatarUrl: PropTypes.string
    })
  ),
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

function UpdateRecordings({ members, recordings }) {
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
          ? `${downloadErr.message}: ${downloadErr.details}.`
          : downloadErr.message + '.'
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
    <PureUpdateRecordings
      members={members}
      recordings={recordings}
      audioPlayerState={audioPlayerState}
      downloadProgressState={downloadProgressState}
      downloadFile={downloadFile}
      playPauseAudio={playPauseAudio}
    />
  );
}

UpdateRecordings.propTypes = {
  members: PropTypes.array.isRequired,
  recordings: PropTypes.array.isRequired
};

export default UpdateRecordings;
