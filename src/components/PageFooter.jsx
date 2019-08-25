import React from 'react';
import { Logo } from '../components/Logo';

import {
  FOOTER_LINKS_BY_COLUMN,
  Footer,
  FooterWrapper,
  FooterBrand,
  FooterColumns,
  FooterColumn,
  FooterLink
} from '../components/Footer';

import Copyright from '../components/Copyright';

function PageFooter() {
  return (
    <Footer>
      <FooterWrapper>
        <FooterBrand>
          <Logo width="40px" />
          <Copyright />
        </FooterBrand>

        <FooterColumns>
          {FOOTER_LINKS_BY_COLUMN.map((links, i) => {
            return (
              <FooterColumn key={`footer-column-${i}`}>
                {links.map(link => {
                  return (
                    <FooterLink
                      key={`footer-column-link-${link.name}`}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
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
  );
}

export default PageFooter;
