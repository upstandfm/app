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

    expect(getByTestId('full-name')).toHaveTextContent(data.fullName);
    expect(getByTestId('email')).toHaveTextContent(data.email);

    const logout = getByText('Logout');
    fireEvent.click(logout);
    expect(data.logout).toHaveBeenCalledTimes(1);

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="sc-bdVaJa EXKLM"
      >
        <button
          aria-label="click here to see your profile or logout"
          class="sc-bwzfXH gaWtRt"
        >
          <img
            alt="user avatar"
            class="sc-gzVnrw ktcMRg"
            data-testid="avatar"
            src="https://media.upstand.fm/avatars/1w4fg6y9o.png"
          />
        </button>
        <ul
          class="sc-htpNat itrkKD"
        >
          <li
            class="sc-bxivhb iBDSPm"
          >
            <span
              class="sc-ifAKCX iMedxY"
              data-testid="full-name"
            >
              Test User
            </span>
            <span
              class="sc-ifAKCX bVKKIO"
              data-testid="email"
            >
              test-user@upstand.fm
            </span>
          </li>
          <div
            class="sc-bZQynM fmdPDK"
          />
          <li
            class="sc-bxivhb fZyTNt"
            role="button"
            tabindex="0"
          >
            Logout
          </li>
        </ul>
      </div>
    `);
  });
});
