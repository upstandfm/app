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

const RecordingPrimaryAction = styled.div`
  width: 40px;
  height: 40px;
`;

const RecordingContent = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-gap: 1em;
  align-items: center;
`;

const RecordingTitle = styled.h4`
  margin: 0;
  text-transform: capitalize;
  font-weight: normal;
`;

const RecordingStatus = styled.div`
  justify-self: center;
`;

const StatusBadge = styled.span`
  padding: 0.25em 0.5em;
  background-color: ${props =>
    props.status === 'error'
      ? 'var(--color-lightest-red)'
      : 'var(--color-lightest-purple)'};
  color: ${props =>
    props.status === 'error'
      ? 'var(--color-dark-red)'
      : 'var(--color-dark-purple)'};
  border-radius: 4px;
`;

const RecordingMeta = styled.div`
  color: var(--color-grey);
`;

function UserRecordings({ recordings }) {
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
                      <ListItem key={recording.recordingId}>
                        <RecordingPrimaryAction />

                        <RecordingContent>
                          <RecordingTitle>{recording.filename}</RecordingTitle>

                          <RecordingStatus>
                            {recording.status !== 'completed' && (
                              <StatusBadge status={recording.status}>
                                {recording.status}
                              </StatusBadge>
                            )}
                          </RecordingStatus>

                          <RecordingMeta />
                        </RecordingContent>
                      </ListItem>
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
  recordings: PropTypes.array.isRequired
};

export default UserRecordings;

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
              <RecordingPrimaryAction />

              <div>
                <LoadingListItemText>Loading recording</LoadingListItemText>
              </div>
            </LoadingListItem>

            <LoadingListItem>
              <RecordingPrimaryAction />

              <div>
                <LoadingListItemText>Loading recording</LoadingListItemText>
              </div>
            </LoadingListItem>

            <LoadingListItem>
              <RecordingPrimaryAction />

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
              <RecordingPrimaryAction />

              <div>
                <LoadingListItemText>Loading recording</LoadingListItemText>
              </div>
            </LoadingListItem>

            <LoadingListItem>
              <RecordingPrimaryAction />

              <div>
                <LoadingListItemText>Loading recording</LoadingListItemText>
              </div>
            </LoadingListItem>

            <LoadingListItem>
              <RecordingPrimaryAction />

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
