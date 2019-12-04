import React from 'react';
import styled from 'styled-components';

import { PureStandup } from './Standup';

const Header = styled.div`
  height: 55px;
`;

export default {
  title: 'screens|Standup',
  component: PureStandup,
  parameters: {
    componentSubtitle: 'Screen that shows a single standup'
  }
};

export const LoadingStandups = () => {
  return (
    <>
      <Header />
      <PureStandup isLoading={true} standup={{}} />
    </>
  );
};

LoadingStandups.story = {
  name: 'loading'
};
