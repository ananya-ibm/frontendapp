/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

describe('Homepage', () => {
  it('loads', () => {
    cy.visit('/content/homepage');
    cy.contains('iX EXO Storefront').should('be.visible');
  });

  it('redirects from root', () => {
    cy.visit('/');
    cy.location('pathname').should('eq', '/content/homepage');
  });
});
