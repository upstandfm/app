import React from 'react';

import { useAuth0, useUser } from '../auth0';

import Button from '../components/Button';
import AvatarDropdown from '../components/AvatarDropdown';

import { Container, MenuBar, Profile, Menu, Footer, Main } from './Layout';

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
          <Button invertTextColor>new update</Button>
        </Menu>

        <Footer></Footer>
      </MenuBar>

      <Main></Main>
    </Container>
  );
}

export default AuthenticatedApp;
