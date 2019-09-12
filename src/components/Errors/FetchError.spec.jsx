import React from 'react';
import { render } from '@testing-library/react';

import FetchError from './FetchError';

describe('<FetchError />', () => {
  it('renders title + hint', () => {
    const title = 'Fetch failed';
    const { getByText } = render(<FetchError title={title} />);

    expect(getByText(title)).toBeInTheDocument();

    expect(
      getByText('Please try again by refreshing this page.')
    ).toBeInTheDocument();
  });

  it('renders support link', () => {
    const title = 'Fetch failed';
    const { getByText } = render(<FetchError title={title} />);

    expect(getByText('support@upstand.fm')).toHaveAttribute(
      'href',
      `mailto:support@upstand.fm?subject=${title}`
    );
  });
});
