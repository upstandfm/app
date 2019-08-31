/// <reference types="Cypress" />

describe('Landing page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('shows splashscreen', () => {
    cy.get('[data-cy="loading"]').should('have.text', 'loading app..');
  });

  it('shows header logo', () => {
    cy.get('[data-cy="logo-with-name"]').should('exist');
  });

  it('shows tagline', () => {
    cy.get('[data-cy="tagline"]').should(
      'have.text',
      'Async standups for remote teams'
    );
  });

  it('shows "get started" buttons', () => {
    cy.get('[data-cy="login"]').should('have.text', 'get started');
    cy.get('[data-cy="login-branded"]').should('have.text', 'get started');
  });

  it('shows footer with logo, links and copyright', () => {
    cy.get('[data-cy="logo"]').should('exist');

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
    cy.get('[data-cy="Storybook"]')
      .should('have.text', 'Storybook')
      .should('have.attr', 'href', 'https://storybook.upstand.fm')
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'rel', 'noopener noreferrer');
    cy.get('[data-cy="Twitter"]')
      .should('have.text', 'Twitter')
      .should('have.attr', 'href', 'https://twitter.com/danillouz')
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'rel', 'noopener noreferrer');

    const year = new Date().getFullYear();
    cy.get('[data-cy="copyright"]').should('have.text', `© ${year} Upstand FM`);
  });
});
