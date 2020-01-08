import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../components/Button';
import { useSnackbar } from '../components/Snackbar';
import { useStandupMembers } from '../standup-members';

import UpdateRecordings, {
  LoadingUpdateRecordings
} from '../update-recordings';

import {
  Container,
  DayDivider,
  LoadingDayDivider,
  UpdatesContainer,
  LoadMoreContainer
} from './Layout';

import updatesReducer, { defaultUpdatesState } from './reducer';
import useFetchUpdates from './use-fetch-updates';
import { sortDateKeysDescending, formatDate, isDateToday } from './utils';

export function LoadingUpdates() {
  return (
    <Container>
      <LoadingDayDivider />
      <LoadingUpdateRecordings />
    </Container>
  );
}

export function PureUpdates({
  isLoading,
  isLoadingMore,
  updates,
  members,
  fetchMoreUpdates
}) {
  if (isLoading && !isLoadingMore) {
    return <LoadingUpdates />;
  }

  const handleLoadMore = () => {
    fetchMoreUpdates();
  };

  const dateKeys = Object.keys(updates);
  const sortedDateKeys = sortDateKeysDescending(dateKeys);

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

            <UpdateRecordings members={members} recordings={updates[dateKey]} />
          </UpdatesContainer>
        );
      })}

      <LoadMoreContainer>
        <Button tertiary disabled={isLoadingMore} onClick={handleLoadMore}>
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

PureUpdates.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  updates: PropTypes.object.isRequired,
  members: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.string.isRequired,
      userFullName: PropTypes.string,
      avatarUrl: PropTypes.string
    })
  )
};

function Updates({ standupId }) {
  const [updatesState, updatesDispatch] = React.useReducer(
    updatesReducer,
    defaultUpdatesState
  );

  const [
    fetchUpdates,
    abortFetchUpdates,
    isFetching,
    err,
    dayOffset
  ] = useFetchUpdates(updatesDispatch);

  const [membersState] = useStandupMembers();

  React.useEffect(() => {
    fetchUpdates(standupId);

    return () => {
      abortFetchUpdates();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [, snackbarDispatch] = useSnackbar();
  React.useEffect(() => {
    if (!err) {
      return;
    }

    snackbarDispatch({
      type: 'ENQUEUE_SNACKBAR_MSG',
      data: {
        type: 'error',
        title: 'Failed to fetch updates',
        text: err.details
          ? `${err.message}: ${err.details}.`
          : err.message + '.'
      }
    });
  }, [err]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchMoreUpdates = () => {
    const today = new Date();
    const year = today.getFullYear();
    const monthIndex = today.getMonth();
    const day = today.getDate();
    const pastDate = new Date(year, monthIndex, day - dayOffset);
    const pastDateDay = pastDate.getDate();
    const pastDateMonthIndex = pastDate.getMonth();
    const pastDateYear = pastDate.getFullYear();
    const dateKey = `${pastDateDay}-${pastDateMonthIndex + 1}-${pastDateYear}`;
    fetchUpdates(standupId, dateKey);
  };

  return (
    <PureUpdates
      isLoading={isFetching}
      isLoadingMore={isFetching && dayOffset > 0}
      updates={updatesState}
      members={membersState}
      fetchMoreUpdates={fetchMoreUpdates}
    />
  );
}

Updates.propTypes = {
  standupId: PropTypes.string
};

export default Updates;
