/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable func-names */

describe('PDP page', () => {
  beforeEach(() => {
    cy.fixture(`e2e-data-${Cypress.env('fixtures')}`).as('data');
  });

  it('adding an item to cart displays a notification and increases the MiniCart item count', function() {
    if (this.data.pdp.skip_anonymous_add_to_cart) this.skip();

    cy.visit(this.data.pdp.product_variant_url);
    cy.get('[data-testid=catalog-productSummary-addToCart]').click();
    cy.contains('Product added to basket').should('be.visible');
    cy.get('[data-testid="cart-MiniCartPresentation-CartCount"]').should(
      $div => {
        // eslint-disable-next-line jest/valid-expect
        expect($div).to.have.text('1');
      }
    );
  });

  it('you must select a variant before you can add a product to cart', function() {
    cy.visit(this.data.pdp.product_url);
    cy.get('[data-testid=catalog-productSummary-addToCart]').should(
      'be.disabled'
    );
  });

  it('resolves when selections have been selected', function() {
    cy.visit(this.data.pdp.product_url);

    this.data.pdp.product_selection_indexes.forEach((itemIdx, selIdx) => {
      cy.get(`#downshift-${selIdx}-toggle-button`).click();
      cy.get(`#downshift-${selIdx}-item-${itemIdx}`).click({ force: true });
      cy.wait(500);
    });

    cy.get('[data-testid=catalog-productSummary-addToCart]').should(
      'not.disabled'
    );
  });

  it('redirects', function() {
    cy.visit(this.data.pdp.product_url);
    cy.location('pathname').should('eq', `${this.data.pdp.product_url}/_`);
  });
});
