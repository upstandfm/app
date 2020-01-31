import React from 'react';
import PropTypes from 'prop-types';
import {
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  useLocation
} from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import NewUpdate from '../new-update';
import StandupUpdates from '../standup-updates';

import AudioPlayer from '../components/AudioPlayer';
import Button from '../components/Button';
import { NotFound } from '../components/Errors';
import { useSnackbar } from '../components/Snackbar';
import {
  Breadcrumbs,
  Breadcrumb,
  BreadcrumbLink
} from '../components/Breadcrumbs';

import {
  Container,
  Header,
  NavContainer,
  Actions,
  Main,
  Footer
} from './Layout';

import Loading from './Loading';

import standupReducer from './reducer';
import useFetchStandup from './use-fetch-standup';

export function PureStandup({
  standupId,
  urlRouteMatch,
  locationPathname,
  isLoading,
  standup,
  children
}) {
  if (isLoading) {
    return <Loading>{children}</Loading>;
  }

  if (Object.keys(standup).length === 0) {
    return (
      <NotFound
        title="Standup not found"
        info="You might not be a member of this standup, or it doesn't exist."
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
      displayName: standup.name,
      asLink: true,
      linkTo: urlRouteMatch
    },
    'new-update': {
      displayName: 'New update',
      asLink: false,
      linkTo: undefined
    }
  };

  const pathFragments = locationPathname.split('/').filter(Boolean);

  return (
    <Container>
      <Header>
        <NavContainer>
          <Breadcrumbs>
            {pathFragments.map(fragment => {
              const config = breadcrumbConfigByPathFragment[fragment];

              if (!config) {
                return null;
              }

              const { displayName, asLink, linkTo } = config;
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

        <Actions>
          <Button
            size="small"
            tertiary
            as={Link}
            to={`${urlRouteMatch}/new-update`}
          >
            New update
          </Button>

          <Button size="small" tertiary disabled title="not implemented yet">
            <FontAwesomeIcon icon="ellipsis-h" />
          </Button>
        </Actions>
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
  urlRouteMatch: PropTypes.string,
  locationPathname: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  standup: PropTypes.shape({
    id: PropTypes.string,
    createdBy: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    name: PropTypes.string,
    isPrivate: PropTypes.bool
  })
};

function Standup() {
  const { standupId } = useParams();
  const { path, url } = useRouteMatch();
  const location = useLocation();
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
    <PureStandup
      standupId={standupId}
      urlRouteMatch={url}
      locationPathname={location.pathname}
      isLoading={isFetching}
      standup={standupState}
    >
      <Switch>
        <Route exact path={path}>
          <StandupUpdates />
        </Route>

        <Route exact path={`${path}/new-update`}>
          <NewUpdate />
        </Route>
      </Switch>
    </PureStandup>
  );
}

export default Standup;
