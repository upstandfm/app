import React from 'react';
import styled from 'styled-components';

import SubtleWave from './SubtleWave';

const Section = styled.div`
  position: relative;
  margin: 4em 0 0 0;
`;

export default {
  title: 'components|WaveBorder/SubtleWave',
  component: SubtleWave,
  parameters: {
    componentSubtitle:
      'For adding a more visual distinction between content sections'
  }
};

export const DefaultWaveBorder = () => {
  return (
    <Section>
      <SubtleWave />
    </Section>
  );
};

DefaultWaveBorder.story = {
  name: 'default'
};
