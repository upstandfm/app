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

const UserListItem = styled(ListItem)`
  font-weight: bold;

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
    if (!mapping[recording.userId]) {
      mapping[recording.userId] = [];
    }

    mapping[recording.userId].push(recording);
    return mapping;
  }, {});

  return (
    <Container>
      <List as="div">
        {members.map(member => {
          const { userId, userFullName } = member;
          const userRecordings = recordingsByUserId[userId] || [];

          return (
            <div key={userId}>
              <UserListItem as="div">
                <Avatar
                  title={userFullName}
                  fullName={userFullName}
                  avatarUrl={member.avatarUrl}
                  altText={`avatar of ${userFullName}`}
                />

                {userFullName}
              </UserListItem>

              <RecordingsList>
                {userRecordings.length === 0 ? (
                  <ListEmpty>No updates.</ListEmpty>
                ) : (
                  userRecordings.map(recording => {
                    const { recordingId } = recording;
                    const hasFile = Boolean(
                      audioPlayerState.files[recordingId]
                    );
                    const isSelected =
                      recordingId === audioPlayerState.playingFile.id;
                    const isPlaying = isSelected && audioPlayerState.isPlaying;
                    const progress = downloadProgressState[recordingId];

                    return (
                      <UpdateRecording
                        key={recordingId}
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
        fileId: recording.recordingId,
        progress
      }
    });
  };

  const onDownloadedFile = (recording, fileUrl) => {
    audioPlayerDispatch({
      type: 'LOAD_AUDIO_FILE',
      data: {
        id: recording.recordingId,
        url: fileUrl
      }
    });

    audioPlayerDispatch({
      type: 'PLAY_AUDIO',
      data: {
        id: recording.recordingId,
        title: recording.filename
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
        id: recording.recordingId,
        title: recording.filename
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
