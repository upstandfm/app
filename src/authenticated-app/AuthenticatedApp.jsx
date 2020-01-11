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
import Updates from '../updates';

import { AppContainer, Sidebar, Nav, Actions, Profile, Main } from './Layout';
import { Menu, MenuLink } from './Menu';

const ToggleButton = styled(Button)`
  position: absolute;
  top: 12px;
  left: 12px;
  color: ${props =>
    props.active ? 'var(--color-light-purple)' : 'var(--color-grey)'};
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
          <Profile>
            <AvatarDropdown
              logout={logout}
              avatarUrl={avatarUrl}
              fullName={fullName}
              email={email}
            />
          </Profile>

          <Nav>
            <Menu>
              <MenuLink to="/">
                <FontAwesomeIcon icon="inbox" /> Inbox
              </MenuLink>
            </Menu>
          </Nav>

          <Standups />

          <Actions>
            <Button secondary as={Link} to="new-standup">
              New standup
            </Button>
          </Actions>
        </Sidebar>

        <Main sidebarIsOpen={isOpen}>
          <ToggleButton
            tertiary
            onClick={handleOpenCloseSidebar}
            active={isOpen}
            aria-label={isOpen ? 'close sidebar' : 'open sidebar'}
            title={isOpen ? 'close sidebar' : 'open sidebar'}
          >
            <FontAwesomeIcon icon="bars" size="lg" />
          </ToggleButton>

          <Router>
            <NewStandup path="/new-standup" />

            <Standup path="/standups/:standupId">
              <Updates path="/" />
              <NewUpdate path="/new-update" />
            </Standup>

            <NotFound
              default
              title="Page not found"
              info="Sorry! This page doesn't exist."
            />
          </Router>
        </Main>
      </AppContainer>

      <Snackbar />
    </>
  );
}

export default AuthenticatedApp;
