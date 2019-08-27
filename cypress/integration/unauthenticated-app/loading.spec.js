/// <reference types="Cypress" />

describe('Loading', () => {
  it('shows splashscreen', () => {
    cy.visit('/');
    cy.get('[data-cy="loading"]').should('have.text', 'loading app..');
  });
});
