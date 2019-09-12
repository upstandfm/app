import React from 'react';

import FetchError from './FetchError';

export default {
  title: 'components|errors/FetchError',
  component: FetchError,
  parameters: {
    componentSubtitle: 'Error to show when fetching a data resource fails'
  }
};

export const DefaultFetchError = () => {
  return <FetchError title="Failed to load data" />;
};

DefaultFetchError.story = {
  name: 'default'
};
