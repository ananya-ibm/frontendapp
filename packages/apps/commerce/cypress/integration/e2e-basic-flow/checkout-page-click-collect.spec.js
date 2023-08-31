/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable func-names, camelcase */

describe('Checkout Page - Click and Collect', () => {
  beforeEach(() => {
    cy.fixture(`e2e-data-${Cypress.env('fixtures')}`).as('data');
  });
  it('it allows card payment for a logged in user when collecting from the first store and entering a manual address', function() {
    // TODO: This should be re-enabled as we get reliable support for SAP commerce login
    if (this.data?.cart?.skip?.loadWithItems) this.skip();

    cy.navigateToCart(
      this.data.signin.valid_user.username,
      this.data.signin.valid_user.password,
      this.data.cart
    );
    cy.contains('Store Pick-up').click();
    cy.contains('Change store...').click();
    cy.get('#downshift-0-toggle-button').click({ force: true });
    cy.get('#downshift-0-item-0').click({ force: true });
    cy.get('[data-testid=cart-SelectStore-modal]').within(() => {
      cy.get('button')
        .contains('Select')
        .click({ force: true });
    });
    cy.contains('Collect at').should('be.visible');

    cy.get('[data-testid=cart-CartButtonsPresentation-next-button]').click();
    cy.location('pathname').should('eq', '/checkout/checkout');
    cy.contains('Billing Address').should('be.visible');

    cy.wait(200); 
    cy.contains('Enter your address manually').click({ force: true });

    cy.wait(200); 
    cy.contains('Country*').should('be.visible');

    const newFirstName = `tst-${new Date().getTime()}`;

    cy.get('#firstName').type(newFirstName);
    cy.get('#lastName').type(this.data.profile.user.lastname);
    cy.get('#address1').type(this.data.profile.user.address1);
    cy.get('#city').type(this.data.profile.user.city);
    cy.get('#country').select(this.data.profile.user.country);
    cy.get('#zip').type(this.data.profile.user.zip);

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
    cy.contains(this.data.profile.user.lastname).should('be.visible');
    cy.contains(this.data.profile.user.address1).should('be.visible');
    cy.contains(this.data.profile.user.city).should('be.visible');
    cy.contains(this.data.profile.user.zip).should('be.visible');
    // Testing items are displayed
    cy.contains(this.data.add_to_cart.brand).should('be.visible');
  });

  it('it allows card payment for a logged in user when collecting from the first store and using postcode lookup', function() {
    // TODO: This should be re-enabled as we get reliable support for SAP commerce login
    if (this.data?.cart?.skip?.loadWithItems) this.skip();

    cy.navigateToCart(
      this.data.signin.valid_user.username,
      this.data.signin.valid_user.password,
      this.data.cart
    );
    cy.contains('Store Pick-up').click();
    cy.contains('Change store...').click();
    cy.get('#downshift-0-toggle-button').click({ force: true });
    cy.get('#downshift-0-item-0').click({ force: true });
    cy.get('[data-testid=cart-SelectStore-modal]').within(() => {
      cy.get('button')
        .contains('Select')
        .click({ force: true });
    });
    cy.contains('Collect at').should('be.visible');

    cy.get('[data-testid=cart-CartButtonsPresentation-next-button]').click();
    cy.location('pathname').should('eq', '/checkout/checkout');
    cy.contains('Billing Address').should('be.visible');

    cy.wait(200);

    cy.get('[data-testid=zip]')
      .should('be.visible')
      .type('NN1 3ER');
    cy.wait(2000);
    cy.contains('10 Watkin Terrace').click();
    cy.get('#address1').should('have.value', '10 Watkin Terrace');
    cy.get('#city').should('have.value', 'Northampton');

    const newFirstName = `tst-${new Date().getTime()}`;
    cy.get('#firstName').type(newFirstName, { force: true });
    cy.get('#lastName').type(this.data.profile.user.lastname, {
      force: true
    });

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
    cy.contains(this.data.profile.user.lastname).should('be.visible');
    cy.contains('10 Watkin Terrace').should('be.visible');
    cy.contains('Northampton').should('be.visible');
    // Testing items are displayed
    cy.contains(this.data.add_to_cart.brand).should('be.visible');
  });

  it('it allows cash payment for a logged in user when using an existing address', function() {
    // TODO: This should be re-enabled as we get reliable support for SAP commerce login
    if (this.data?.cart?.skip?.loadWithItems) this.skip();

    cy.navigateToCart(
      this.data.signin.valid_user.username,
      this.data.signin.valid_user.password,
      this.data.cart
    );
    cy.contains('Store Pick-up').click();
    cy.contains('Change store...').click();
    cy.get('#downshift-0-toggle-button').click({ force: true });
    cy.get('#downshift-0-item-0').click({ force: true });
    cy.get('[data-testid=cart-SelectStore-modal]').within(() => {
      cy.get('button')
        .contains('Select')
        .click({ force: true });
    });
    cy.contains('Collect at').should('be.visible');

    cy.get('[data-testid=cart-CartButtonsPresentation-next-button]').click();
    cy.location('pathname').should('eq', '/checkout/checkout');
    cy.contains('Billing Address').should('be.visible');
    cy.get('[data-testid=checkout-AddressBookDropdown]').click();

    cy.contains(this.data.profile.user.address1)
      .first()
      .click({ force: true });

    cy.get('#firstName').should('have.value', this.data.profile.user.first);
    cy.get('#lastName').should('have.value', this.data.profile.user.lastname);

    cy.get('button[type="submit"]')
      .first()
      .click();

    cy.get('#COD').click({ force: true });
    cy.wait(3000);

    cy.get('[data-testid=cart-PaymentButtons-confirm]').click();
    cy.wait(6000); // Need to wait after confirmation, as payment is slow to execute
    cy.contains('Confirmation').should('be.visible');
    // Testing users address is displayed
    cy.contains(this.data.profile.user.lastname).should('be.visible');
    cy.contains(this.data.profile.user.address1).should('be.visible');
    cy.contains(this.data.profile.user.city).should('be.visible');
    cy.contains(this.data.profile.user.zip).should('be.visible');
    // Testing items are displayed
    cy.contains(this.data.add_to_cart.brand).should('be.visible');
  });
});
