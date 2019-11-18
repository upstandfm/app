import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Empty from '../components/Empty';
import Avatar, { LoadingAvatar } from '../components/Avatar';
import {
  ListContainer,
  List,
  ListItem,
  ListEmpty,
  LoadingListContainer,
  LoadingListItem,
  LoadingListItemText
} from '../components/List';

import UserRecording, { RecordingPlayState } from './UserRecording';

const UserListItem = styled(ListItem)`
  font-weight: bold;

  :hover {
    background-color: inherit;
  }
`;

const RecordingsList = styled(List)`
  margin-left: 36px;
  margin-bottom: 2em;
  padding: 0;
  border-left: 1px solid var(--color-light-grey);

  :last-child {
    margin-bottom: 0;
  }
`;

const CustomLoadingAvatar = styled(LoadingAvatar)`
  border-color: var(--color-white);
`;

export function LoadingUserRecordings() {
  return (
    <LoadingListContainer>
      <List as="div">
        <div>
          <LoadingListItem as="div">
            <CustomLoadingAvatar />

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
            <CustomLoadingAvatar />

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
    </LoadingListContainer>
  );
}

function UserRecordings({
  members,
  recordings,
  audioPlayerState,
  playPauseAudio
}) {
  if (recordings.length === 0) {
    return <Empty title="No updates" />;
  }

  const recordingsByUserId = recordings.reduce((mapping, recording) => {
    if (!mapping[recording.userId]) {
      mapping[recording.userId] = [];
    }

    mapping[recording.userId].push(recording);
    return mapping;
  }, {});

  return (
    <ListContainer>
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
                  <ListEmpty>No update</ListEmpty>
                ) : (
                  userRecordings.map(recording => {
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
  members: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.string.isRequired,
      userFullName: PropTypes.string,
      avatarUrl: PropTypes.string
    })
  ),
  recordings: PropTypes.array.isRequired,
  audioPlayerState: PropTypes.object.isRequired,
  playPauseAudio: PropTypes.func.isRequired
};

export default UserRecordings;
