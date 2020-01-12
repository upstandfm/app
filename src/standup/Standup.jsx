import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AudioPlayer from '../components/AudioPlayer';
import Button from '../components/Button';
import { NotFound } from '../components/Errors';
import { useSnackbar } from '../components/Snackbar';
import {
  Breadcrumbs,
  Breadcrumb,
  BreadcrumbLink
} from '../components/Breadcrumbs';

import StandupMembers, { StandupMembersProvider } from '../standup-members';

import { Container, Header, NavContainer, Main, Footer } from './Layout';
import Loading from './Loading';

import standupReducer from './reducer';
import useFetchStandup from './use-fetch-standup';

export function PureStandup({ standupId, isLoading, standup, children }) {
  if (isLoading) {
    return <Loading>{children}</Loading>;
  }

  if (Object.keys(standup).length === 0) {
    return (
      <NotFound
        title="Standup not found"
        info="You might not be a member of this standup."
      />
    );
  }

  const breadcrumbConfigByPathFragment = {
    standups: {
      displayName: 'Standups',
      asLink: false,
      linkTo: undefined
    },
    [standupId]: {
      displayName: standup.standupName,
      asLink: true,

      // Empty string links to the "parents root"
      // In this case: "/standups/:standupId"
      linkTo: ''
    },
    'new-update': {
      displayName: 'New Update',
      asLink: false,
      linkTo: undefined
    }
  };

  const pathFragments = window.location.pathname.split('/').filter(Boolean);

  return (
    <Container>
      <Header>
        <NavContainer>
          <Breadcrumbs>
            {pathFragments.map(fragment => {
              const {
                displayName,
                asLink,
                linkTo
              } = breadcrumbConfigByPathFragment[fragment];

              return (
                <Breadcrumb key={`breadcrumb-${fragment}`} title={displayName}>
                  {asLink ? (
                    <BreadcrumbLink to={linkTo}>{displayName}</BreadcrumbLink>
                  ) : (
                    displayName
                  )}
                </Breadcrumb>
              );
            })}
          </Breadcrumbs>
        </NavContainer>

        <StandupMembers standupId={standup.standupId} />

        <div>
          <Button small tertiary as={Link} to="new-update">
            New update
          </Button>

          <Button small tertiary disabled title="not implemented yet">
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
  standupId: PropTypes.string,
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
      <PureStandup
        standupId={standupId}
        isLoading={isFetching}
        standup={standupState}
      >
        {children}
      </PureStandup>
    </StandupMembersProvider>
  );
}

Standup.propTypes = {
  standupId: PropTypes.string
};

export default Standup;
