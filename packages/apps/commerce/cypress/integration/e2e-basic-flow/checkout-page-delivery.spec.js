/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable func-names, camelcase */

describe('Checkout page - Delivery', () => {
  beforeEach(() => {
    cy.fixture(`e2e-data-${Cypress.env('fixtures')}`).as('data');
  });
  it('it allows card payment for a logged in user, after chosing an existing address', function() {
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

    cy.get('#firstName').should('have.value', this.data.profile.user.first);
    cy.get('#lastName').should('have.value', this.data.profile.user.lastname);

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
    // Testing users address is displayed
    cy.contains(this.data.profile.user.first).should('be.visible');
    cy.contains(this.data.profile.user.lastname).should('be.visible');
    cy.contains(this.data.profile.user.address1).should('be.visible');
    cy.contains(this.data.profile.user.city).should('be.visible');
    cy.contains(this.data.profile.user.zip).should('be.visible');
    // Testing items are displayed
    cy.contains(this.data.add_to_cart.brand).should('be.visible');
  });

  it('it allows cash on delivery payment for a logged in user, after chosing an existing address', function() {
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

    cy.get('#firstName').should('have.value', 'Hank');
    cy.get('#lastName').should('have.value', 'Scorpio');

    cy.get('button[type="submit"]')
      .first()
      .click();

    cy.get('#COD').click({ force: true });
    cy.wait(3000);

    cy.get('[data-testid=cart-PaymentButtons-confirm]').click();
    cy.wait(6000); // Need to wait after confirmation, as payment is slow to execute
    cy.contains('Confirmation').should('be.visible');
    // Testing users address is displayed
    cy.contains(this.data.profile.user.first).should('be.visible');
    cy.contains(this.data.profile.user.lastname).should('be.visible');
    cy.contains(this.data.profile.user.address1).should('be.visible');
    cy.contains(this.data.profile.user.city).should('be.visible');
    cy.contains(this.data.profile.user.zip).should('be.visible');
    // Testing items are displayed
    cy.contains(this.data.add_to_cart.brand).should('be.visible');
  });
});
