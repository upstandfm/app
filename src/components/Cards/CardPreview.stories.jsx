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

export const CardPreviewWithBgImage = () => {
  return (
    <CardPreview
      title="A preview title"
      bgImageUrl="https://images.unsplash.com/photo-1568027867737-cedfbcb5e98a"
    />
  );
};

CardPreviewWithBgImage.story = {
  name: 'title + bgImageUrl'
};
