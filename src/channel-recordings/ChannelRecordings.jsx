import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useSnackbar } from '../components/Snackbar';
import Button from '../components/Button';
import Recordings from '../recordings';

import Loading from './Loading';
import { Wrapper, Container, LoadMoreContainer } from './Layout';

import recordingReducer, { defaultRecordingState } from './reducer';
import useFetchMembers from './use-fetch-members';
import useFetchRecordings from './use-fetch-recordings';

const PAGE_LIMIT = 20;

export function PureChannelRecordings({
  isFetchingMembers,
  isFetchingRecordings,
  cursor,
  fetchNextPage,
  membersById,
  recordings
}) {
  const handleLoadMore = () => {
    fetchNextPage(cursor);
  };

  const isLoading = isFetchingMembers || isFetchingRecordings;
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
              disabled={isFetchingRecordings}
              onClick={handleLoadMore}
            >
              {isFetchingRecordings ? (
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

PureChannelRecordings.propTypes = {
  isFetchingMembers: PropTypes.bool.isRequired,
  isFetchingRecordings: PropTypes.bool.isRequired,
  cursor: PropTypes.string,
  fetchNextPage: PropTypes.func.isRequired,
  membersById: PropTypes.object.isRequired,
  recordings: PropTypes.array.isRequired
};

function ChannelRecordings() {
  const { channelId } = useParams();
  const [, snackbarDispatch] = useSnackbar();
  const [recordingState, recordingDispatch] = React.useReducer(
    recordingReducer,
    defaultRecordingState
  );

  const [
    fetchMembers,
    abortFetchMembers,
    isFetchingMembers,
    membersErr
  ] = useFetchMembers(recordingDispatch);

  const [
    fetchRecordings,
    abortFetchRecordings,
    isFetchingRecordings,
    updatesErr,
    nextPageCursor
  ] = useFetchRecordings(channelId, recordingDispatch);

  React.useEffect(() => {
    fetchMembers();
    fetchRecordings(PAGE_LIMIT);

    return () => {
      abortFetchMembers();
      abortFetchRecordings();
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
          title: 'Failed to fetch channel recordings',
          text: updatesErr.details
            ? `${updatesErr.message}: ${updatesErr.details}`
            : updatesErr.message
        }
      });
    }
  }, [membersErr, updatesErr]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchNextPage = cursor => {
    fetchRecordings(PAGE_LIMIT, cursor);
  };

  return (
    <PureChannelRecordings
      isFetchingMembers={isFetchingMembers}
      isFetchingRecordings={isFetchingRecordings}
      cursor={nextPageCursor}
      fetchNextPage={fetchNextPage}
      membersById={recordingState.membersById}
      recordings={recordingState.recordings}
    />
  );
}

export default ChannelRecordings;
