import React from 'react';

import { render } from '../test-utils';
import theme from '../theme';

import { ContentSection } from './Content';

describe('<ContentSection />', () => {
  it('renders correct theme colors', () => {
    const { getByTestId } = render(<ContentSection data-testid="section" />);

    expect(getByTestId('section')).toHaveStyle(`
      color: ${theme.textColor};
    `);
  });
});
