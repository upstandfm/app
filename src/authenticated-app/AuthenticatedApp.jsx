import React from 'react';
import { Router } from '@reach/router';

import { useAuth0, useUser } from '../auth0';

import { LogoWithName } from '../components/Logo';
import { AvatarDropdown } from '../components/Dropdown';
import { NotFound } from '../components/Errors';
import Snackbar from '../components/Snackbar';

import Standups from '../standups';
import NewStandup from '../new-standup';
import Standup from '../standup';

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
    <>
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
              <Standup path="/:standupId" />

              <NotFound
                default
                title="Page not found.."
                info="Sorry! This page doesn't exist."
              />
            </Router>
          </MainContainer>
        </Main>
      </AppContainer>

      <Snackbar />
    </>
  );
}

export default AuthenticatedApp;
