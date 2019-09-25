import React from 'react';
import { render } from '@testing-library/react';

import NotFound from './NotFound';

describe('<NotFound />', () => {
  it('renders title and info', () => {
    const title = 'Not found title';
    const info = 'Some more info';
    const { getByText } = render(<NotFound title={title} info={info} />);
    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(info)).toBeInTheDocument();
  });

  it('renders "home" link', () => {
    const { getByText } = render(<NotFound title="Not found title" />);
    expect(getByText('Go back home')).toHaveAttribute('href', '/');
  });
});
