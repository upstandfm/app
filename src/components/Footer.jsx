import styled from 'styled-components';

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

export const Footer = styled.footer`
  padding: 3em 0;
  background-color: ${props => props.theme.primaryBackgroundColor};
  color: ${props => props.theme.primaryForegroundColor};
`;

export const FooterWrapper = styled.div`
  display: grid;
  grid-gap: 2em;
  grid-template-columns: 1fr;
  align-items: center;
  max-width: 850px;
  margin: 0 auto;
`;

export const FooterBrand = styled.div`
  text-align: center;
`;

export const FooterColumns = styled.div`
  display: grid;
  grid-template-columns: ${() =>
    `repeat(${FOOTER_LINKS_BY_COLUMN.length}, 1fr)`};
  justify-items: center;

  @media (max-width: 780px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

export const FooterColumn = styled.div``;

export const FooterLink = styled.a`
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

export const FooterMisc = styled.div`
  text-align: center;
  font-size: 14px;
  opacity: 0.6;
`;
