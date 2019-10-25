import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  ListContainer,
  List,
  ListItem,
  ListEmpty,
  LoadingListItem,
  LoadingListItemText
} from '../components/List';

import UserRecording, { RecordingPlayState } from './UserRecording';

const UserListItem = styled(ListItem)`
  :hover {
    background-color: inherit;
  }
`;

const UserAvatar = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--color-lighter-grey);
  color: var(--color-dark-purple);
  font-weight: bold;
`;

const RecordingsList = styled(List)`
  margin-left: 33px;
  margin-bottom: 2em;
  padding: 0;
  border-left: 1px solid var(--color-lighter-grey);

  :last-child {
    margin-bottom: 0;
  }
`;

export function LoadingUserRecordings() {
  return (
    <ListContainer>
      <List as="div">
        <div>
          <LoadingListItem as="div">
            <UserAvatar />

            <div>
              <LoadingListItemText>Loading user name</LoadingListItemText>
            </div>
          </LoadingListItem>

          <RecordingsList>
            <LoadingListItem>
              <RecordingPlayState />

              <div>
                <LoadingListItemText>Loading recording</LoadingListItemText>
              </div>
            </LoadingListItem>

            <LoadingListItem>
              <RecordingPlayState />

              <div>
                <LoadingListItemText>Loading recording</LoadingListItemText>
              </div>
            </LoadingListItem>

            <LoadingListItem>
              <RecordingPlayState />

              <div>
                <LoadingListItemText>Loading recording</LoadingListItemText>
              </div>
            </LoadingListItem>
          </RecordingsList>
        </div>

        <div>
          <LoadingListItem as="div">
            <UserAvatar />

            <div>
              <LoadingListItemText>Loading user name</LoadingListItemText>
            </div>
          </LoadingListItem>

          <RecordingsList>
            <LoadingListItem>
              <RecordingPlayState />

              <div>
                <LoadingListItemText>Loading recording</LoadingListItemText>
              </div>
            </LoadingListItem>

            <LoadingListItem>
              <RecordingPlayState />

              <div>
                <LoadingListItemText>Loading recording</LoadingListItemText>
              </div>
            </LoadingListItem>

            <LoadingListItem>
              <RecordingPlayState />

              <div>
                <LoadingListItemText>Loading recording</LoadingListItemText>
              </div>
            </LoadingListItem>
          </RecordingsList>
        </div>
      </List>
    </ListContainer>
  );
}

function UserRecordings({ recordings, audioPlayerState, playPauseAudio }) {
  const recordingsByUserId = recordings.reduce((mapping, recording) => {
    if (!mapping[recording.userId]) {
      mapping[recording.userId] = [];
    }

    mapping[recording.userId].push(recording);
    return mapping;
  }, {});

  // TODO: fetch user data from API (standup members)
  const userIds = Object.keys(recordingsByUserId);

  return (
    <ListContainer>
      <List as="div">
        {userIds.map(userId => {
          const recordings = recordingsByUserId[userId];

          return (
            <div key={userId}>
              <UserListItem as="div">
                <UserAvatar>DI</UserAvatar>
                {userId}
              </UserListItem>

              <RecordingsList>
                {recordings.length === 0 ? (
                  <ListEmpty>No update.</ListEmpty>
                ) : (
                  recordings.map(recording => {
                    return (
                      <UserRecording
                        key={recording.recordingId}
                        recording={recording}
                        audioPlayerState={audioPlayerState}
                        playPauseAudio={playPauseAudio}
                      />
                    );
                  })
                )}
              </RecordingsList>
            </div>
          );
        })}
      </List>
    </ListContainer>
  );
}

UserRecordings.propTypes = {
  recordings: PropTypes.array.isRequired,
  audioPlayerState: PropTypes.object.isRequired,
  playPauseAudio: PropTypes.func.isRequired
};

export default UserRecordings;
