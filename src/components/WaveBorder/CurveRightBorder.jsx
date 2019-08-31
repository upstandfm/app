import React from 'react';
import styled from 'styled-components';

import curveRight from './curve-right.svg';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(-80%);
  width: 100%;
`;

const Img = styled.img`
  width: 100%;
`;

function CurveRightBorder() {
  return (
    <Container>
      <Img src={curveRight} alt="curve right wave border" />
    </Container>
  );
}

export default CurveRightBorder;
