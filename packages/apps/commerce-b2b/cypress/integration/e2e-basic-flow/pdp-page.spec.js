/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable func-names */

describe('PDP page', () => {
  beforeEach(() => {
    cy.fixture(`e2e-data-${Cypress.env('fixtures')}`).as('data');
  });

  it('redirects', function() {
    cy.visit(this.data.pdp.product_url);
    cy.location('pathname').should(
      'eq',
      `${this.data.pdp.product_url}/${this.data.pdp.product_id}`
    );
    cy.contains(this.data.pdp.product_id).should('be.visible');
  });
});
