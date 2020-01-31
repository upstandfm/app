import React from 'react';
import styled from 'styled-components';

import { PureSettings } from './Settings';

export default {
  title: 'modules/Settings',
  component: PureSettings,
  parameters: {
    componentSubtitle: 'Screen that shows settings'
  }
};

const Container = styled.div`
  background-color: var(--color-white);
  border: 1px dashed var(--color-light-grey);
`;

export const LoadingStandup = () => {
  return (
    <Container>
      <PureSettings urlRouteMatch="">Child components</PureSettings>
    </Container>
  );
};

LoadingStandup.story = {
  name: 'default'
};
