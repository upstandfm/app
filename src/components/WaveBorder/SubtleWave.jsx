import React from 'react';
import styled from 'styled-components';

import subtleWave from './subtle-wave.svg';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(-65%);
  width: 100%;
`;

const Img = styled.img`
  width: 100%;
`;

function SubtleWave() {
  return (
    <Container>
      <Img src={subtleWave} alt="subtle wave border" />
    </Container>
  );
}

export default SubtleWave;
