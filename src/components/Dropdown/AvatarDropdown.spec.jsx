import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import AvatarDropdown from './AvatarDropdown';

describe('<AvatarDropdown />', () => {
  it('renders avatar, full name, email and logout button', () => {
    const data = {
      logout: jest.fn(),
      avatarUrl: 'https://media.upstand.fm/avatars/1w4fg6y9o.png',
      fullName: 'Test User',
      email: 'test-user@upstand.fm'
    };
    const { container, getByTestId, getByText } = render(
      <AvatarDropdown {...data} />
    );

    const avatar = getByTestId('avatar');
    expect(avatar).toHaveAttribute('src', data.avatarUrl);
    expect(avatar).toHaveAttribute('alt', 'user avatar');

    expect(getByTestId('email')).toHaveTextContent(data.email);

    const logout = getByText('Logout');
    fireEvent.click(logout);
    expect(data.logout).toHaveBeenCalledTimes(1);
  });
});
