import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useInterval from './use-interval';

/***
 * Formats a number in seconds to a human readable string.
 *
 * Used format is: "MM:SS"
 *
 * @param {Number} - Number in seconds to format
 *
 * @return {String} Formatted string.
 */
const _formatTime = (sec = 0) => {
  if (!sec) {
    return '00:00';
  }

  return new Date(sec * 1e3).toISOString().substr(14, 5);
};

const Container = styled.div``;

const flash = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Icon = styled.span`
  margin: 0 0.25em 0 0;
  color: var(--color-red);
  animation: ${flash} 1.5s ease-in-out infinite;
`;

const Timer = styled.span`
  font-family: Menlo, monospace;
`;

function ProgressTimer({ maxCountSec, intervalMs, onDone }) {
  const [count, setCount] = React.useState(maxCountSec);
  const [delay, setDelay] = React.useState(intervalMs);

  useInterval(() => {
    if (count === 1) {
      setDelay(null);

      if (onDone) {
        onDone();
      }
    } else {
      setCount(count - 1);
    }
  }, delay);

  return (
    <Container>
      <Icon>
        <FontAwesomeIcon icon="circle" size="sm" />
      </Icon>

      <Timer>{_formatTime(count)}</Timer>
    </Container>
  );
}

ProgressTimer.propTypes = {
  maxCountSec: PropTypes.number.isRequired,
  intervalMs: PropTypes.number.isRequired,
  onDone: PropTypes.func
};

export default ProgressTimer;
