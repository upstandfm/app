import React from 'react';
import PropTypes from 'prop-types';

import { useSnackbar } from '../components/Snackbar';

import { useStandupMembers } from './StandupMembersContext';
import useFetchStandupMembers from './use-fetch-standup-members';

export function PureStandupMembers({ isLoading, members }) {
  if (isLoading) {
    // TODO: create loading skeleton
    return <p>loading..</p>;
  }

  return (
    <ul>
      {members.map(member => {
        return <li key={member.userId}>{member.userId}</li>;
      })}
    </ul>
  );
}

PureStandupMembers.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  members: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.string.isRequired
    })
  )
};

function StandupMembers({ standupId }) {
  const [membersState, membersDispatch] = useStandupMembers();

  const [
    fetchMembers,
    abortFetchMembers,
    isFetching,
    err
  ] = useFetchStandupMembers(membersDispatch);

  const [, snackbarDispatch] = useSnackbar();

  React.useEffect(() => {
    fetchMembers(standupId);

    return () => {
      abortFetchMembers();
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
        title: 'Failed to fetch standup members',
        text: err.details
          ? `${err.message}: ${err.details}.`
          : err.message + '.'
      }
    });
  }, [err]); // eslint-disable-line react-hooks/exhaustive-deps

  return <PureStandupMembers isLoading={isFetching} members={membersState} />;
}

StandupMembers.propTypes = {
  standupId: PropTypes.string
};

export default StandupMembers;
