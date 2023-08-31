/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable func-names */

describe('Sign-in page', () => {
  beforeEach(() => {
    cy.fixture(`e2e-data-${Cypress.env('fixtures')}`).as('data');
  });

  it('loads', function() {
    if (this.data.signin.skip) this.skip();

    cy.visit(`/account-profile/login`);
  });

  it('you can sign in', function() {
    if (this.data.signin.skip) this.skip();

    cy.visit(`/account-profile/login`);

    cy.get('#username').type(this.data.signin.valid_user.username);
    cy.get('#password').type(this.data.signin.valid_user.password);

    cy.get('[data-testid=profile-LoginPanePresentation-Login]').click();

    cy.location('pathname').should('eq', `/content/homepage`);
  });
});
