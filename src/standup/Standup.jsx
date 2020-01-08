import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AudioPlayer, { LoadingAudioPlayer } from '../components/AudioPlayer';
import Button from '../components/Button';
import { NotFound } from '../components/Errors';
import { useSnackbar } from '../components/Snackbar';

import {
  Breadcrumbs,
  Breadcrumb,
  LoadingBreadcrumb
} from '../components/Breadcrumbs';

import StandupMembers, {
  LoadingStandupMembers,
  StandupMembersProvider
} from '../standup-members';

import { Container, Footer, Header, Main } from './Layout';
import standupReducer from './reducer';
import useFetchStandup from './use-fetch-standup';

export function PureStandup({ isLoading, standup, children }) {
  if (isLoading) {
    return (
      <Container>
        <Header>
          <Breadcrumbs>
            <Breadcrumb>Standups</Breadcrumb>
            <LoadingBreadcrumb />
          </Breadcrumbs>

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

  if (Object.keys(standup).length === 0) {
    return (
      <NotFound
        title="Standup not found"
        info="You might not be a member of this standup."
      />
    );
  }

  const { standupName } = standup;

  return (
    <Container>
      <Header>
        <Breadcrumbs>
          <Breadcrumb title="Standups">Standups</Breadcrumb>
          <Breadcrumb title={standupName}>
            <Link to="">{standupName}</Link>
          </Breadcrumb>
        </Breadcrumbs>

        <StandupMembers standupId={standup.standupId} />

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
        <AudioPlayer />
      </Footer>
    </Container>
  );
}

PureStandup.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  standup: PropTypes.object.isRequired
};

function Standup({ standupId, children }) {
  const [standupState, standupDispatch] = React.useReducer(standupReducer, {});
  const [fetchStandup, abortFetchStandup, isFetching, err] = useFetchStandup(
    standupDispatch
  );

  const [, snackbarDispatch] = useSnackbar();

  React.useEffect(() => {
    fetchStandup(standupId);

    return () => {
      abortFetchStandup();
    };
  }, [standupId]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (!err) {
      return;
    }

    snackbarDispatch({
      type: 'ENQUEUE_SNACKBAR_MSG',
      data: {
        type: 'error',
        title: 'Failed to fetch standup',
        text: err.details
          ? `${err.message}: ${err.details}.`
          : err.message + '.'
      }
    });
  }, [err]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <StandupMembersProvider>
      <PureStandup isLoading={isFetching} standup={standupState}>
        {children}
      </PureStandup>
    </StandupMembersProvider>
  );
}

Standup.propTypes = {
  standupId: PropTypes.string
};

export default Standup;
