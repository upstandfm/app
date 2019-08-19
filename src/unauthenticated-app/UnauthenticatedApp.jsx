import React from 'react';
import styled from 'styled-components';

import { useAuth0 } from '../auth0';

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

import { Container, Main, Section, Content } from './Layout';
import { BrandWrapper, Logo, BrandName, BrandDescription } from './Brand';

const MassiveButton = styled(Button)`
  width: 300px;
  margin: 3em 0 0 0;
  padding: 26px;
  font-size: 24px;
  background-color: var(--color-green);

  @media (max-width: 550px) {
    width: 70%;
    padding: 24px;
    font-size: 22px;
  }
`;

function UnauthenticatedApp() {
  const { login } = useAuth0();

  return (
    <Container>
      <Main>
        <Section>
          <BrandWrapper>
            <Logo />

            <BrandName>Upstand FM</BrandName>

            <BrandDescription>
              Asynchronous standups for remote teams.
            </BrandDescription>

            <MassiveButton onClick={login}>get started</MassiveButton>
          </BrandWrapper>
        </Section>

        <Section secondary>
          <Content>
            <p>
              Signups are <b>disabled</b> at the moment. If you&apos;d like
              access, please send me an email to{' '}
              <a href="mailto:hi@upstand.fm">hi@upstand.fm</a>.
            </p>

            <p>
              It&apos;s a work in progress..{' '}
              <span
                role="img"
                aria-label="grinning face with aquinting eyes and sweat drop"
              >
                😅
              </span>
            </p>
          </Content>
        </Section>

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
      </Main>
    </Container>
  );
}

export default UnauthenticatedApp;
