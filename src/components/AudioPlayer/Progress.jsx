import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Outer = styled.div`
  position: relative;
  width: 100%;
  height: 8px;
  background-color: var(--color-lightest-purple);
  border-radius: var(--radius-size);

  :hover {
    cursor: ${props => (props.isDisabled ? 'not-allowed' : 'pointer')};
  }
`;

const Inner = styled.div.attrs(props => ({
  style: {
    width: props.percent + '%'
  }
}))`
  background: var(--color-darkest-purple);
  border-radius: var(--radius-size);
  height: 100%;
`;

export const ProgressBar = React.forwardRef((props, ref) => {
  return (
    <Outer ref={ref} isDisabled={props.isDisabled} onClick={props.handleSeek}>
      <Inner percent={props.percent} />
    </Outer>
  );
});

ProgressBar.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  handleSeek: PropTypes.func.isRequired,
  percent: PropTypes.number.isRequired
};

export const Timing = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  height: 22px;
  color: var(--color-grey);
`;

export const PlayTime = styled.time`
  justify-self: start;
`;

export const TotalTime = styled.time`
  justify-self: end;
`;
