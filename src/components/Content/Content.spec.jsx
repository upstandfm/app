import React from 'react';

import { render } from '../../test-utils';
import theme from '../../theme';

import Content from './Content';

describe('<Content />', () => {
  it('renders correct theme colors', () => {
    const { getByText } = render(
      <Content title="title" subtitle="subtitle">
        main text
      </Content>
    );

    expect(getByText('main text')).toHaveStyle(`
      color: ${theme.textColor};
    `);
  });
});
