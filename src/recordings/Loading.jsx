import React from 'react';
import styled from 'styled-components';

import { Skeleton } from '../components/Loading';
import { LoadingAvatar } from '../components/Avatar';
import { List, LoadingListItem } from '../components/List';

import { Container, RecordingsList } from './Layout';

const PlayPause = styled.div`
  width: 40px;
  height: 40px;
`;

export function LoadingRecordingsByMember() {
  return (
    <Container>
      <List as="div">
        <div>
          <LoadingListItem as="div">
            <LoadingAvatar />

            <div>
              <Skeleton as="span">Loading user name</Skeleton>
            </div>
          </LoadingListItem>

          <RecordingsList>
            <LoadingListItem>
              <PlayPause />

              <div>
                <Skeleton as="span">Loading recording</Skeleton>
              </div>
            </LoadingListItem>

            <LoadingListItem>
              <PlayPause />

              <div>
                <Skeleton as="span">Loading recording</Skeleton>
              </div>
            </LoadingListItem>
          </RecordingsList>
        </div>

        <div>
          <LoadingListItem as="div">
            <LoadingAvatar />

            <div>
              <Skeleton as="span">Loading user name</Skeleton>
            </div>
          </LoadingListItem>

          <RecordingsList>
            <LoadingListItem>
              <PlayPause />

              <div>
                <Skeleton as="span">Loading recording</Skeleton>
              </div>
            </LoadingListItem>

            <LoadingListItem>
              <PlayPause />

              <div>
                <Skeleton as="span">Loading recording</Skeleton>
              </div>
            </LoadingListItem>
          </RecordingsList>
        </div>
      </List>
    </Container>
  );
}
