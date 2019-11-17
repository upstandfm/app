import React from 'react';

import Cards from './Cards';
import Card from './Card';

export default {
  title: 'components|Cards/Cards',
  component: Cards,
  parameters: {
    componentSubtitle: 'For displaying <Card/> components in a grid'
  }
};

export const DefaultCards = () => {
  return (
    <Cards>
      <Card
        linkTo="standups/1"
        title="First card with a very long title and stuff"
      />

      <Card linkTo="standups/2" title="Second card" />
    </Cards>
  );
};

DefaultCards.story = {
  name: 'default'
};
