import React from 'react';
import styled from 'styled-components';

import { PureStandup } from './Standup';

export default {
  title: 'modules/Standup',
  component: PureStandup,
  parameters: {
    componentSubtitle: 'Screen that shows a single standup'
  }
};

const Container = styled.div`
  background-color: var(--color-white);
  border: 1px dashed var(--color-light-grey);
`;

export const LoadingStandup = () => {
  return (
    <Container>
      <PureStandup
        standupId="Zxz0y6f"
        urlRouteMatch=""
        isLoading={true}
        standup={{}}
      />
    </Container>
  );
};

LoadingStandup.story = {
  name: 'loading'
};
