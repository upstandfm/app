import React from 'react';
import { render } from '@testing-library/react';
import Copyright from './Copyright';

describe('<Copyright />', () => {
  it('renders correct year and name', () => {
    const { getByText } = render(<Copyright />);
    const year = new Date().getFullYear();
    const txt = `© ${year} Upstand FM`;
    expect(getByText(txt)).toBeDefined();
  });
});
