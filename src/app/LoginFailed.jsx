import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '../components/Button';
import Content, {
  Title,
  Subtitle,
  Section,
  SectionWrapper
} from '../components/Content';

const Container = styled.div`
  height: 100vh;
`;

const Main = styled.div`
  background-color: var(--color-lightest-grey);
`;

const Wrapper = styled.div`
  max-width: 50rem;
  margin: 0 auto;
  padding: 1.5em 1em;
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
        <Wrapper>
          <Content>
            <Title>Login failed</Title>
            <Subtitle>Something went wrong on our end.</Subtitle>
            <Section>
              <SectionWrapper>
                <p>We encountered this error:</p>

                <ErrMessage data-testid="login-failed-err">
                  {errMessage}
                </ErrMessage>

                <p>Our developers have been notified, but please try again:</p>

                <Actions>
                  <Button onClick={handleRetry} aria-label="login again">
                    Login again
                  </Button>
                </Actions>

                <p>
                  If retrying didn&apos;t work, please send an email to{' '}
                  <Link
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
              </SectionWrapper>
            </Section>
          </Content>
        </Wrapper>
      </Main>
    </Container>
  );
}

LoginFailed.protoTypes = {
  errMessage: PropTypes.object.isRequired,
  handleRetry: PropTypes.func.isRequired
};

export default LoginFailed;
