/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable func-names */

describe('Register page', () => {
  beforeEach(() => {
    cy.fixture(`e2e-data-${Cypress.env('fixtures')}`).as('data');
  });

  it('is accessible from login page', function() {
    cy.visit(`/account-profile/login`);
    cy.contains('Create an account?');
    cy.get('[data-testid=profile-LoginPresentation-register-button]').click(
      5,
      20,
      {
        force: true
      }
    );
    cy.location('pathname').should('eq', `/account-profile/register`);
  });

  it('is allows you to register', function() {
    const newUsername = `tst-${new Date().getTime()}@ibm.com`;
    cy.visit(`/account-profile/register`);
    cy.contains('Register');
    cy.get('#register-email').type(newUsername);
    cy.get('#password').type(this.data.register.generated_password);
    cy.get('#titleCode').select('miss');
    cy.get('#firstName').type('Cypress');
    cy.get('#lastName').type('Generated');
    cy.get('#address1').type('15201 Maple Systems Road');
    cy.get('#city').type('Springfield');
    cy.get('#country').select('United Kingdom');
    cy.get('#province').type('Springfield');
    cy.get('#zip').type('FA43 7IP');
    cy.get('#phone').type('07777777777');
    cy.get('button[type="submit"]')
      .first()
      .click();
    cy.wait(1000);
    cy.url().should('contain', '/content/homepage?registration=complete');
  });
});
