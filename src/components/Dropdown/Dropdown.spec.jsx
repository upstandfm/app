import React from 'react';

import { render } from '../../test-utils';

import { List } from './Dropdown';

describe('Dropdown', () => {
  describe('<List />', () => {
    it('hides list by default', () => {
      const { getByTestId } = render(<List data-testid="list" />);

      expect(getByTestId('list')).toHaveStyle(`
        visibility: hidden;
      `);
    });

    it('prop "isOpen" shows list', () => {
      const { getByTestId } = render(<List data-testid="list" isOpen />);

      expect(getByTestId('list')).toHaveStyle(`
        visibility: visible;
      `);
    });
  });
});
