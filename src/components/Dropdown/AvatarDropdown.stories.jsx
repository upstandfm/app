import React from 'react';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';

import AvatarDropdown from './AvatarDropdown';

const Header = styled.div`
  position: relative;
  width: 280px;
  height: 220px;
`;

const Profile = styled.div`
  position: absolute;
  left: 0;
`;

const ProfileDown = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
`;

const ProfileDownRight = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const handleLogout = action('logout');
const avatarUrl = 'https://avatars3.githubusercontent.com/u/6201287';
const fullName = 'Daniël Illouz';
const email = 'daniel@upstand.fm';

export default {
  title: 'components/Dropdown/AvatarDropdown',
  component: AvatarDropdown,
  parameters: {
    componentSubtitle: 'For user- actions and info (like profile and logout)'
  }
};

export const DefaultAvatarDropdown = () => {
  return (
    <Header>
      <Profile>
        <AvatarDropdown
          logout={handleLogout}
          avatarUrl={avatarUrl}
          fullName={fullName}
          email={email}
        />
      </Profile>
    </Header>
  );
};

DefaultAvatarDropdown.story = {
  name: 'default'
};

export const UpAvatarDropdown = () => {
  return (
    <Header>
      <ProfileDown>
        <AvatarDropdown
          logout={handleLogout}
          avatarUrl={avatarUrl}
          fullName={fullName}
          email={email}
          dropDirection="up"
        />
      </ProfileDown>
    </Header>
  );
};

UpAvatarDropdown.story = {
  name: 'dropDirection "up"'
};

export const UpRightAvatarDropdown = () => {
  return (
    <Header>
      <ProfileDownRight>
        <AvatarDropdown
          logout={handleLogout}
          avatarUrl={avatarUrl}
          fullName={fullName}
          email={email}
          dropDirection="up"
          alignSelf="right"
        />
      </ProfileDownRight>
    </Header>
  );
};

UpRightAvatarDropdown.story = {
  name: 'dropDirection "up" + alignSelf "right"'
};
