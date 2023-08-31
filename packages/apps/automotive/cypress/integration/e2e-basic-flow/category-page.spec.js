/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable func-names */

describe('Category page', () => {

  beforeEach(() => {
    cy.fixture(`e2e-data-${Cypress.env('fixtures')}`).as('data');
  })

  it('loads', function () {
    cy.visit(this.data.category.url);
    cy.contains(this.data.category.expect).should('be.visible'); 
  });

})