import React from 'react';
import { render } from '@testing-library/react';

import NotFound from './NotFound';

describe('<NotFound />', () => {
  it('renders title', () => {
    const { getByText } = render(<NotFound />);
    expect(getByText('Page not found')).toBeInTheDocument();
  });

  it('renders "home" link', () => {
    const { getByText } = render(<NotFound />);
    expect(getByText('Back to home')).toHaveAttribute('href', '/');
  });
});
