import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { LoadingCards, LoadingCard, Cards, Card } from '../components/Cards';
import Button from '../components/Button';
import { useSnackbar } from '../components/Snackbar';
import Empty from './Empty';
import standupsReducer from './reducer';
import useFetchStandups from './use-fetch-standups';

const LoadMore = styled.div`
  display: grid;
  margin: 3em 0 0 0;
`;

export function PureStandups({ isLoading, cursor, fetchNextPage, standups }) {
  if (isLoading && !cursor) {
    return (
      <LoadingCards>
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
      </LoadingCards>
    );
  }

  if (standups.length === 0) {
    return <Empty title="No standups to show.." />;
  }

  const handleLoadMore = () => {
    fetchNextPage(cursor);
  };

  return (
    <>
      <Cards>
        {standups.map(standup => {
          const { standupId, standupName, standupImageUrl } = standup;
          return (
            <Card
              key={standupId}
              linkTo={standupId}
              title={standupName}
              bgImageUrl={standupImageUrl}
            />
          );
        })}
      </Cards>

      {cursor && (
        <LoadMore>
          <Button tertiary disabled={isLoading} onClick={handleLoadMore}>
            {isLoading ? (
              <>
                <FontAwesomeIcon icon="circle-notch" size="sm" spin /> Loading..
              </>
            ) : (
              'Load more'
            )}
          </Button>
        </LoadMore>
      )}
    </>
  );
}

PureStandups.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  cursor: PropTypes.string,
  fetchNextPage: PropTypes.func.isRequired,
  standups: PropTypes.arrayOf(
    PropTypes.shape({
      standupId: PropTypes.string.isRequired,
      standupName: PropTypes.string.isRequired,
      standupImageUrl: PropTypes.string
    })
  )
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  grid-gap: 1em;
  align-items: center;
  padding: 1em;
`;

const Actions = styled.div`
  display: grid;
  justify-items: end;
  padding: 2em 0;

  @media (max-width: 470px) {
    justify-items: center;
    padding: 1em 0;
  }
`;

const Main = styled.div``;

const PAGE_LIMIT = 12;

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
    <Container>
      <Actions>
        <Button as={Link} to="/new">
          New standup
        </Button>
      </Actions>

      <Main>
        <PureStandups
          isLoading={isFetching}
          cursor={nextPageCursor}
          fetchNextPage={fetchNextPage}
          standups={standupsState}
        />
      </Main>
    </Container>
  );
}

export default Standups;
