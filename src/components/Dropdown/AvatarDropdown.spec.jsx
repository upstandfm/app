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
          class="sc-bwzfXH gKJrum"
        >
          <img
            alt="user avatar"
            class="sc-bZQynM fBZhpA"
            data-testid="avatar"
            src="https://media.upstand.fm/avatars/1w4fg6y9o.png"
          />
           
          <svg
            aria-hidden="true"
            class="svg-inline--fa fa-chevron-down fa-w-14 fa-sm "
            data-icon="chevron-down"
            data-prefix="fas"
            focusable="false"
            role="img"
            viewBox="0 0 448 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
              fill="currentColor"
            />
          </svg>
        </button>
        <ul
          class="sc-htpNat gxrzLu"
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
