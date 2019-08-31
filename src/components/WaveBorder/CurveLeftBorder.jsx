import React from 'react';
import styled from 'styled-components';

import curveLeft from './curve-left.svg';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(-77%);
  width: 100%;
`;

const Img = styled.img`
  width: 100%;
`;

function CurveLeftBorder() {
  return (
    <Container>
      <Img src={curveLeft} alt="curve left wave border" />
    </Container>
  );
}

export default CurveLeftBorder;
