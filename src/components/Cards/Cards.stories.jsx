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
        bgImageUrl="https://images.unsplash.com/photo-1568058828175-bf44ad92d7cf"
      />

      <Card
        linkTo="standups/2"
        title="Second card"
        bgImageUrl="https://images.unsplash.com/photo-1568069427790-346e73309008"
      />
    </Cards>
  );
};

DefaultCards.story = {
  name: 'default'
};
