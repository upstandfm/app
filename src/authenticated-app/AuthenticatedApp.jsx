import React from 'react';
import { Router } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

import { useAuth0, useUser } from '../auth0';
import useMatchMediaQuery from '../hooks/use-match-media-query';

import { AvatarDropdown } from '../components/Dropdown';
import { NotFound } from '../components/Errors';
import Snackbar from '../components/Snackbar';
import Button from '../components/Button';

import Standups from '../standups';
import NewStandup from '../new-standup';
import Standup from '../standup';
import NewUpdate from '../new-update';

import {
  AppContainer,
  Sidebar,
  Header,
  Nav,
  Profile,
  Main,
  MainContainer
} from './Layout';

import { Menu } from './Menu';

const ToggleButton = styled(Button)`
  padding: 0.5em;
  color: ${props => (props.active ? 'var(--color-light-purple)' : 'inherit')};
`;

function AuthenticatedApp() {
  const { logout } = useAuth0();
  const { avatarUrl, fullName, email } = useUser();
  const [isMobile] = useMatchMediaQuery('max-width: 980px');

  const [isOpen, setIsOpen] = React.useState(true);

  // When the viewport becomes too small, close the sidebar
  // This will effectively happen when:
  //   1. The app loads on a small screen
  //   2. The window is resized from a "larger" to "smaller" viewport
  React.useEffect(() => {
    if (isMobile && isOpen) {
      setIsOpen(false);
    }
  }, [isMobile]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleOpenCloseSidebar = () => {
    setIsOpen(s => !s);
  };

  return (
    <>
      <AppContainer>
        <Sidebar show={isOpen}>
          <Nav>
            <Menu />
          </Nav>

          <Standups />
        </Sidebar>

        <Main sidebarIsOpen={isOpen}>
          <Header>
            <ToggleButton
              tertiary
              onClick={handleOpenCloseSidebar}
              active={isOpen}
              aria-label={isOpen ? 'close sidebar' : 'open sidebar'}
              title={isOpen ? 'close sidebar' : 'open sidebar'}
            >
              <FontAwesomeIcon icon="bars" size="lg" />
            </ToggleButton>

            <span />

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

          <MainContainer>
            <Router>
              <NewStandup path="/new" />
              <Standup path="/:standupId" />
              <NewUpdate path="/:standupId/new-update" />

              <NotFound
                default
                title="Page not found"
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
