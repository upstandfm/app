import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAuth0, useUser } from '../auth0';

import { LogoWithName } from '../components/Logo';
import Button from '../components/Button';
import { AvatarDropdown } from '../components/Dropdown';

import {
  AppContainer,
  Header,
  HeaderContainer,
  Brand,
  Actions,
  Profile,
  Main,
  MainContainer,
  Footer
} from './Layout';

function AuthenticatedApp() {
  const { logout } = useAuth0();
  const { avatarUrl, fullName, email } = useUser();

  return (
    <AppContainer>
      <Header>
        <HeaderContainer>
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
        </HeaderContainer>
      </Header>

      <Main>
        <MainContainer>
          <p>Hello world!</p>
        </MainContainer>
      </Main>

      <Footer>
        <Button special round aria-label="new update">
          <FontAwesomeIcon icon="plus" size="lg" />
        </Button>
      </Footer>
    </AppContainer>
  );
}

export default AuthenticatedApp;
