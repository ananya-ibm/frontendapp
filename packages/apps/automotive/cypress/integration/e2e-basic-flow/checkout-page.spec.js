/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable func-names */

describe('Configurator page', () => {
  beforeEach(() => {
    cy.fixture(`e2e-data-${Cypress.env('fixtures')}`).as('data');
  });

  it('is accessible from the PDP page', function() {
    return cy
      .login(
        this.data.signin.valid_user.username,
        this.data.signin.valid_user.password
      )
      .then(() => {
        cy.visit(this.data.pdp.product_url);
        cy.location('pathname').should('eq', `${this.data.pdp.product_url}/_`);
        cy.wait(2000);
        cy.get('a[href*="#"]')
          .first()
          .click({ force: true });
        cy.contains('Configure').click();
        cy.wait(1000);
        cy.contains('go to cart').click();
        cy.location('pathname').should('eq', '/cart/cart');
        cy.contains('Proceed to Checkout').click();
        cy.location('pathname').should('eq', '/cart/checkout');
        cy.contains('Enter your address manually').click();
        cy.get('#firstName').type(this.data.profile.user.first);
        cy.get('#lastName').type(this.data.profile.user.lastname);
        cy.get('#address1').type(this.data.profile.user.address1);
        cy.get('#city').type(this.data.profile.user.city);
        cy.get('#country').select(this.data.profile.user.country);
        cy.get('#province').type(this.data.profile.user.province);
        cy.get('#zip').type(this.data.profile.user.zip);
        cy.get('#email').type(this.data.profile.user.email);
        cy.get('button[type="submit"]')
          .first()
          .click();
        cy.wait(1000);
        cy.get('button[type="submit"]')
          .first()
          .click();
        cy.wait(1000);
        cy.contains(
          'Is the billing address the same as the shipping address?'
        ).click({ force: true });
        cy.get('iframe').then($iframe => {
          const doc = $iframe.contents();
          const stripePaymentElements = doc.find('input');
          cy.wrap(stripePaymentElements[1]).type(
            this.data.payment.card.cardNo,
            {
              force: true
            }
          );
          cy.wrap(stripePaymentElements[2]).type(
            this.data.payment.card.cardExpiry,
            {
              force: true
            }
          );
          cy.wrap(stripePaymentElements[3]).type(
            this.data.payment.card.cardCVV,
            {
              force: true
            }
          );
        });
        // Accept terms and conditions
        cy.contains('I agree').click({ force: true });
        cy.contains('Confirm payment').click();
        cy.wait(6000); // Need to wait after confirmation, as payment is slow to execute
        cy.contains('Congratulations!').should('be.visible');
      });
  });
});
