/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable func-names, camelcase */

describe('Checkout page', () => {
  beforeEach(() => {
    cy.fixture(`e2e-data-${Cypress.env('fixtures')}`).as('data');
  });
  // TODO: These should all be re-enabled as we get reliable checkout on at least one engine
  // TODO: enable once cart in SAP supports standard free delivery
  it.skip('is accessible from a loaded cart and allows checkout with a card', function() {
    // TODO: This should be re-enabled as we get reliable support for SAP commerce login
    if (this.data?.cart?.skip?.loadWithItems) this.skip();

    cy.navigateToCart(
      this.data.signin.valid_user.username,
      this.data.signin.valid_user.password,
      this.data.cart
    );

    cy.get('[data-testid=cart-CartButtonsPresentation-next-button]').click();

    cy.location('pathname').should('eq', '/checkout/checkout');
    cy.contains('Shipping Address').should('be.visible');
    cy.get('[data-testid=checkout-AddressBookDropdown]').click();
    cy.get('#downshift-1-item-0').click({ force: true });

    cy.get('[data-testid=email]').type('test@test.com');

    cy.get('button[type="submit"]')
      .first()
      .click();

    cy.get(`#${this.data.payment.card.method}`).check({ force: true });

    cy.wait(3000); // Need to wait after choosing method as iframe is slow to load
    cy.contains('Credit Card Information').should('be.visible');

    // A little bit ugly, but really the only way: https://github.com/cypress-io/cypress/issues/136#issuecomment-328100955
    // eslint-disable-next-line jest/valid-expect-in-promise
    cy.get('iframe').then($iframe => {
      const doc = $iframe.contents();
      const stripePaymentElements = doc.find('input');
      cy.wrap(stripePaymentElements[1]).type(this.data.payment.card.cardNo, {
        force: true
      });
      cy.wrap(stripePaymentElements[2]).type(
        this.data.payment.card.cardExpiry,
        {
          force: true
        }
      );
      cy.wrap(stripePaymentElements[3]).type(this.data.payment.card.cardCVV, {
        force: true
      });
    });

    cy.get('[data-testid=cart-PaymentButtons-confirm]').click();
    cy.wait(6000); // Need to wait after confirmation, as payment is slow to execute
    cy.contains('Confirmation').should('be.visible');

    // Testing items are displayed
    cy.contains(this.data.add_to_cart.brand).should('be.visible');
  });

  // TODO: enable once cart in SAP supports standard free delivery
  it.skip('is accessible from a loaded cart and allows checkout account payment', function() {
    // TODO: This should be re-enabled as we get reliable support for SAP commerce login
    if (this.data?.cart?.skip?.loadWithItems) this.skip();

    cy.navigateToCart(
      this.data.signin.valid_user.username,
      this.data.signin.valid_user.password,
      this.data.cart
    );

    cy.get('[data-testid=cart-CartButtonsPresentation-next-button]').click();

    cy.location('pathname').should('eq', '/checkout/checkout');
    cy.contains('Shipping Address').should('be.visible');
    cy.get('[data-testid=checkout-AddressBookDropdown]').click();
    cy.get('#downshift-1-item-0').click({ force: true });

    cy.get('[data-testid=email]').type('test@test.com');

    cy.get('button[type="submit"]')
      .first()
      .click();

    cy.get(`#${this.data.payment.account.method}`).check({ force: true });

    cy.wait(3000); // Need to wait after choosing method as iframe is slow to load
    cy.contains('Purchase Order*').should('be.visible');

    cy.get('#purchaseOrder').type(this.data.payment.account.reference);
    cy.get('[data-testid=cart-AccountPayment-confirm]').click();
    cy.wait(8000); // Need to wait after confirmation, as payment is slow to execute
    cy.contains('purchaseOrder').should('be.visible');

    // Testing items are displayed
    cy.contains(this.data.add_to_cart.brand).should('be.visible');
  });
});
