import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Skeleton } from '../components/Loading';
import { LoadingAvatar } from '../components/Avatar';
import Button from '../components/Button';

import {
  RecordingList,
  LoadingRecordingListItem,
  Name,
  Meta
} from './RecordingList';

import Status from './Status';

const PlayPause = styled.div`
  width: 40px;
  height: 40px;
`;

export function LoadingRecordings() {
  return (
    <RecordingList>
      <LoadingRecordingListItem>
        <PlayPause />
        <Skeleton as={Name}>Loading recording name</Skeleton>
        <Skeleton as={Status}>Loading sts</Skeleton>
        <Skeleton as={Meta}>Loading created date</Skeleton>
        <LoadingAvatar />

        <div>
          <Button size="small" tertiary disabled title="Not implemented yet">
            <FontAwesomeIcon icon="trash" />
          </Button>
        </div>
      </LoadingRecordingListItem>

      <LoadingRecordingListItem>
        <PlayPause />
        <Skeleton as={Name}>Loading recording name</Skeleton>
        <Skeleton as={Status}>Loading sts</Skeleton>
        <Skeleton as={Meta}>Loading created date</Skeleton>
        <LoadingAvatar />

        <div>
          <Button size="small" tertiary disabled title="Not implemented yet">
            <FontAwesomeIcon icon="trash" />
          </Button>
        </div>
      </LoadingRecordingListItem>

      <LoadingRecordingListItem>
        <PlayPause />
        <Skeleton as={Name}>Loading recording name</Skeleton>
        <Skeleton as={Status}>Loading sts</Skeleton>
        <Skeleton as={Meta}>Loading created date</Skeleton>
        <LoadingAvatar />

        <div>
          <Button size="small" tertiary disabled title="Not implemented yet">
            <FontAwesomeIcon icon="trash" />
          </Button>
        </div>
      </LoadingRecordingListItem>
    </RecordingList>
  );
}
