import React from 'react';

import CardPreview from './CardPreview';

export default {
  title: 'components|Cards/CardPreview',
  component: CardPreview,
  parameters: {
    componentSubtitle: 'For displaying a non interactive <Card/> as a preview'
  }
};

export const CardPreviewWithTitle = () => {
  return <CardPreview title="A preview title" />;
};

CardPreviewWithTitle.story = {
  name: 'title'
};
