import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useSnackbar } from '../components/Snackbar';
import Button from '../components/Button';

import { LoadingRecordingsByMember, RecordingsByMember } from '../recordings';

import {
  createDateKey,
  sortDateKeysDesc,
  formatDate,
  isDateToday
} from '../utils';

import {
  Container,
  DayDivider,
  LoadingDayDivider,
  UpdatesContainer,
  LoadMoreContainer
} from './Layout';

import updatesReducer, { defaultUpdatesState } from './reducer';
import useFetchMembers from './use-fetch-members';
import useFetchUpdates from './use-fetch-updates';

export function PureStandupUpdates({
  isLoading,
  isLoadingMore,
  members,
  updatesByDate,
  fetchMoreUpdates
}) {
  if (isLoading && !isLoadingMore) {
    return (
      <Container>
        <LoadingDayDivider />
        <LoadingRecordingsByMember />
      </Container>
    );
  }

  const handleLoadMore = () => {
    fetchMoreUpdates();
  };

  const dateKeys = Object.keys(updatesByDate);
  const sortedDateKeys = sortDateKeysDesc(dateKeys);

  return (
    <Container>
      {sortedDateKeys.map(({ epoch, dateKey }) => {
        const formattedDate = formatDate(epoch);
        const isToday = isDateToday(epoch);

        return (
          <UpdatesContainer key={epoch}>
            <DayDivider
              formattedDate={isToday ? 'Today' : formattedDate}
              showHelp={isToday}
              title={isToday ? formattedDate : ''}
            />

            <RecordingsByMember
              members={members}
              recordings={updatesByDate[dateKey]}
            />
          </UpdatesContainer>
        );
      })}

      <LoadMoreContainer>
        <Button
          size="small"
          tertiary
          disabled={isLoadingMore}
          onClick={handleLoadMore}
        >
          {isLoadingMore ? (
            <FontAwesomeIcon icon="circle-notch" spin />
          ) : (
            'Load older'
          )}
        </Button>
      </LoadMoreContainer>
    </Container>
  );
}

PureStandupUpdates.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isLoadingMore: PropTypes.bool.isRequired,
  members: PropTypes.array.isRequired,
  updatesByDate: PropTypes.object.isRequired,
  fetchMoreUpdates: PropTypes.func.isRequired
};

function StandupUpdates({ standupId }) {
  const [, snackbarDispatch] = useSnackbar();

  const [updatesState, updatesDispatch] = React.useReducer(
    updatesReducer,
    defaultUpdatesState
  );

  // Workspace members

  const [
    fetchMembers,
    abortFetchMembers,
    isFetchingMembers,
    membersErr
  ] = useFetchMembers(updatesDispatch);

  React.useEffect(() => {
    fetchMembers();

    return () => {
      abortFetchMembers();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (!membersErr) {
      return;
    }

    snackbarDispatch({
      type: 'ENQUEUE_SNACKBAR_MSG',
      data: {
        type: 'error',
        title: 'Failed to fetch workspace members',
        text: membersErr.details
          ? `${membersErr.message}: ${membersErr.details}.`
          : membersErr.message + '.'
      }
    });
  }, [membersErr]); // eslint-disable-line react-hooks/exhaustive-deps

  // Updates

  const [
    fetchUpdates,
    abortFetchUpdates,
    isFetchingUpdates,
    updatesErr,
    dayOffset
  ] = useFetchUpdates(updatesDispatch);

  React.useEffect(() => {
    const today = new Date();
    const dateKey = createDateKey(today);
    fetchUpdates(standupId, dateKey);

    return () => {
      abortFetchUpdates();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (!updatesErr) {
      return;
    }

    snackbarDispatch({
      type: 'ENQUEUE_SNACKBAR_MSG',
      data: {
        type: 'error',
        title: 'Failed to fetch standup updates',
        text: updatesErr.details
          ? `${updatesErr.message}: ${updatesErr.details}.`
          : updatesErr.message + '.'
      }
    });
  }, [updatesErr]); // eslint-disable-line react-hooks/exhaustive-deps

  // Helpers

  const fetchMoreUpdates = () => {
    const today = new Date();
    const year = today.getFullYear();
    const monthIndex = today.getMonth();
    const day = today.getDate();
    const pastDate = new Date(year, monthIndex, day - dayOffset);
    const dateKey = createDateKey(pastDate);
    fetchUpdates(standupId, dateKey);
  };

  const isLoading = isFetchingMembers || isFetchingUpdates;

  return (
    <PureStandupUpdates
      isLoading={isLoading}
      isLoadingMore={isFetchingUpdates && dayOffset > 0}
      members={updatesState.members}
      updatesByDate={updatesState.updatesByDate}
      fetchMoreUpdates={fetchMoreUpdates}
    />
  );
}

StandupUpdates.propTypes = {
  standupId: PropTypes.string
};

export default StandupUpdates;
