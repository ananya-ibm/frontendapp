/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable func-names, camelcase */

describe('Marketplace', () => {
  beforeEach(() => {
    cy.fixture(`e2e-data-${Cypress.env('fixtures')}`).as('data');
  });

  it('Marketplace icon appears in header', function() {
    // TODO: This should be re-enabled as we get reliable support for SAP commerce login
    if (this.data?.marketplace?.skip) this.skip();

    return cy
      .login(
        this.data.signin.valid_user.username,
        this.data.signin.valid_user.password
      )
      .then(() => {
        cy.visit('/');
        cy.get('[data-testid=marketplace-MarketplaceIcon]').should(
          'be.visible'
        );
      });
  });
});
