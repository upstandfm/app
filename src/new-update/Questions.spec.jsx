import React from 'react';
import { render } from '@testing-library/react';

import { Question } from './Questions';

describe('<Question />', () => {
  it('renders title by default', () => {
    const title = 'This is a title';
    const subtitle = 'This is a subtitle.';

    const { getByText, queryByText } = render(
      <Question title={title} subtitle={subtitle} />
    );

    expect(getByText(title)).toBeInTheDocument();
    expect(queryByText(subtitle)).not.toBeInTheDocument();
  });

  it('renders subtitle when active', () => {
    const title = 'This is a title';
    const subtitle = 'This is a subtitle.';

    const { getByText } = render(
      <Question isActive={true} title={title} subtitle={subtitle} />
    );

    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(subtitle)).toBeInTheDocument();
  });
});
