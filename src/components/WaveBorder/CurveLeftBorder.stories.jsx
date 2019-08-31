import React from 'react';
import styled from 'styled-components';

import CurveLeftBorder from './CurveLeftBorder';

const Section = styled.div`
  position: relative;
  margin: 8em 0 0 0;
`;

export default {
  title: 'components|WaveBorder/CurveLeftBorder',
  component: CurveLeftBorder,
  parameters: {
    componentSubtitle: 'For adding visual distinction between content sections'
  }
};

export const DefaultCurveLeftBorder = () => {
  return (
    <Section>
      <CurveLeftBorder />
    </Section>
  );
};

DefaultCurveLeftBorder.story = {
  name: 'default'
};
