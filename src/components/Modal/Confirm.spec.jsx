import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Confirm from './Confirm';

describe('<Confirm />', () => {
  it('does not render modal when not showed', () => {
    const props = {
      show: false,
      title: 'Are you sure?',
      message: "There's no going back!",
      handleCancel: () => undefined,
      handleConfirm: () => undefined
    };
    const { queryByTestId } = render(<Confirm {...props} />);
    expect(queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('renders title and message when showed', () => {
    const props = {
      show: true,
      title: 'Are you sure?',
      message: "There's no going back!",
      handleCancel: () => undefined,
      handleConfirm: () => undefined
    };
    const { getByText } = render(<Confirm {...props} />);
    expect(getByText(props.title)).toBeInTheDocument();
    expect(getByText(props.message)).toBeInTheDocument();
  });

  it('renders cancel button when showed, and calls handler when clicked', () => {
    const props = {
      show: true,
      title: 'Are you sure?',
      message: "There's no going back!",
      handleCancel: jest.fn(),
      handleConfirm: () => undefined
    };
    const { getByText } = render(<Confirm {...props} />);
    const cancel = getByText('No, cancel');
    fireEvent.click(cancel);
    expect(props.handleCancel).toHaveBeenCalledTimes(1);
  });

  it('calls cancel handler when modal is showed, and "Escape" is pressed', () => {
    const props = {
      show: true,
      title: 'Are you sure?',
      message: "There's no going back!",
      handleCancel: jest.fn(),
      handleConfirm: () => undefined
    };
    const { getByText } = render(<Confirm {...props} />);
    const cancel = getByText('No, cancel');
    fireEvent.keyDown(cancel, { key: 'Escape' });
    expect(props.handleCancel).toHaveBeenCalledTimes(1);
  });

  it('renders confirm button when showed, and calls handler when clicked', () => {
    const props = {
      show: true,
      title: 'Are you sure?',
      message: "There's no going back!",
      handleCancel: () => undefined,
      handleConfirm: jest.fn()
    };
    const { getByText } = render(<Confirm {...props} />);
    const confirm = getByText("Yes, I'm sure");
    fireEvent.click(confirm);
    expect(props.handleConfirm).toHaveBeenCalledTimes(1);
  });
});
