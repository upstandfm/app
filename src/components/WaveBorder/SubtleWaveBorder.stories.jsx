import React from 'react';
import styled from 'styled-components';

import SubtleWaveBorder from './SubtleWaveBorder';

const Section = styled.div`
  position: relative;
  margin: 4em 0 0 0;
`;

export default {
  title: 'components|WaveBorder/SubtleWaveBorder',
  component: SubtleWaveBorder,
  parameters: {
    componentSubtitle: 'For adding visual distinction between content sections'
  }
};

export const DefaultSubtleWaveBorder = () => {
  return (
    <Section>
      <SubtleWaveBorder />
    </Section>
  );
};

DefaultSubtleWaveBorder.story = {
  name: 'default'
};
