import React from 'react';
import PropTypes from 'prop-types';

function Details({ standup }) {
  return (
    <div>
      <h1>{standup.standupName}</h1>
    </div>
  );
}

Details.propTypes = {
  standup: PropTypes.shape({
    standupId: PropTypes.string.isRequired,
    standupName: PropTypes.string.isRequired,
    createdAt: PropTypes.number.isRequired,
    updatedAt: PropTypes.number.isRequired
  })
};

export default Details;
