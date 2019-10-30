import React from 'react';
import PropTypes from 'prop-types';

import { useSnackbar } from '../components/Snackbar';

import { Container, Title } from './Layout';
import { Members, Member, RestCount } from './Members';

import { useStandupMembers } from './StandupMembersContext';
import useFetchStandupMembers from './use-fetch-standup-members';
import { getFullNameInitials } from './utils';

export function PureStandupMembers({ isLoading, members, maxCount }) {
  if (isLoading) {
    // TODO: create loading skeleton
    return <p>loading..</p>;
  }

  const membersToShow = members.slice(0, maxCount);
  const restCount = members.length - maxCount;

  return (
    <Container>
      <Title>MEMBERS</Title>

      <Members>
        {restCount > 0 && <RestCount count={restCount} />}

        {membersToShow.map(member => {
          return (
            <Member
              key={member.userId}
              title={member.fullName}
              initials={getFullNameInitials(member.fullName)}
              avatarUrl={member.avatarUrl}
            />
          );
        })}
      </Members>
    </Container>
  );
}

PureStandupMembers.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  members: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.string.isRequired,
      fullName: PropTypes.string,
      avatarUrl: PropTypes.string
    })
  ),
  maxCount: PropTypes.number.isRequired
};

PureStandupMembers.defaultProps = {
  maxCount: 5
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
  standupId: PropTypes.string.isRequired
};

export default StandupMembers;
