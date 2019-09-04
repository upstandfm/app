import React from 'react';

import { useAuth0, useUser } from '../auth0';

import { LogoWithName } from '../components/Logo';
import Button from '../components/Button';
import { AvatarDropdown } from '../components/Dropdown';

import {
  Container,
  Header,
  Brand,
  Actions,
  Profile,
  Main,
  Footer
} from './Layout';

function AuthenticatedApp() {
  const { logout } = useAuth0();
  const { avatarUrl, fullName, email } = useUser();

  return (
    <Container>
      <Header>
        <Brand>
          <LogoWithName />
        </Brand>

        <Actions>
          <Button invertTextColor aria-label="new update">
            new update
          </Button>
        </Actions>

        <Profile>
          <AvatarDropdown
            alignSelf="right"
            logout={logout}
            avatarUrl={avatarUrl}
            fullName={fullName}
            email={email}
          />
        </Profile>
      </Header>

      <Main></Main>

      <Footer>
        <Button invertTextColor aria-label="new update">
          new update
        </Button>
      </Footer>
    </Container>
  );
}

export default AuthenticatedApp;
