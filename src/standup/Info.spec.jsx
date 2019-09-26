import React from 'react';
import { render } from '@testing-library/react';

import Info from './Info';

describe('<Info />', () => {
  it('renders title and settings link', () => {
    const now = Date.now();
    const standup = {
      standupId: '1',
      standupName: 'Test standup',
      createdAt: now,
      updatedAt: now
    };

    const { getByText, getByTestId } = render(<Info standup={standup} />);

    expect(getByText(standup.standupName)).toBeInTheDocument();

    // Reach Router supports relative links
    expect(getByTestId('link')).toHaveAttribute('href', '/settings');
  });
});
