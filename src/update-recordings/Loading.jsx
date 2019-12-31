import React from 'react';
import styled from 'styled-components';

import { LoadingAvatar } from '../components/Avatar';
import { List, LoadingListItem, LoadingListItemText } from '../components/List';

import { Container, RecordingsList } from './Layout';

const PlayPause = styled.div`
  width: 40px;
  height: 40px;
`;

export function LoadingUpdateRecordings() {
  return (
    <Container>
      <List as="div">
        <div>
          <LoadingListItem as="div">
            <LoadingAvatar />

            <div>
              <LoadingListItemText>Loading user name</LoadingListItemText>
            </div>
          </LoadingListItem>

          <RecordingsList>
            <LoadingListItem>
              <PlayPause />

              <div>
                <LoadingListItemText>Loading recording</LoadingListItemText>
              </div>
            </LoadingListItem>

            <LoadingListItem>
              <PlayPause />

              <div>
                <LoadingListItemText>Loading recording</LoadingListItemText>
              </div>
            </LoadingListItem>
          </RecordingsList>
        </div>

        <div>
          <LoadingListItem as="div">
            <LoadingAvatar />

            <div>
              <LoadingListItemText>Loading user name</LoadingListItemText>
            </div>
          </LoadingListItem>

          <RecordingsList>
            <LoadingListItem>
              <PlayPause />

              <div>
                <LoadingListItemText>Loading recording</LoadingListItemText>
              </div>
            </LoadingListItem>

            <LoadingListItem>
              <PlayPause />

              <div>
                <LoadingListItemText>Loading recording</LoadingListItemText>
              </div>
            </LoadingListItem>
          </RecordingsList>
        </div>
      </List>
    </Container>
  );
}
