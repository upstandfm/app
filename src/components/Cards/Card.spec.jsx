import React from 'react';
import { render } from '@testing-library/react';

import Card from './Card';

describe('<Card />', () => {
  it('renders title and sets link', () => {
    const title = 'Hello world';
    const link = 'standups/1q2a3dz';

    const { getByText, getByTestId } = render(
      <Card title={title} linkTo={link} />
    );

    expect(getByText(title)).toBeInTheDocument();
    expect(getByTestId('link')).toHaveAttribute('href', `/${link}`);
  });
});
