import React from 'react';
import styled from 'styled-components';

import { PureChannel } from './Channel';

export default {
  title: 'modules/Channel',
  component: PureChannel,
  parameters: {
    componentSubtitle: 'Screen that shows a single channel'
  }
};

const Container = styled.div`
  border: 1px dashed var(--color-light-grey);
`;

export const LoadingChannel = () => {
  return (
    <Container>
      <PureChannel
        channelId="Zxz0y6f"
        urlRouteMatch=""
        isLoading={true}
        channel={{}}
      />
    </Container>
  );
};

LoadingChannel.story = {
  name: 'loading'
};
