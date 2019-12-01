import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

import Button from '../components/Button';
import { useSnackbar } from '../components/Snackbar';

import { LoadMoreContainer } from './Layout';

import {
  ListContainer,
  ListTitle,
  List,
  LoadingListItem,
  ListItemLink,
  LoadingListItemText,
  ListItemText,
  ListEmpty
} from './StandupList';

import standupsReducer from './reducer';
import useFetchStandups from './use-fetch-standups';

const MenuButton = styled(Button)`
  padding: 0.1em 0.2em;
`;

const LoadMoreButton = styled(Button)`
  color: var(--color-lighter-purple);

  :hover {
    color: var(--color-lightest-purple);
  }

  :disabled {
    color: var(--color-grey) !important;
  }
`;

export function PureStandups({ isLoading, cursor, fetchNextPage, standups }) {
  if (isLoading && !cursor) {
    return (
      <ListContainer>
        <ListTitle>MY STANDUPS</ListTitle>

        <List>
          <LoadingListItem>
            <LoadingListItemText>Standup loading title</LoadingListItemText>

            <span />

            <MenuButton tertiary disabled title="not implemented yet">
              <FontAwesomeIcon icon="ellipsis-h" />
            </MenuButton>
          </LoadingListItem>

          <LoadingListItem>
            <LoadingListItemText>Standup loading title</LoadingListItemText>

            <span />

            <MenuButton tertiary disabled title="not implemented yet">
              <FontAwesomeIcon icon="ellipsis-h" />
            </MenuButton>
          </LoadingListItem>

          <LoadingListItem>
            <LoadingListItemText>Standup loading title</LoadingListItemText>

            <span />

            <MenuButton tertiary disabled title="not implemented yet">
              <FontAwesomeIcon icon="ellipsis-h" />
            </MenuButton>
          </LoadingListItem>
        </List>
      </ListContainer>
    );
  }

  if (standups.length === 0) {
    return (
      <ListContainer>
        <ListTitle>MY STANDUPS</ListTitle>

        <List>
          <ListEmpty>No standups yet..</ListEmpty>
        </List>
      </ListContainer>
    );
  }

  const handleLoadMore = () => {
    fetchNextPage(cursor);
  };

  return (
    <div>
      <ListContainer>
        <ListTitle>MY STANDUPS</ListTitle>

        <List>
          {standups.map(standup => {
            const { standupId, standupName } = standup;
            return (
              <ListItemLink key={standupId} to={standupId}>
                <span />

                <ListItemText>{standupName}</ListItemText>

                <MenuButton tertiary disabled title="not implemented yet">
                  <FontAwesomeIcon icon="ellipsis-h" />
                </MenuButton>
              </ListItemLink>
            );
          })}
        </List>
      </ListContainer>

      {cursor && (
        <LoadMoreContainer>
          <LoadMoreButton
            tertiary
            disabled={isLoading}
            onClick={handleLoadMore}
          >
            {isLoading ? (
              <FontAwesomeIcon icon="circle-notch" spin />
            ) : (
              'Load more'
            )}
          </LoadMoreButton>
        </LoadMoreContainer>
      )}
    </div>
  );
}

PureStandups.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  cursor: PropTypes.string,
  fetchNextPage: PropTypes.func.isRequired,
  standups: PropTypes.arrayOf(
    PropTypes.shape({
      standupId: PropTypes.string.isRequired,
      standupName: PropTypes.string.isRequired
    })
  )
};

const PAGE_LIMIT = 10;

function Standups() {
  const [standupsState, standupsDispatch] = React.useReducer(
    standupsReducer,
    []
  );

  const [
    fetchStandups,
    abortFetchStandups,
    isFetching,
    err,
    nextPageCursor
  ] = useFetchStandups(standupsDispatch);

  const [, snackbarDispatch] = useSnackbar();

  React.useEffect(() => {
    fetchStandups(PAGE_LIMIT);

    return () => {
      abortFetchStandups();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (!err) {
      return;
    }

    snackbarDispatch({
      type: 'ENQUEUE_SNACKBAR_MSG',
      data: {
        type: 'error',
        title: 'Failed to fetch standups',
        text: err.details
          ? `${err.message}: ${err.details}.`
          : err.message + '.'
      }
    });
  }, [err]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchNextPage = cursor => {
    fetchStandups(PAGE_LIMIT, cursor);
  };

  return (
    <PureStandups
      isLoading={isFetching}
      cursor={nextPageCursor}
      fetchNextPage={fetchNextPage}
      standups={standupsState}
    />
  );
}

export default Standups;
