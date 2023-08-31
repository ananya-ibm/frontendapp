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
        cy.wait(2000);
        cy.contains('£70,674');
        this.data.configurator.options.map(item => cy.contains(item));
        cy.contains('Choose a color').click();
        cy.contains('Bright Yellow').click();
        cy.wait(2000);
        cy.contains('£71,024');
        cy.contains('Interior').click();
        cy.contains('Choose your seats').click();
        cy.contains('Sports Seats').click();
        cy.wait(2000);
        cy.contains('£71,144');
        cy.get('[data-testid=configurator-Subscriptions]').click();
        cy.wait(2000);
        cy.contains('Servicing Plans').click();
        cy.contains('Service Plan').click();
        cy.wait(2000);
        cy.contains('£71,844');
        cy.contains('Summary').click();
        cy.contains('Your new car').should('be.visible');
        cy.contains('Bright Yellow').should('be.visible');
        cy.contains('Save Configuration').click();
      });
  });
});
