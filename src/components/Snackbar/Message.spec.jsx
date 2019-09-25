import React from 'react';
import { render } from '@testing-library/react';

import { PureMessage } from './Message';

describe('<PureMessage />', () => {
  it('renders title and text', () => {
    const msg = {
      id: '1',
      title: 'Test message',
      text: 'This is a test message.'
    };

    const { getByText } = render(
      <PureMessage index={0} message={msg} queuedCount={0} />
    );

    expect(getByText(msg.title)).toBeInTheDocument();
    expect(getByText(msg.text)).toBeInTheDocument();
  });

  it('renders queued messages count', () => {
    const msg = {
      id: '1',
      title: 'Test message',
      text: 'This is a test message.'
    };
    const queuedCount = 3;

    const { getByText } = render(
      <PureMessage index={0} message={msg} queuedCount={queuedCount} />
    );

    expect(getByText(`+${queuedCount} message(s) queued`)).toBeInTheDocument();
  });
});
