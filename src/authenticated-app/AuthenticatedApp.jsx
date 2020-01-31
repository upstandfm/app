import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

import { useAuth0, useUser } from '../auth0';
import useMatchMediaQuery from '../hooks/use-match-media-query';

import { AvatarDropdown } from '../components/Dropdown';
import { NotFound } from '../components/Errors';
import Snackbar from '../components/Snackbar';
import Button from '../components/Button';

import Settings from '../settings';
import Standups from '../standups';
import NewStandup from '../new-standup';
import Standup from '../standup';

import { AppContainer, Sidebar, Nav, Actions, Profile, Main } from './Layout';
import { Menu, MenuLink } from './Menu';

const ToggleButton = styled(Button)`
  position: absolute;
  top: 12px;
  left: 12px;
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
    <Router>
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
              <MenuLink exact to="/">
                <FontAwesomeIcon icon="inbox" /> Inbox
              </MenuLink>

              <MenuLink to="/settings">
                <FontAwesomeIcon icon="cog" /> Settings
              </MenuLink>
            </Menu>
          </Nav>

          <Standups />

          <Actions>
            <Button secondary as={Link} to="/new-standup">
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

          <Switch>
            <Route path="/settings">
              <Settings />
            </Route>

            <Route path="/new-standup">
              <NewStandup />
            </Route>

            <Route path="/standups/:standupId">
              <Standup />
            </Route>

            <Route path="*">
              <NotFound
                title="Page not found"
                info="Sorry! This page doesn't exist."
              />
            </Route>
          </Switch>
        </Main>
      </AppContainer>

      <Snackbar />
    </Router>
  );
}

export default AuthenticatedApp;
