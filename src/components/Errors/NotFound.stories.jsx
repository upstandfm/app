import React from 'react';

import NotFound from './NotFound';

export default {
  title: 'components|Errors/NotFound',
  component: NotFound,
  parameters: {
    componentSubtitle: 'Error to show when a page is not found'
  }
};

export const DefaultNotFound = () => {
  return <NotFound title="Page not found" />;
};

DefaultNotFound.story = {
  name: 'default'
};

export const InfoNotFound = () => {
  return <NotFound title="Page not found" info="This page doesn't exist." />;
};

InfoNotFound.story = {
  name: 'info'
};
