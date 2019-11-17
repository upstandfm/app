import React from 'react';

import Card from './Card';

export default {
  title: 'components|Cards/Card',
  component: Card,
  parameters: {
    componentSubtitle: 'For displaying primary grid item content'
  }
};

export const CardWithTitleAndLink = () => {
  return (
    <ul>
      <Card linkTo="standups/1" title="Team awesome and nice people" />
    </ul>
  );
};

CardWithTitleAndLink.story = {
  name: 'linkTo + title'
};
