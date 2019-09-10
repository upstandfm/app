import React from 'react';
import PropTypes from 'prop-types';

import { Cards, Card } from '../components/Cards';

export function PureStandups({ isLoading, err, standups }) {
  if (isLoading) {
    return <div>loading..</div>;
  }

  if (err) {
    return <div>error: {err}</div>;
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
