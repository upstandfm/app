import React from 'react';

import { render } from '../../test-utils';
import theme from '../../theme';

import Button from './Button';

describe('<Button />', () => {
  it('no props renders correct theme colors', () => {
    const { getByTestId } = render(<Button data-testid="btn">test</Button>);

    expect(getByTestId('btn')).toHaveStyle(`
      background-color: ${theme.primaryColor};
      color: ${theme.textColor};
      border: none;
    `);
  });

  it('prop "invertTextColor" renders correct theme colors', () => {
    const { getByTestId } = render(
      <Button data-testid="btn" invertTextColor>
        test
      </Button>
    );

    expect(getByTestId('btn')).toHaveStyle(`
      background-color: ${theme.primaryColor};
      color: ${theme.invertedTextColor};
      border: none;
    `);
  });

  it('prop "common" renders correct theme colors', () => {
    const { getByTestId } = render(
      <Button data-testid="btn" common>
        test
      </Button>
    );

    expect(getByTestId('btn')).toHaveStyle(`
      background-color: #ffffff;
      color: ${theme.textColor};
      border: 1px solid ${theme.accentColor};
    `);
  });

  it('prop "danger" renders correct theme colors', () => {
    const { getByTestId } = render(
      <Button data-testid="btn" danger>
        test
      </Button>
    );

    expect(getByTestId('btn')).toHaveStyle(`
      background-color: ${theme.dangerColor};
      color: ${theme.textColor};
      border: none;
    `);
  });
});
