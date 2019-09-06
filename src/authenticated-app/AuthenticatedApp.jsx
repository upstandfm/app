import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
          <Button special>
            <FontAwesomeIcon icon="plus" size="sm" /> New Update
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
        <Button special round>
          <FontAwesomeIcon icon="plus" size="lg" />
        </Button>
      </Footer>
    </Container>
  );
}

export default AuthenticatedApp;
