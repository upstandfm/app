import React from 'react';
import PropTypes from 'prop-types';

import { LoadingCards, LoadingCard, Cards, Card } from '../components/Cards';
import { FetchError } from '../components/Errors';

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

export default function Standups() {
  return null;
}
