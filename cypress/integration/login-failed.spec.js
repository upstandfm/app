/// <reference types="Cypress" />

describe('Login failed', () => {
  beforeEach(() => {
    cy.visit('/?code=');
  });

  it('shows title and subtitle', () => {
    cy.get('[data-cy="title"]').should('have.text', 'Login failed');
    cy.get('[data-cy="subtitle"]').should(
      'have.text',
      'Something went wrong on my end when trying to log you in.'
    );
  });

  it('shows error message', () => {
    cy.get('[data-cy="err-msg"]').should('have.text', 'Error: Invalid state');
  });

  it('shows "login again" button', () => {
    cy.get('[data-cy="retry"]').should('have.text', 'login again');
  });

  it('shows contact support link', () => {
    cy.get('[data-cy="support"]')
      .should('have.text', 'support@upstand.fm')
      .should(
        'have.attr',
        'href',
        'mailto:support@upstand.fm?subject=Login error'
      )
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'rel', 'noopener noreferrer');
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
