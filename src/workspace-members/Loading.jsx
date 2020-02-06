import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Content, { Title, Subtitle, Section } from '../components/Content';
import { LoadingAvatar } from '../components/Avatar';
import { Skeleton } from '../components/Loading';
import Button from '../components/Button';

import {
  UserList,
  LoadingUserListItem,
  UserInfo,
  FullName,
  Email
} from './UserList';

function Loading() {
  return (
    <Content>
      <Title>Workspace members</Title>
      <Subtitle>View and manage all users in your workspace.</Subtitle>

      <Section>
        <UserList>
          <LoadingUserListItem>
            <LoadingAvatar size="40px" />

            <UserInfo>
              <Skeleton as={FullName}>Loading user name</Skeleton>
              <Skeleton as={Email}>Loading email</Skeleton>
            </UserInfo>

            <div>
              <Button size="small" tertiary disabled>
                <FontAwesomeIcon icon="ellipsis-h" />
              </Button>
            </div>
          </LoadingUserListItem>

          <LoadingUserListItem>
            <LoadingAvatar size="40px" />

            <UserInfo>
              <Skeleton as={FullName}>Loading user name</Skeleton>
              <Skeleton as={Email}>Loading email</Skeleton>
            </UserInfo>

            <div>
              <Button size="small" tertiary disabled>
                <FontAwesomeIcon icon="ellipsis-h" />
              </Button>
            </div>
          </LoadingUserListItem>

          <LoadingUserListItem>
            <LoadingAvatar size="40px" />

            <UserInfo>
              <Skeleton as={FullName}>Loading user name</Skeleton>
              <Skeleton as={Email}>Loading email</Skeleton>
            </UserInfo>

            <div>
              <Button size="small" tertiary disabled>
                <FontAwesomeIcon icon="ellipsis-h" />
              </Button>
            </div>
          </LoadingUserListItem>
        </UserList>
      </Section>
    </Content>
  );
}

export default Loading;
