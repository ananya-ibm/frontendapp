/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable func-names, camelcase */

describe('Profile', () => {
  beforeEach(() => {
    cy.fixture(`e2e-data-${Cypress.env('fixtures')}`).as('data');
  });

  it('Profile contains the correct options', function() {
    // TODO: This should be re-enabled as we get reliable support for SAP commerce login
    if (this.data?.profile?.skip) this.skip();

    return cy
      .login(
        this.data.signin.valid_user.username,
        this.data.signin.valid_user.password
      )
      .then(() => {
        cy.visit(`/account-profile/profile`);
        this.data.profile.options.map(item => cy.contains(item));
      });
  });
  it('Personal details contains the correct details', function() {
    // TODO: This should be re-enabled as we get reliable support for SAP commerce login
    if (this.data?.profile?.skip) this.skip();

    return cy
      .login(
        this.data.signin.valid_user.username,
        this.data.signin.valid_user.password
      )
      .then(() => {
        cy.visit(`/account-profile/details`);
        cy.get('#first').should('have.value', this.data.profile.user.first);
        cy.get('#lastname').should(
          'have.value',
          this.data.profile.user.lastname
        );
        cy.get('#address1').should(
          'have.value',
          this.data.profile.user.address1
        );
        cy.get('#city').should('have.value', this.data.profile.user.city);
        cy.get('#country').should('have.value', this.data.profile.user.country);
        cy.get('#zip').should('have.value', this.data.profile.user.zip);
        cy.get('#phone').should('have.value', this.data.profile.user.phone);
        cy.get('#email').should('have.value', this.data.profile.user.email);
      });
  });
  it('There is the correct number of addresses and you can edit them', function() {
    // TODO: This should be re-enabled as we get reliable support for SAP commerce login
    if (this.data?.profile?.skip) this.skip();
    if (this.data?.profile?.addressBook?.skip) this.skip();

    return cy
      .login(
        this.data.signin.valid_user.username,
        this.data.signin.valid_user.password
      )
      .then(() => {
        cy.visit(`/account-profile/addresses`);
        cy.wait(2000);
        cy.contains(this.data.profile.user.address1).should('be.visible');
        cy.contains(this.data.profile.user.city).should('be.visible');
        cy.contains(this.data.profile.user.zip).should('be.visible');
        cy.get('.edit-button')
          .should('have.length', this.data.profile.user.addressNo)
          .first()
          .click();
        cy.contains('Please fill in your contact details').should('be.visible');
      });
  });
  it('There is the correct payment information', function() {
    // TODO: This should be re-enabled as we get reliable support for SAP commerce login
    if (this.data?.profile?.skip) this.skip();

    return cy
      .login(
        this.data.signin.valid_user.username,
        this.data.signin.valid_user.password
      )
      .then(() => {
        cy.visit(`/account-profile/payment`);
        cy.contains(this.data.profile.user.cardToCheck.name).should(
          'be.visible'
        );
        cy.contains(this.data.profile.user.cardToCheck.expiry).should(
          'be.visible'
        );
        cy.contains(this.data.profile.user.cardToCheck.person).should(
          'be.visible'
        );
        cy.contains(this.data.profile.user.cardToCheck.number).should(
          'be.visible'
        );
        cy.get('.edit-button')
          .should('have.length', this.data.profile.user.paymentNo)
          .first()
          .click();
        cy.contains('Please fill in your payment details').should('be.visible');
      });
  });
  it('Account security page contains the right elements', function() {
    // TODO: This should be re-enabled as we get reliable support for SAP commerce login
    if (this.data?.profile?.skip) this.skip();

    return cy
      .login(
        this.data.signin.valid_user.username,
        this.data.signin.valid_user.password
      )
      .then(() => {
        cy.visit(`/account-profile/security`);
        cy.get('#password').should('have.length', 1);
        cy.contains('Update').should('be.visible');
      });
  });
});
