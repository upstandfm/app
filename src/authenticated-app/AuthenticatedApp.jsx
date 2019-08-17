import React from 'react';

import { useAuth0, useUser } from '../auth0';

import Logo from '../components/Logo';
import Button from '../components/Button';
import AvatarDropdown from '../components/AvatarDropdown';

import { Container, MenuBar, Brand, Actions, Profile, Main } from './Layout';

function AuthenticatedApp() {
  const { logout } = useAuth0();
  const { avatarUrl, fullName, email } = useUser();

  return (
    <Container>
      <MenuBar>
        <Brand>
          <Logo />
        </Brand>

        <Actions>
          <Button secondary>new update</Button>
        </Actions>

        <Profile>
          <AvatarDropdown
            logout={logout}
            avatarUrl={avatarUrl}
            fullName={fullName}
            email={email}
          />
        </Profile>
      </MenuBar>

      <Main></Main>
    </Container>
  );
}

export default AuthenticatedApp;
