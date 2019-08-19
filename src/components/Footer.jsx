import styled from 'styled-components';

export const FOOTER_LINKS_BY_COLUMN = [
  [
    { name: "what's new?", href: '' },
    { name: 'help', href: '' },
    { name: 'terms & privacy', href: '' }
  ],
  [
    { name: 'say hi!', href: 'mailto:hi@upstand.fm?subject=Hi there!' },
    { name: 'about', href: 'https://danillouz.dev' }
  ],
  [
    { name: 'blog', href: 'https://blog.danillouz.dev' },
    { name: 'GitHub', href: 'https://github.com/upstandfm' }
  ]
];

export const Footer = styled.footer`
  padding: 6em 0;
  font-family: 'Nunino', sans-serif;
  font-size: 0.8em;
  background-color: ${props => props.theme.primaryColor};
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
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
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
  text-transform: capitalize;

  && {
    color: var(--color-white);

    :visited {
      color: var(--color-white);
    }
  }
`;
