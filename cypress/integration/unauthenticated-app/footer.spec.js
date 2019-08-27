/// <reference types="Cypress" />

describe('Footer', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('shows logo', () => {
    cy.get('[data-cy="logo"]').should('exist');
  });

  it('shows links', () => {
    cy.get('[data-cy="What\'s new?"]')
      .should('have.text', "What's new?")
      .should('have.attr', 'href', '')
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'rel', 'noopener noreferrer');

    cy.get('[data-cy="Help"]')
      .should('have.text', 'Help')
      .should('have.attr', 'href', '')
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'rel', 'noopener noreferrer');

    cy.get('[data-cy="Privacy & terms"]')
      .should('have.text', 'Privacy & terms')
      .should('have.attr', 'href', '')
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'rel', 'noopener noreferrer');

    cy.get('[data-cy="Say hi!"]')
      .should('have.text', 'Say hi!')
      .should('have.attr', 'href', 'mailto:hi@upstand.fm?subject=Hi there!')
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'rel', 'noopener noreferrer');

    cy.get('[data-cy="About"]')
      .should('have.text', 'About')
      .should('have.attr', 'href', 'https://danillouz.dev')
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'rel', 'noopener noreferrer');

    cy.get('[data-cy="Blog"]')
      .should('have.text', 'Blog')
      .should('have.attr', 'href', 'https://blog.danillouz.dev')
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'rel', 'noopener noreferrer');

    cy.get('[data-cy="GitHub"]')
      .should('have.text', 'GitHub')
      .should('have.attr', 'href', 'https://github.com/upstandfm')
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'rel', 'noopener noreferrer');

    cy.get('[data-cy="Twitter"]')
      .should('have.text', 'Twitter')
      .should('have.attr', 'href', 'https://twitter.com/danillouz')
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'rel', 'noopener noreferrer');
  });

  it('shows copyright', () => {
    const year = new Date().getFullYear();
    cy.get('[data-cy="copyright"]').should('have.text', `© ${year} Upstand FM`);
  });
});
