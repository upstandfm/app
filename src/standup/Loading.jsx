import React from 'react';
import { Link } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { LoadingAudioPlayer } from '../components/AudioPlayer';
import Button from '../components/Button';
import { Breadcrumbs, LoadingBreadcrumb } from '../components/Breadcrumbs';

import { LoadingStandupMembers } from '../standup-members';

import { Container, Header, NavContainer, Main, Footer } from './Layout';

function Loading({ children }) {
  return (
    <Container>
      <Header>
        <NavContainer>
          <Breadcrumbs>
            <LoadingBreadcrumb />
          </Breadcrumbs>
        </NavContainer>

        <LoadingStandupMembers />

        <div>
          <Button tertiary as={Link} to="new-update">
            New update
          </Button>

          <Button tertiary disabled title="not implemented yet">
            <FontAwesomeIcon icon="ellipsis-h" />
          </Button>
        </div>
      </Header>

      <Main>{children}</Main>

      <Footer>
        <LoadingAudioPlayer />
      </Footer>
    </Container>
  );
}

export default Loading;
