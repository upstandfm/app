import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useSnackbar } from '../components/Snackbar';
import Button from '../components/Button';
import Recordings from '../recordings';

import Loading from './Loading';
import { Wrapper, Container, LoadMoreContainer } from './Layout';

import updateReducer, { defaultUpdateState } from './reducer';
import useFetchMembers from './use-fetch-members';
import useFetchUpdates from './use-fetch-updates';

const PAGE_LIMIT = 20;

export function PureStandupUpdates({
  isFetchingMembers,
  isFetchingUpdates,
  cursor,
  fetchNextPage,
  membersById,
  recordings
}) {
  const handleLoadMore = () => {
    fetchNextPage(cursor);
  };

  const isLoading = isFetchingMembers || isFetchingUpdates;
  if (isLoading && !cursor) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <Container>
        <Recordings membersById={membersById} recordings={recordings} />

        {cursor && (
          <LoadMoreContainer>
            <Button
              size="small"
              tertiary
              disabled={isFetchingUpdates}
              onClick={handleLoadMore}
            >
              {isFetchingUpdates ? (
                <FontAwesomeIcon icon="circle-notch" spin />
              ) : (
                'Load older'
              )}
            </Button>
          </LoadMoreContainer>
        )}
      </Container>
    </Wrapper>
  );
}

PureStandupUpdates.propTypes = {
  isFetchingMembers: PropTypes.bool.isRequired,
  isFetchingUpdates: PropTypes.bool.isRequired,
  cursor: PropTypes.string,
  fetchNextPage: PropTypes.func.isRequired,
  membersById: PropTypes.object.isRequired,
  recordings: PropTypes.array.isRequired
};

function StandupUpdates() {
  const { standupId } = useParams();
  const [, snackbarDispatch] = useSnackbar();
  const [updateState, updateDispatch] = React.useReducer(
    updateReducer,
    defaultUpdateState
  );

  const [
    fetchMembers,
    abortFetchMembers,
    isFetchingMembers,
    membersErr
  ] = useFetchMembers(updateDispatch);

  const [
    fetchUpdates,
    abortFetchUpdates,
    isFetchingUpdates,
    updatesErr,
    nextPageCursor
  ] = useFetchUpdates(standupId, updateDispatch);

  React.useEffect(() => {
    fetchMembers();
    fetchUpdates(PAGE_LIMIT);

    return () => {
      abortFetchMembers();
      abortFetchUpdates();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (membersErr) {
      snackbarDispatch({
        type: 'ENQUEUE_SNACKBAR_MSG',
        data: {
          type: 'error',
          title: 'Failed to fetch workspace members',
          text: membersErr.details
            ? `${membersErr.message}: ${membersErr.details}`
            : membersErr.message
        }
      });
    }

    if (updatesErr) {
      snackbarDispatch({
        type: 'ENQUEUE_SNACKBAR_MSG',
        data: {
          type: 'error',
          title: 'Failed to fetch standup updates',
          text: updatesErr.details
            ? `${updatesErr.message}: ${updatesErr.details}`
            : updatesErr.message
        }
      });
    }
  }, [membersErr, updatesErr]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchNextPage = cursor => {
    fetchUpdates(PAGE_LIMIT, cursor);
  };

  return (
    <PureStandupUpdates
      isFetchingMembers={isFetchingMembers}
      isFetchingUpdates={isFetchingUpdates}
      cursor={nextPageCursor}
      fetchNextPage={fetchNextPage}
      membersById={updateState.membersById}
      recordings={updateState.recordings}
    />
  );
}

export default StandupUpdates;
