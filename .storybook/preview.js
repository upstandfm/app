import React from 'react';
import { addDecorator } from '@storybook/react';
import styled from 'styled-components';
import { withA11y } from '@storybook/addon-a11y';

import '../src/global.css';
import '../src/icons';
import './override.css';

const Container = styled.div`
  padding: 1em;
`;

addDecorator(storyFn => {
  return <Container>{storyFn()}</Container>;
});

addDecorator(withA11y);
