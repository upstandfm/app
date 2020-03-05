import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Content, { Title, Subtitle, Section } from '../components/Content';
import { LoadingAvatar } from '../components/Avatar';
import { Skeleton } from '../components/Loading';
import Button from '../components/Button';

import { UserList, LoadingUserListItem, UserInfo, Meta } from './UserList';

function Loading() {
  return (
    <Content>
      <Title>Workspace members</Title>
      <Subtitle>View and manage all users in your workspace.</Subtitle>

      <Section>
        <UserList>
          <LoadingUserListItem>
            <LoadingAvatar size="40px" />

            <Skeleton as={UserInfo}>
              Loading user name
              <br />
              Loading email
            </Skeleton>

            <Skeleton as={Meta}>loading join date</Skeleton>

            <div>
              <Button size="small" tertiary disabled>
                <FontAwesomeIcon icon="ellipsis-h" />
              </Button>
            </div>
          </LoadingUserListItem>

          <LoadingUserListItem>
            <LoadingAvatar size="40px" />

            <Skeleton as={UserInfo}>
              Loading user name
              <br />
              Loading email
            </Skeleton>

            <Skeleton as={Meta}>loading join date</Skeleton>

            <div>
              <Button size="small" tertiary disabled>
                <FontAwesomeIcon icon="ellipsis-h" />
              </Button>
            </div>
          </LoadingUserListItem>

          <LoadingUserListItem>
            <LoadingAvatar size="40px" />

            <Skeleton as={UserInfo}>
              Loading user name
              <br />
              Loading email
            </Skeleton>

            <Skeleton as={Meta}>loading join date</Skeleton>

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
