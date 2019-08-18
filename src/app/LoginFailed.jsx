import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '../components/Button';
import Copyright from '../components/Copyright';

import {
  FOOTER_LINKS_BY_COLUMN,
  Footer,
  FooterWrapper,
  FooterBrand,
  FooterColumns,
  FooterColumn,
  FooterLink
} from '../components/Footer';

const Container = styled.div`
  height: 100vh;
  font-family: 'Open Sans', sans-serif;
  font-size: 20px;

  a {
    color: ${props => props.theme.primaryColor};
    font-weight: bold;

    :visited {
      color: ${props => props.theme.primaryColor};
    }
  }

  p {
    font-size: 20px;
    line-height: 1.6;
  }
`;

const Main = styled.main`
  min-height: 100vh;
  background-color: ${props => props.theme.primaryBackgroundColor};
  margin: 0 auto;
  padding: 1em;
`;

const ErrMessage = styled.pre`
  margin: 1.5em 0;
  padding: 1em;
  border: 1px solid ${props => props.theme.accentColor};
  border-radius: 4px;
  background-color: #fafafa;
  color: ${props => props.theme.dangerColor};
`;

const Actions = styled.div`
  width: 40%;
  margin: 1.5em auto;

  @media (max-width: 550px) {
    width: 100%;
  }
`;

const Page = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-family: 'Nunito', sans-serif;
  margin: 0;
  padding: 0.5em 0 0 0;
`;

const PageSubTitle = styled.h3`
  font-family: 'Nunito', sans-serif;
  margin: 0;
  padding: 0.5em 0 0 0;
`;

const PageSection = styled.section`
  margin: 1.5em 0 0 0;
  padding: 1.5em;
  border-radius: 26px;
  background-color: var(--color-white);
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
`;

function LoginFailed({ errMessage, handleRetry }) {
  return (
    <Container>
      <Main>
        <Page>
          <PageTitle>Login failed</PageTitle>

          <PageSubTitle>
            Oops! Something went wrong on my end, when trying to log you in..
          </PageSubTitle>

          <PageSection>
            <p>I encountered this error:</p>

            <ErrMessage>{errMessage}</ErrMessage>

            <p>I have been notified, but please try again:</p>

            <Actions>
              <Button invertTextColor onClick={handleRetry}>
                login again
              </Button>
            </Actions>

            <p>
              If retrying didn&apos;t work, please send an email to{' '}
              <a href="mailto:support@upstand.fm?subject=Login error">
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
          </PageSection>
        </Page>
      </Main>

      <Footer>
        <FooterWrapper>
          <FooterBrand>
            <Copyright />
          </FooterBrand>

          <FooterColumns>
            {FOOTER_LINKS_BY_COLUMN.map(links => {
              return (
                <FooterColumn>
                  {links.map(link => {
                    return (
                      <FooterLink href={link.href} target="_blank">
                        {link.name}
                      </FooterLink>
                    );
                  })}
                </FooterColumn>
              );
            })}
          </FooterColumns>
        </FooterWrapper>
      </Footer>
    </Container>
  );
}

LoginFailed.protoTypes = {
  errMessage: PropTypes.object.isRequired,
  handleRetry: PropTypes.func.isRequired
};

export default LoginFailed;
