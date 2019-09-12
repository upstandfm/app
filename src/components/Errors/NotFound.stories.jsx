import React from 'react';

import NotFound from './NotFound';

export default {
  title: 'components|errors/NotFound',
  component: NotFound,
  parameters: {
    componentSubtitle: 'Error to show when a page is not found'
  }
};

export const DefaultNotFound = () => {
  return <NotFound />;
};

DefaultNotFound.story = {
  name: 'default'
};
