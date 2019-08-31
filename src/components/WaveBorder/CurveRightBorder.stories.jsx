import React from 'react';
import styled from 'styled-components';

import CurveRightBorder from './CurveRightBorder';

const Section = styled.div`
  position: relative;
  margin: 8em 0 0 0;
`;

export default {
  title: 'components|WaveBorder/CurveRightBorder',
  component: CurveRightBorder,
  parameters: {
    componentSubtitle: 'For adding visual distinction between content sections'
  }
};

export const DefaultCurveRightBorder = () => {
  return (
    <Section>
      <CurveRightBorder />
    </Section>
  );
};

DefaultCurveRightBorder.story = {
  name: 'default'
};
