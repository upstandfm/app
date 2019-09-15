import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '@reach/router';

import { getStandupsList } from './selectors';

import { LoadingCards, LoadingCard, Cards, Card } from '../components/Cards';
import { FetchError } from '../components/Errors';
import Button from '../components/Button';

import Empty from './Empty';

export function PureStandups({ isLoading, err, standups }) {
  if (isLoading) {
    return (
      <LoadingCards>
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
      </LoadingCards>
    );
  }

  if (err) {
    return <FetchError title="Failed to load standups" err={err} />;
  }

  if (standups.length === 0) {
    return <Empty title="You don't have any standups yet" />;
  }

  return (
    <Cards>
      {standups.map(standup => {
        const { id } = standup;
        return (
          <Card
            key={id}
            linkTo={id}
            title={standup.name}
            bgImageUrl={standup.imageUrl}
          />
        );
      })}
    </Cards>
  );
}

PureStandups.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  err: PropTypes.string,
  standups: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string
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

export default function Standups() {
  // TODO: fetch standups
  const standups = getStandupsList({});

  return (
    <Container>
      <Actions>
        <Button as={Link} to="/new">
          New standup
        </Button>
      </Actions>

      <Main>
        <PureStandups isLoading={false} standups={standups} />
      </Main>
    </Container>
  );
}
