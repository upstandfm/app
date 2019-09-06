import React from 'react';
import { configure, addDecorator, addParameters } from '@storybook/react';
import styled, { ThemeProvider } from 'styled-components';
import { withA11y } from '@storybook/addon-a11y';

import '../src/global.css';
import '../src/icons';

import theme from '../src/theme';

import sbTheme from './theme';

const Container = styled.div`
  padding: 1em;
`;

addDecorator(storyFn => {
  return (
    <ThemeProvider theme={theme}>
      <Container>{storyFn()}</Container>
    </ThemeProvider>
  );
});

addDecorator(withA11y);

addParameters({
  options: {
    theme: sbTheme
  }
});

configure(require.context('../src/', true, /\.stories\.(js|jsx|mdx)$/), module);
