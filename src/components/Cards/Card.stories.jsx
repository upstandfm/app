import React from 'react';

import Card from './Card';

export default {
  title: 'components|Cards/Card',
  component: Card,
  parameters: {
    componentSubtitle: 'For displaying primary grid item content'
  }
};

export const CardWithNameAndLink = () => {
  return (
    <ul>
      <Card linkTo="standups/1" title="Team awesome and nice people" />
    </ul>
  );
};

CardWithNameAndLink.story = {
  name: 'linkTo + title'
};

export const CardWithBgImage = () => {
  return (
    <ul>
      <Card
        linkTo="standups/2"
        title="Team donut"
        bgImageUrl="https://images.unsplash.com/photo-1568027867737-cedfbcb5e98a"
      />
    </ul>
  );
};

CardWithBgImage.story = {
  name: 'linkTo + title + bgImageUrl'
};
