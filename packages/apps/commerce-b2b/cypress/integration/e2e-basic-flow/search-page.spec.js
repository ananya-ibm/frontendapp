/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable func-names */

describe('Search page', () => {

  beforeEach(() => {
    cy.fixture(`e2e-data-${Cypress.env('fixtures')}`).as('data');
  })

  it('loads with search result', function () {
    if (this.data.search.skip) this.skip();

    cy.visit(`/catalog/search/${this.data.search.with_results}`);
    cy.contains('Loading...').should('not.be.visible');
    cy.contains('Your search did not return any results.').should('not.be.visible');
  });

  it('loads with empty message', function () {
    if (this.data.search.skip) this.skip();
    
    cy.visit(`/catalog/search/${this.data.search.without_results}`);
    cy.contains('Loading...').should('not.be.visible');
    cy.contains('Your search did not return any results.').should('be', 'visible');
  });

})