import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';

import NotFound from './NotFound';

describe('<NotFound />', () => {
  it('renders title and info', () => {
    const title = 'Not found title';
    const info = 'Some more info';
    const { getByText } = render(
      <Router>
        <NotFound title={title} info={info} />
      </Router>
    );
    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(info)).toBeInTheDocument();
  });

  it('renders "home" link', () => {
    const { getByText } = render(
      <Router>
        <NotFound title="Not found title" />
      </Router>
    );
    expect(getByText('Back home')).toHaveAttribute('href', '/');
  });
});
