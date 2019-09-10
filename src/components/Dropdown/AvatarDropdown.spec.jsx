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
          aria-expanded="false"
          aria-haspopup="true"
          class="sc-bwzfXH fPqriT"
        >
          <img
            alt="user avatar"
            class="sc-bZQynM eTYoVy"
            data-testid="avatar"
            src="https://media.upstand.fm/avatars/1w4fg6y9o.png"
          />
        </button>
        <ul
          class="sc-htpNat huBKey"
          role="menu"
        >
          <li
            class="sc-bxivhb eqXfcB"
          >
            <span
              class="sc-ifAKCX leGXiY"
              data-testid="full-name"
            >
              Test User
            </span>
            <span
              class="sc-ifAKCX dJomen"
              data-testid="email"
            >
              test-user@upstand.fm
            </span>
          </li>
          <div
            class="sc-EHOje kSJuOY"
          />
          <li
            class="sc-bxivhb eqXfcB"
          >
            <button
              class="sc-gzVnrw gqnRcH"
              role="menuitem"
              tabindex="-1"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    `);
  });
});
