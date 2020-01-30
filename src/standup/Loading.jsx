import React from 'react';
import { Link } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { LoadingAudioPlayer } from '../components/AudioPlayer';
import Button from '../components/Button';
import { Breadcrumbs, LoadingBreadcrumb } from '../components/Breadcrumbs';

import {
  Container,
  Header,
  NavContainer,
  Actions,
  Main,
  Footer
} from './Layout';

function Loading({ children }) {
  return (
    <Container>
      <Header>
        <NavContainer>
          <Breadcrumbs>
            <LoadingBreadcrumb />
          </Breadcrumbs>
        </NavContainer>

        <Actions>
          <Button size="small" tertiary as={Link} to="new-update">
            New update
          </Button>

          <Button size="small" tertiary disabled title="not implemented yet">
            <FontAwesomeIcon icon="ellipsis-h" />
          </Button>
        </Actions>
      </Header>

      <Main>{children}</Main>

      <Footer>
        <LoadingAudioPlayer />
      </Footer>
    </Container>
  );
}

export default Loading;
