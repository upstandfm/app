import React from 'react';
import { Router } from '@reach/router';

import { useAuth0, useUser } from '../auth0';

import { LogoWithName } from '../components/Logo';
import { AvatarDropdown } from '../components/Dropdown';
import { NotFound } from '../components/Errors';

import Standups from '../standups';
import NewStandup from '../new-standup';

import {
  AppContainer,
  Header,
  HeaderContainer,
  Brand,
  Nav,
  Profile,
  Main,
  MainContainer
} from './Layout';

import { Menu, MenuItem, MenuLink } from './Menu';

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

          <Nav>
            <Menu>
              <MenuItem>
                <MenuLink to="/">Standups</MenuLink>
              </MenuItem>
            </Menu>
          </Nav>

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
            <Standups path="/" />
            <NewStandup path="/new" />

            <NotFound default />
          </Router>
        </MainContainer>
      </Main>
    </AppContainer>
  );
}

export default AuthenticatedApp;
