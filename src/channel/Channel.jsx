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

import channelReducer from './reducer';
import useFetchChannel from './use-fetch-channel';

export function PureChannel({
  channelId,
  urlRouteMatch,
  locationPathname,
  isLoading,
  channel,
  children
}) {
  if (isLoading) {
    return <Loading />;
  }

  if (!channel) {
    return (
      <NotFound
        title="Channel not found"
        info="You might not be a member of this channel, or it doesn't exist."
      />
    );
  }

  const breadcrumbConfigByPathFragment = {
    channels: {
      displayName: 'Channels',
      asLink: false,
      linkTo: undefined
    },
    [channelId]: {
      displayName: channel.name,
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

PureChannel.propTypes = {
  channelId: PropTypes.string,
  urlRouteMatch: PropTypes.string,
  locationPathname: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  channel: PropTypes.shape({
    id: PropTypes.string,
    createdBy: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    name: PropTypes.string,
    isPrivate: PropTypes.bool
  })
};

function Channel() {
  const { channelId } = useParams();
  const { path, url } = useRouteMatch();
  const location = useLocation();
  const [channelState, channelDispatch] = React.useReducer(channelReducer);
  const [fetchChannel, abortFetchChannel, isFetching, err] = useFetchChannel(
    channelDispatch
  );
  const [, snackbarDispatch] = useSnackbar();

  React.useEffect(() => {
    fetchChannel(channelId);

    return () => {
      abortFetchChannel();
    };
  }, [channelId]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (!err) {
      return;
    }

    snackbarDispatch({
      type: 'ENQUEUE_SNACKBAR_MSG',
      data: {
        type: 'error',
        title: 'Failed to fetch channel',
        text: err.details ? `${err.message}: ${err.details}` : err.message
      }
    });
  }, [err]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <PureChannel
      channelId={channelId}
      urlRouteMatch={url}
      locationPathname={location.pathname}
      isLoading={isFetching}
      channel={channelState}
    >
      <Switch>
        <Route exact path={path}>
          <StandupUpdates />
        </Route>

        <Route exact path={`${path}/new-update`}>
          <NewUpdate />
        </Route>

        <Route path="*">
          <NotFound
            title="Page not found"
            info="Sorry! This page doesn't exist."
          />
        </Route>
      </Switch>
    </PureChannel>
  );
}

export default Channel;
