import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Outer = styled.div`
  position: relative;
  width: 100%;
  height: 8px;
  background-color: var(--color-lightest-purple);
  border-radius: 3px;

  :hover {
    cursor: pointer;
  }
`;

const Inner = styled.div`
  background: var(--color-purple);
  width: ${props => props.percent + '%'};
  height: 100%;
  border-radius: 3px;
`;

export const ProgressBar = React.forwardRef((props, ref) => {
  return (
    <Outer ref={ref} onClick={props.handleSeek}>
      <Inner percent={props.percent} />
    </Outer>
  );
});

ProgressBar.propTypes = {
  handleSeek: PropTypes.func.isRequired,
  percent: PropTypes.number.isRequired
};

export const Timing = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
`;

export const PlayTime = styled.span`
  justify-self: start;
`;

export const TotalTime = styled.span`
  justify-self: end;
`;
