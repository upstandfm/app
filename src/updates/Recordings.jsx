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

const PrimaryAction = styled.div`
  width: 48px;
  height: 48px;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-gap: 1em;
  align-items: center;
`;

const Title = styled.h4`
  margin: 0;
  text-transform: capitalize;
`;

const Status = styled.div`
  justify-self: center;
`;

const Badge = styled.span`
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

const Meta = styled.div`
  color: var(--color-grey);
`;

function Recordings({ dateKey, recordings }) {
  if (recordings.length === 0) {
    return (
      <div>
        <h2>{dateKey}</h2>
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
    <div key={dateKey}>
      <h2>{dateKey}</h2>

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
                      <PrimaryAction />

                      <Content>
                        <Title>{recording.filename}</Title>

                        <Status>
                          {recording.status !== 'completed' && (
                            <Badge status={recording.status}>
                              {recording.status}
                            </Badge>
                          )}
                        </Status>

                        <Meta />
                      </Content>
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
  dateKey: PropTypes.string.isRequired,
  recordings: PropTypes.array.isRequired
};

export default Recordings;
