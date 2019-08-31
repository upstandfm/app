import React from 'react';
import styled from 'styled-components';

import CurveLeft from './CurveLeft';

const Section = styled.div`
  position: relative;
  margin: 8em 0 0 0;
`;

export default {
  title: 'components/CurveLeft',
  component: CurveLeft,
  parameters: {
    componentSubtitle:
      'For adding a more visual distinction between content sections'
  }
};

export const DefaultWaveBorder = () => {
  return (
    <Section>
      <CurveLeft />
    </Section>
  );
};

DefaultWaveBorder.story = {
  name: 'default'
};
