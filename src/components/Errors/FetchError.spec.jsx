import React from 'react';
import { render } from '@testing-library/react';

import FetchError from './FetchError';

describe('<FetchError />', () => {
  it('renders title + subtitle + hint', () => {
    const title = 'Fetch failed';
    const { getByText } = render(<FetchError title={title} />);

    expect(getByText(title)).toBeInTheDocument();

    expect(
      getByText(
        "Sorry! It looks like I couldn't fetch your data from the server."
      )
    ).toBeInTheDocument();

    expect(
      getByText('Please try again by refreshing this page.')
    ).toBeInTheDocument();
  });

  it('renders support link', () => {
    const title = 'Fetch failed';
    const { getByTestId } = render(<FetchError title={title} />);

    expect(getByTestId('support')).toHaveAttribute(
      'href',
      `mailto:support@upstand.fm?subject=${title}`
    );
  });
});
