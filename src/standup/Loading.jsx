import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { LoadingAudioPlayer } from '../components/AudioPlayer';
import Button from '../components/Button';
import { Breadcrumbs, LoadingBreadcrumb } from '../components/Breadcrumbs';

import { LoadingStandupUpdates } from '../standup-updates';

import {
  Container,
  Header,
  NavContainer,
  Actions,
  Main,
  Footer
} from './Layout';

function Loading({ children }) {
  const { url } = useRouteMatch();

  return (
    <Container>
      <Header>
        <NavContainer>
          <Breadcrumbs>
            <LoadingBreadcrumb />
          </Breadcrumbs>
        </NavContainer>

        <Actions>
          <Button size="small" tertiary as={Link} to={`${url}/new-update`}>
            New update
          </Button>

          <Button size="small" tertiary disabled title="not implemented yet">
            <FontAwesomeIcon icon="ellipsis-h" />
          </Button>
        </Actions>
      </Header>

      <Main>
        <LoadingStandupUpdates />
      </Main>

      <Footer>
        <LoadingAudioPlayer />
      </Footer>
    </Container>
  );
}

export default Loading;
