import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import InfoDropdown from './InfoDropdown';

describe('<InfoDropdown />', () => {
  it('clicking on info shows the list', () => {
    const { container, getByTestId } = render(<InfoDropdown />);

    const btn = getByTestId('info');
    fireEvent.click(btn);

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="sc-bdVaJa EXKLM"
      >
        <button
          class="sc-bwzfXH fwseSd"
        >
          <div
            class="sc-jzJRlG ghnVpa"
            data-testid="info"
          >
            ?
          </div>
        </button>
        <ul
          class="sc-htpNat YshEA"
        >
          <li
            class="sc-bxivhb fEiFpP"
          >
            <a
              class="sc-EHOje dlBFvZ"
              href=""
              rel="noopener noreferrer"
              target="_blank"
            >
              What's new?
            </a>
          </li>
          <li
            class="sc-bxivhb fEiFpP"
          >
            <a
              class="sc-EHOje dlBFvZ"
              href=""
              rel="noopener noreferrer"
              target="_blank"
            >
              Help
            </a>
          </li>
          <li
            class="sc-bxivhb fEiFpP"
          >
            <a
              class="sc-EHOje dlBFvZ"
              href=""
              rel="noopener noreferrer"
              target="_blank"
            >
              Privacy & terms
            </a>
          </li>
          <div
            class="sc-bZQynM bncdIP"
          />
          <li
            class="sc-bxivhb fEiFpP"
          >
            <a
              class="sc-EHOje dlBFvZ"
              href="mailto:hi@upstand.fm?subject=Hi there!"
              rel="noopener noreferrer"
              target="_blank"
            >
              Say hi!
            </a>
          </li>
          <li
            class="sc-bxivhb fEiFpP"
          >
            <a
              class="sc-EHOje dlBFvZ"
              href="https://danillouz.dev"
              rel="noopener noreferrer"
              target="_blank"
            >
              About
            </a>
          </li>
          <div
            class="sc-bZQynM bncdIP"
          />
          <li
            class="sc-bxivhb fEiFpP"
          >
            <a
              class="sc-EHOje dlBFvZ"
              href="https://blog.danillouz.dev"
              rel="noopener noreferrer"
              target="_blank"
            >
              Blog
            </a>
          </li>
          <li
            class="sc-bxivhb fEiFpP"
          >
            <a
              class="sc-EHOje dlBFvZ"
              href="https://github.com/upstandfm"
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub
            </a>
          </li>
          <li
            class="sc-bxivhb fEiFpP"
          >
            <a
              class="sc-EHOje dlBFvZ"
              href="https://twitter.com/danillouz"
              rel="noopener noreferrer"
              target="_blank"
            >
              Twitter
            </a>
          </li>
          <div
            class="sc-bZQynM bncdIP"
          />
          <li
            class="sc-bxivhb fxXJup"
          >
            <span
              class="sc-ifAKCX hmSwGL"
            >
              <span>
                © 
                2019
                 Upstand FM
              </span>
            </span>
          </li>
        </ul>
      </div>
    `);
  });
});
