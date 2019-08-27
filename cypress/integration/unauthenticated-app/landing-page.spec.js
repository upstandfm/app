/// <reference types="Cypress" />

describe('Landing page', () => {
  beforeEach(() => {
    cy.visit('/');
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

  it('shows "get started" button', () => {
    cy.get('[data-cy="login"]').should('have.text', 'get started');
  });

  it('shows footer', () => {
    cy.get('[data-cy="footer').should('exist');
  });
});
