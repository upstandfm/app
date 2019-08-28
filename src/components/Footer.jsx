import React from 'react';
import styled from 'styled-components';

import { Logo } from '../components/Logo';
import Copyright from '../components/Copyright';

export const FOOTER_LINKS_BY_COLUMN = [
  [
    { name: "What's new?", href: '' },
    { name: 'Help', href: '' },
    { name: 'Privacy & terms', href: '' }
  ],
  [
    { name: 'Say hi!', href: 'mailto:hi@upstand.fm?subject=Hi there!' },
    { name: 'About', href: 'https://danillouz.dev' }
  ],
  [
    { name: 'Blog', href: 'https://blog.danillouz.dev' },
    { name: 'GitHub', href: 'https://github.com/upstandfm' },
    { name: 'Twitter', href: 'https://twitter.com/danillouz' }
  ]
];

const Container = styled.footer`
  padding: 3em 0;
  background-color: ${props => props.theme.primaryBackgroundColor};
  color: ${props => props.theme.primaryForegroundColor};
`;

const Wrapper = styled.div`
  display: grid;
  grid-gap: 2em;
  grid-template-columns: 1fr;
  align-items: center;
  max-width: 850px;
  margin: 0 auto;
`;

const Brand = styled.div`
  text-align: center;
`;

const Columns = styled.div`
  display: grid;
  grid-template-columns: ${() =>
    `repeat(${FOOTER_LINKS_BY_COLUMN.length}, 1fr)`};
  justify-items: center;

  @media (max-width: 780px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const Column = styled.div``;

const Link = styled.a`
  display: block;
  padding: 0.5em 0;

  && {
    font-weight: normal;
    text-decoration: underline;
    color: ${props => props.theme.primaryForegroundColor};

    :hover {
      text-decoration: none;
    }

    :visited {
      color: ${props => props.theme.primaryForegroundColor};
    }
  }
`;

const Misc = styled.div`
  text-align: center;
  font-size: 14px;
  opacity: 0.6;
`;

function Footer() {
  return (
    <Container>
      <Wrapper>
        <Brand>
          <Logo data-cy="logo" width="40px" />
        </Brand>

        <Columns>
          {FOOTER_LINKS_BY_COLUMN.map((links, i) => {
            return (
              <Column key={`footer-column-${i}`}>
                {links.map(link => {
                  return (
                    <Link
                      data-cy={link.name}
                      key={`footer-column-link-${link.name}`}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </Column>
            );
          })}
        </Columns>

        <Misc>
          <Copyright data-cy="copyright" />
        </Misc>
      </Wrapper>
    </Container>
  );
}

export default Footer;
