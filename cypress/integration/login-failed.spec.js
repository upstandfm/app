/// <reference types="Cypress" />

describe('Login failed', () => {
  beforeEach(() => {
    cy.visit('/?code=');
  });

  it('shows title and subtitle', () => {
    cy.get('[data-cy="title"]').should('have.text', 'Login failed');
    cy.get('[data-cy="subtitle"]').should(
      'have.text',
      'Something went wrong on our end.'
    );
  });

  it('shows error message', () => {
    cy.get('[data-cy="err-msg"]').should('have.text', 'Error: Invalid state');
  });

  it('shows "login again" button', () => {
    cy.get('[data-cy="retry"]').should('have.text', 'Login again');
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
});
