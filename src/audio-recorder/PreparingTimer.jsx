import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import useInterval from './use-interval';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  background-color: rgba(229, 62, 62, 0.8);
  border-radius: 8px;
  text-align: center;
`;

const Wrapper = styled.div`
  margin: auto;
`;

const Text = styled.h2`
  font-weight: normal;
  margin: 0;
  color: var(--color-white);
`;

const Counter = styled.h1`
  margin: 0;
  color: var(--color-white);
  font-family: Menlo, monospace;
  font-weight: normal;
`;

function PreparingTimer({ maxCountSec, intervalMs, onDone }) {
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
      <Wrapper>
        <Text>Recording in..</Text>

        <Counter>{count}</Counter>
      </Wrapper>
    </Container>
  );
}

PreparingTimer.propTypes = {
  maxCountSec: PropTypes.number.isRequired,
  intervalMs: PropTypes.number.isRequired,
  onDone: PropTypes.func
};

export default PreparingTimer;
