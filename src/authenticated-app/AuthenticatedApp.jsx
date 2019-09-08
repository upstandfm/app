import React from 'react';
import { Router, Link, Redirect } from '@reach/router';
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
  Nav,
  Actions,
  Profile,
  Main,
  MainContainer,
  Footer
} from './Layout';

const Standups = () => (
  <div>
    <h1>Standups</h1>
  </div>
);

const NotFound = () => (
  <div>
    <h1>Page not found</h1>
  </div>
);

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

          <Nav></Nav>

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
          <Router>
            <Redirect from="/" to="/standups" />

            <Standups path="/standups" />

            <NotFound default />
          </Router>
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
