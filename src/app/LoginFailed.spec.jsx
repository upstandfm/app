import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import LoginFailed from './LoginFailed';

describe('<LoginFailed />', () => {
  it('renders title and subtitle', () => {
    const { getByText } = render(<LoginFailed />);

    expect(getByText('Login failed')).toBeInTheDocument();
    expect(getByText('Something went wrong on our end.')).toBeInTheDocument();
  });

  it('renders error message', () => {
    const errMessage = 'Error: Invalid state';

    const { getByTestId } = render(<LoginFailed errMessage={errMessage} />);

    expect(getByTestId('login-failed-err')).toHaveTextContent(errMessage);
  });

  it('renders "try again" button', () => {
    const { getByText } = render(<LoginFailed />);

    const tryAgainButton = getByText('Login again');
    expect(tryAgainButton).toBeInTheDocument();
    expect(tryAgainButton).toHaveAttribute('aria-label', 'login again');
  });

  it('calls "handleRetry" callback when "try again" button is clicked', () => {
    const handleRetry = jest.fn();
    const { getByText } = render(<LoginFailed handleRetry={handleRetry} />);

    const tryAgainButton = getByText('Login again');
    fireEvent.click(tryAgainButton);

    expect(handleRetry).toHaveBeenCalledTimes(1);
  });

  it('renders "email support link"', () => {
    const { getByText } = render(<LoginFailed />);

    const supportLink = getByText('support@upstand.fm');
    expect(supportLink).toHaveAttribute(
      'href',
      'mailto:support@upstand.fm?subject=Login error'
    );
    expect(supportLink).toHaveAttribute('target', '_blank');
    expect(supportLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
