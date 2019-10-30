import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Empty from '../components/Empty';
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

const AvatarContainer = styled.div`
  position: relative;
  display: grid;
  align-items: center;
  justify-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--color-lighter-grey);
  color: var(--color-dark-purple);
  font-weight: bold;
  border: 4px solid var(--color-white);
`;

const Avatar = styled.img`
  position: absolute;
  display: ${props => (Boolean(props.src) ? 'block' : 'none')};
  top: 0;
  left: 0;
  border: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
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
            <AvatarContainer />

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
            <AvatarContainer />

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

function UserRecordings({
  members,
  recordings,
  audioPlayerState,
  playPauseAudio
}) {
  if (recordings.length === 0) {
    return <Empty title="No updates." />;
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
                <AvatarContainer>
                  {'DI'}
                  <Avatar src={member.avatarUrl} alt="standup member avatar" />
                </AvatarContainer>

                {userFullName}
              </UserListItem>

              <RecordingsList>
                {userRecordings.length === 0 ? (
                  <ListEmpty>No update.</ListEmpty>
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
      fullName: PropTypes.string,
      avatarUrl: PropTypes.string
    })
  ),
  recordings: PropTypes.array.isRequired,
  audioPlayerState: PropTypes.object.isRequired,
  playPauseAudio: PropTypes.func.isRequired
};

export default UserRecordings;
