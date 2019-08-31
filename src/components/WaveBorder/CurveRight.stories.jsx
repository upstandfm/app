import React from 'react';
import styled from 'styled-components';

import CurveRight from './CurveRight';

const Section = styled.div`
  position: relative;
  margin: 8em 0 0 0;
`;

export default {
  title: 'components/CurveRight',
  component: CurveRight,
  parameters: {
    componentSubtitle:
      'For adding a more visual distinction between content sections'
  }
};

export const DefaultWaveBorder = () => {
  return (
    <Section>
      <CurveRight />
    </Section>
  );
};

DefaultWaveBorder.story = {
  name: 'default'
};
