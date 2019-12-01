import React from 'react';
import { Router, Link } from '@reach/router';
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
  Nav,
  Actions,
  Header,
  Profile,
  Main,
  MainContainer
} from './Layout';

import { Menu, MenuLink } from './Menu';

const NewStandupButton = styled(Link)`
  display: inline-block;
  box-sizing: border-box;
  margin: 0;
  padding: 8px 20px;
  color: var(--color-lighter-purple) !important;
  width: 100%;
  text-align: center;
  letter-spacing: 1px;
  transition: all 0.1s linear;

  :hover {
    color: var(--color-lightest-purple) !important;
  }
`;

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
            <Menu>
              <MenuLink to="/inbox">
                <FontAwesomeIcon icon="inbox" /> Inbox
              </MenuLink>
            </Menu>
          </Nav>

          <Standups />

          <Actions>
            <NewStandupButton to="/new">
              <FontAwesomeIcon icon="plus" /> New standup
            </NewStandupButton>
          </Actions>
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
