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
  text-align: center;
`;

const Wrapper = styled.div`
  margin: auto;
`;

const Text = styled.h2`
  margin: 0;
  font-weight: normal;
  color: var(--color-white);
`;

const Counter = styled(Text)`
  font-family: Menlo, monospace;
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
