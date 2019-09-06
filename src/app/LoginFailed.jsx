import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '../components/Button';
import Content from '../components/Content';

const Container = styled.div`
  height: 100vh;
`;

const Main = styled.div`
  min-height: 100vh;
  background-color: var(--color-lightest-grey);
  margin: 0 auto;
`;

const ErrMessage = styled.pre`
  margin: 1.5em 0;
  padding: 1em;
  border: 1px solid var(--color-light-grey);
  border-radius: 4px;
  background-color: #f0f0f0;
  color: red;
`;

const Actions = styled.div`
  margin: 2em 0;
  text-align: center;
`;

function LoginFailed({ errMessage, handleRetry }) {
  return (
    <Container>
      <Main>
        <Content
          title="Login failed"
          subtitle="Something went wrong on my end when trying to log you in."
        >
          <p>I encountered this error:</p>

          <ErrMessage data-cy="err-msg">{errMessage}</ErrMessage>

          <p>I have been notified, but please try again:</p>

          <Actions>
            <Button
              data-cy="retry"
              invertTextColor
              onClick={handleRetry}
              aria-label="login again"
            >
              Login Again
            </Button>
          </Actions>

          <p>
            If retrying didn&apos;t work, please send an email to{' '}
            <a
              data-cy="support"
              href="mailto:support@upstand.fm?subject=Login error"
              target="_blank"
              rel="noopener noreferrer"
            >
              support@upstand.fm
            </a>
            . I&apos;ll do my best to help as you as soon as possible.
          </p>

          <p>
            I apologize{' '}
            <span role="img" aria-label="hands pressed together">
              🙏
            </span>{' '}
            for this inconvenience.
          </p>
        </Content>
      </Main>
    </Container>
  );
}

LoginFailed.protoTypes = {
  errMessage: PropTypes.object.isRequired,
  handleRetry: PropTypes.func.isRequired
};

export default LoginFailed;
