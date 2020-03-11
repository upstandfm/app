import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Skeleton } from '../components/Loading';
import { LoadingAudioPlayer } from '../components/AudioPlayer';
import Button from '../components/Button';
import { Breadcrumbs, Breadcrumb } from '../components/Breadcrumbs';

import { LoadingChannelRecordings } from '../channel-recordings';

import {
  Container,
  Header,
  NavContainer,
  Actions,
  Main,
  Footer
} from './Layout';

function Loading() {
  const { url } = useRouteMatch();

  return (
    <Container>
      <Header>
        <NavContainer>
          <Breadcrumbs>
            <Skeleton as={Breadcrumb}>Loading channel</Skeleton>
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
        <LoadingChannelRecordings />
      </Main>

      <Footer>
        <LoadingAudioPlayer />
      </Footer>
    </Container>
  );
}

export default Loading;
