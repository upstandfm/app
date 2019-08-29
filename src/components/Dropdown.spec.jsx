import React from 'react';

import { render } from '../test-utils';
import theme from '../theme';

import { List } from './Dropdown';

describe('Dropdown', () => {
  describe('<List />', () => {
    it('renders correct theme colors', () => {
      const { getByTestId } = render(<List data-testid="list" />);

      expect(getByTestId('list')).toHaveStyle(`
        border: 1px solid ${theme.accentColor};
      `);
    });

    it('hides list by default', () => {
      const { getByTestId } = render(<List data-testid="list" />);

      expect(getByTestId('list')).toHaveStyle(`
        opacity: 0;
      `);
    });

    it('prop "isOpen" shows list', () => {
      const { getByTestId } = render(<List data-testid="list" isOpen />);

      expect(getByTestId('list')).toHaveStyle(`
        opacity: 1;
      `);
    });

    it('props "top", "right", "bottom" and "left" adjust positioning', () => {
      const pos = {
        top: '1px',
        right: '1px',
        bottom: '1px',
        left: '1px'
      };
      const { getByTestId } = render(<List data-testid="list" {...pos} />);

      expect(getByTestId('list')).toHaveStyle(`
        top: ${pos.top};
        right: ${pos.right};
        bottom: ${pos.bottom};
        left: ${pos.left};
      `);
    });
  });
});
