/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable func-names, camelcase */

describe('Contact Page', () => {
  beforeEach(() => {
    cy.fixture(`e2e-data-${Cypress.env('fixtures')}`).as('data');
  });
  it('is accesible from homepage', function() {
    cy.visit('/content/homepage');
    cy.contains('Contact Us').should('be.visible');
    cy.get('a[href*="contact"]').click();
    cy.location('pathname').should('eq', '/content/contact');
    cy.contains('Details of your enquiry').should('be.visible');
  });

  // TODO: enable once case adapter is online again
  it.skip('allows submission when logged out', function() {
    cy.visit('/content/contact');
    cy.contains('About you').should('be.visible');
    cy.get('#contactName').type('Test name');
    cy.get('#email').type('test@test.com');
    cy.get('#subject').type('E2E Test Message');
    cy.get('#description').type('From Cypress Front End');
    cy.get('button[type="submit"]')
      .first()
      .click();
    cy.wait(1000);
    cy.contains('Your form has been submitted').should('be.visible');
  });

  // TODO: enable once case adapter is online again
  it.skip('allows submission when logged in', function() {
    // TODO: This should be re-enabled as we get reliable support for SAP commerce login
    if (this.data?.contact?.skip?.loggedIn) this.skip();

    return cy.login(
      this.data.signin.valid_user.username,
      this.data.signin.valid_user.password
    ).then(() => {
      cy.visit('/content/contact');
      cy.contains('About you').should('not.be.visible');
      cy.contains('Details of your enquiry').should('be.visible');
      cy.get('#subject').type('E2E Test Message');
      cy.get('#description').type('From Cypress Front End');
      cy.get('button[type="submit"]')
        .first()
        .click();
      cy.wait(1000);
      cy.contains('Your form has been submitted').should('be.visible');
    });
  });
});
