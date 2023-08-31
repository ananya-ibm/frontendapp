/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

describe('Homepage', () => {
  it('loads the homepage', () => {
    cy.visit('/content/homepage');
    cy.get('h2')
      .contains('A vehicle for any superhero')
      .should('be.visible');
  });

  it('redirects from root', () => {
    cy.visit('/');
    cy.location('pathname').should('eq', '/content/homepage');
  });

  it('can navigate site nav', () => {
    cy.visit('/content/homepage');
    cy.get('a[href="/catalog/category/Vehicles"]').click();
    cy.contains('Our vehicles').should('be.visible');

    cy.get('a[href="/cart/finance"]').click();
    cy.contains('Set your budget').should('be.visible');
  });
});
