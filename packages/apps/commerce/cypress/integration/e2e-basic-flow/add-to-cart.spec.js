/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable func-names, camelcase */

describe('Add to Cart', () => {

  beforeEach(() => {
    cy.fixture(`e2e-data-${Cypress.env('fixtures')}`).as('data');
  })

  it('can add to cart - anonymous', function () {
    if (this.data?.add_to_cart?.skip?.anonymous) this.skip();

    cy.visit(this.data.add_to_cart.product_url);

    cy.get('[data-testid=catalog-productSummary-addToCart]').click();

    cy.contains('Product added to basket').should('be.visible');
    cy.get('[data-testid=cart-MiniCartPresentation-CartCount]').should('contain', '1');

    cy.navigate('/cart/cart');
    cy.contains('Subtotal').should('be.visible');
    cy.wait(1000);  // Need to wait after visiting cart as there might be pending updates
  });

  it('can add to cart - logged-in', function () {
    // TODO: This should be re-enabled as we get reliable support for SAP commerce login
    if (this.data?.add_to_cart?.skip?.loggedIn) this.skip();

    return cy.login(this.data.signin.valid_user.username, this.data.signin.valid_user.password)
      .then(() => {
        cy.navigate(this.data.add_to_cart.product_url);
        cy.get('[data-testid=catalog-productSummary-addToCart]').click();
    
        cy.contains('Product added to basket').should('be.visible');
        cy.get('[data-testid=cart-MiniCartPresentation-CartCount]').should('contain', '1');
    
        cy.navigate('/cart/cart');
        cy.contains('Subtotal').should('be.visible');
        cy.wait(1000);  // Need to wait after visiting cart as there might be pending updates
      });
  });

})