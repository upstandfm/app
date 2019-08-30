import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import styled, { ThemeProvider } from 'styled-components';
import { withA11y } from '@storybook/addon-a11y';

import '../src/global.css';

import theme from '../src/theme';

const Container = styled.div`
  height: 100vh;
  display: grid;
  background-color: ${props => props.theme.secondaryBackgroundColor};
`;

const Center = styled.div`
  margin: auto;
`;

addDecorator(storyFn => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Center>{storyFn()}</Center>
      </Container>
    </ThemeProvider>
  );
});

addDecorator(withA11y);

configure(require.context('../src/', true, /\.stories\.(js|jsx|mdx)$/), module);
