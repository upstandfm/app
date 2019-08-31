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
        class="sc-dnqmqq hHLyWY"
      >
        <button
          aria-label="click here to find out more about the app"
          class="sc-iwsKbI UcRNw"
        >
          <div
            class="sc-jzJRlG xdtnU"
            data-testid="info"
          >
            ?
          </div>
        </button>
        <ul
          class="sc-gZMcBi gNqGMa"
        >
          <li
            class="sc-gqjmRU FMMKS"
            role="button"
            tabindex="0"
          >
            <a
              class="sc-jTzLTM jjIlLg"
              href=""
              rel="noopener noreferrer"
              target="_blank"
            >
              What's new?
            </a>
          </li>
          <li
            class="sc-gqjmRU FMMKS"
            role="button"
            tabindex="0"
          >
            <a
              class="sc-jTzLTM jjIlLg"
              href=""
              rel="noopener noreferrer"
              target="_blank"
            >
              Help
            </a>
          </li>
          <li
            class="sc-gqjmRU FMMKS"
            role="button"
            tabindex="0"
          >
            <a
              class="sc-jTzLTM jjIlLg"
              href=""
              rel="noopener noreferrer"
              target="_blank"
            >
              Privacy & terms
            </a>
          </li>
          <div
            class="sc-fjdhpX gxfFsG"
          />
          <li
            class="sc-gqjmRU FMMKS"
            role="button"
            tabindex="0"
          >
            <a
              class="sc-jTzLTM jjIlLg"
              href="mailto:hi@upstand.fm?subject=Hi there!"
              rel="noopener noreferrer"
              target="_blank"
            >
              Say hi!
            </a>
          </li>
          <li
            class="sc-gqjmRU FMMKS"
            role="button"
            tabindex="0"
          >
            <a
              class="sc-jTzLTM jjIlLg"
              href="https://danillouz.dev"
              rel="noopener noreferrer"
              target="_blank"
            >
              About
            </a>
          </li>
          <li
            class="sc-gqjmRU FMMKS"
            role="button"
            tabindex="0"
          >
            <a
              class="sc-jTzLTM jjIlLg"
              href="https://blog.danillouz.dev"
              rel="noopener noreferrer"
              target="_blank"
            >
              Blog
            </a>
          </li>
          <div
            class="sc-fjdhpX gxfFsG"
          />
          <li
            class="sc-gqjmRU FMMKS"
            role="button"
            tabindex="0"
          >
            <a
              class="sc-jTzLTM jjIlLg"
              href="https://github.com/upstandfm"
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub
            </a>
          </li>
          <li
            class="sc-gqjmRU FMMKS"
            role="button"
            tabindex="0"
          >
            <a
              class="sc-jTzLTM jjIlLg"
              href="https://storybook.upstand.fm"
              rel="noopener noreferrer"
              target="_blank"
            >
              Storybook
            </a>
          </li>
          <li
            class="sc-gqjmRU FMMKS"
            role="button"
            tabindex="0"
          >
            <a
              class="sc-jTzLTM jjIlLg"
              href="https://twitter.com/danillouz"
              rel="noopener noreferrer"
              target="_blank"
            >
              Twitter
            </a>
          </li>
          <div
            class="sc-fjdhpX gxfFsG"
          />
          <li
            class="sc-gqjmRU hkoqfC"
            tabindex="-1"
          >
            <span
              class="sc-VigVT jRsTOZ"
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
