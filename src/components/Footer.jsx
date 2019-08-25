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
  padding: 4em 0;
  background-color: ${props => props.theme.primaryBackgroundColor};
  color: ${props => props.theme.primaryForegroundColor};
`;

export const FooterWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  align-items: center;
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: 780px) {
    grid-template-columns: 1fr;
    grid-gap: 3em;
  }
`;

export const FooterBrand = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 0.5em;
  margin: auto;
  align-items: center;
  color: ${props => props.theme.specialColor};
`;

export const FooterColumns = styled.div`
  display: grid;
  grid-template-columns: ${() =>
    `repeat(${FOOTER_LINKS_BY_COLUMN.length}, auto)`};

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
    text-decoration: none;
    color: ${props => props.theme.primaryForegroundColor};

    :hover {
      text-decoration: underline;
    }

    :visited {
      color: ${props => props.theme.primaryForegroundColor};
    }
  }
`;
