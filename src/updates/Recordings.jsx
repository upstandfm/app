import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  ListContainer,
  ListTitle,
  List,
  ListItem,
  ListEmpty
} from '../components/List';

import { formatDate, isDateToday } from './utils';

const Title = styled.h2`
  margin: 0 0 1em 0;
  font-weight: normal;
  color: ${props => (props.isToday ? 'var(--color-purple)' : 'inherit')};
`;

const RecordingPrimaryAction = styled.div`
  width: 48px;
  height: 48px;
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

function Recordings({ epoch, recordings }) {
  const formattedDate = formatDate(epoch);
  const isToday = isDateToday(epoch);

  if (recordings.length === 0) {
    return (
      <div>
        <Title isToday={isToday}>{formattedDate}</Title>
        <p>No updates.</p>
      </div>
    );
  }

  const recordingsByUserId = recordings.reduce((mapping, recording) => {
    if (!mapping[recording.userId]) {
      mapping[recording.userId] = [];
    }

    mapping[recording.userId].push(recording);
    return mapping;
  }, {});

  return (
    <div>
      <Title isToday={isToday}>{formattedDate}</Title>

      {Object.keys(recordingsByUserId).map(userId => {
        const recordings = recordingsByUserId[userId];

        return (
          <ListContainer key={userId}>
            <ListTitle>{userId}</ListTitle>

            <List>
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
            </List>
          </ListContainer>
        );
      })}
    </div>
  );
}

Recordings.propTypes = {
  epoch: PropTypes.number.isRequired,
  recordings: PropTypes.array.isRequired
};

export default Recordings;
