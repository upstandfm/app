import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { useSnackbar } from './SnackbarContext';
import Message from './Message';

const Container = styled.aside`
  position: absolute;
  bottom: 1em;
  left: 1em;
`;

function Snackbar({ maxMessages, timeout }) {
  const [snackbarState, snackbarDispatch] = useSnackbar();

  const dismissMessage = id => {
    snackbarDispatch({
      type: 'DEQUEUE_SNACKBAR_MSG',
      data: id
    });
  };

  const messages = snackbarState.length
    ? snackbarState.slice(0, maxMessages)
    : snackbarState;

  return ReactDOM.createPortal(
    <TransitionGroup component={Container}>
      {messages.map((message, i) => {
        return (
          <CSSTransition
            key={message.id}
            timeout={500}
            classNames="snackbar-msg"
          >
            <Message
              timeout={timeout}
              message={message}
              index={i}
              dismissMessage={dismissMessage}
            />
          </CSSTransition>
        );
      })}
    </TransitionGroup>,
    document.body
  );
}

Snackbar.propTypes = {
  maxMessages: PropTypes.number,
  timeout: PropTypes.number
};

Snackbar.defaultProps = {
  maxMessages: 1,
  timeout: 8e3
};

export default Snackbar;
