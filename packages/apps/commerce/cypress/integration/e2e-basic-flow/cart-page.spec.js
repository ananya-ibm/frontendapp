/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable func-names, camelcase */

describe('Cart page', () => {
  beforeEach(() => {
    cy.fixture(`e2e-data-${Cypress.env('fixtures')}`).as('data');
  })

  it('loads empty', function () {
    cy.visit('/cart/cart');
    cy.contains('Your cart is currently empty').should('be.visible');
  });

  it('loads with items', function () {
    // TODO: This should be re-enabled as we get reliable support for SAP commerce login
    if (this.data?.cart?.skip?.loadWithItems) this.skip();

    return cy.login(this.data.signin.valid_user.username, this.data.signin.valid_user.password)
      .then(() => cy.addToCart(this.data.cart.items[0]))
      .then(() => {
        cy.navigate('/cart/cart');
        cy.contains('Subtotal').should('be.visible');
        cy.wait(1000);  // Need to wait after visiting cart as there might be pending updates
      });
  });

  it('can delete', function () {
    if (this.data?.cart?.skip?.updates) this.skip();

    return cy.login(this.data.signin.valid_user.username, this.data.signin.valid_user.password)
      .then(() => cy.addToCart(this.data.cart.items[0]))
      .then(() => {
        cy.navigate('/cart/cart');
    
        cy.get('[data-testid=cart-CartItem-Delete]').click();
        cy.contains('Your cart is currently empty').should('be.visible');
      });
  });

  it('can update', function () {
    if (this.data?.cart?.skip?.updates) this.skip();

    return cy.login(this.data.signin.valid_user.username, this.data.signin.valid_user.password)
      .then(() => cy.addToCart(this.data.cart.items[0]))
      .then(() => {
        cy.navigate('/cart/cart');
        cy.get('[data-testid=cart-CartItem-Quantity]').select('2');
        cy.get('[data-testid=cart-MiniCartPresentation-CartCount]').should('contain', '2');
        cy.wait(1000);  // Need to wait after visiting cart as there might be pending updates
      });
  });
})