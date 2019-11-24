import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '../components/Button';
import Content from '../components/Content';

const Container = styled.div`
  height: 100vh;
`;

const Main = styled.div`
  background-color: var(--color-lightest-grey);
  margin: 0em auto;
  padding: 2em 1em;
`;

const ErrMessage = styled.pre`
  margin: 1.5em 0;
  padding: 1em;
  border-radius: var(--radius-size);
  background-color: var(--color-lightest-red);
  color: var(--color-dark-red);
  font-weight: bold;
`;

const Link = styled.a`
  color: var(--color-light-purple);
  text-decoration: underline;

  :visited {
    color: var(--color-purple);
    text-decoration: underline;
  }
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
          subtitle="Something went wrong on our end."
        >
          <p>We encountered this error:</p>

          <ErrMessage data-cy="err-msg">{errMessage}</ErrMessage>

          <p>Our developers have been notified, but please try again:</p>

          <Actions>
            <Button
              data-cy="retry"
              invertTextColor
              onClick={handleRetry}
              aria-label="login again"
            >
              Login again
            </Button>
          </Actions>

          <p>
            If retrying didn&apos;t work, please send an email to{' '}
            <Link
              data-cy="support"
              href="mailto:support@upstand.fm?subject=Login error"
              target="_blank"
              rel="noopener noreferrer"
            >
              support@upstand.fm
            </Link>
            . We&apos;ll do our best to help as you as soon as possible.
          </p>

          <p>
            We apologize{' '}
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
