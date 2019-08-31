import React from 'react';

import { useAuth0, useUser } from '../auth0';

import Button from '../components/Button';
import { AvatarDropdown, InfoDropdown } from '../components/Dropdown';

import { Container, MenuBar, Profile, Menu, Misc, Main } from './Layout';

function AuthenticatedApp() {
  const { logout } = useAuth0();
  const { avatarUrl, fullName, email } = useUser();

  return (
    <Container>
      <MenuBar>
        <Profile>
          <AvatarDropdown
            logout={logout}
            avatarUrl={avatarUrl}
            fullName={fullName}
            email={email}
          />
        </Profile>

        <Menu>
          <Button invertTextColor aria-label="new update">
            new update
          </Button>
        </Menu>

        <Misc>
          <InfoDropdown />
        </Misc>
      </MenuBar>

      <Main></Main>
    </Container>
  );
}

export default AuthenticatedApp;
