/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

// This section is here to fail any tests where the
// browser uses consoler.error
//
// eslint-disable-next-line no-undef
import { gql } from '@apollo/client';

const AUTH_GQL = gql`
  mutation Auth($username: String, $password: String) {
    authLogin(username: $username, password: $password) {
      token
    }
  }
`;

const GET_CARTS_GQL = gql`
  query CartGet {
    me {
      carts {
        id
      }
    }
  }
`;

const DELETE_CART_GQL = gql`
  mutation CartDelete($cartId: ID!) {
    cartDelete(cartId: $cartId)
  }
`;

const ADD_TO_CART_GQL = gql`
  mutation AddToCart($lineItems: [CrtLineItemInput!]!, $cartId: ID) {
    cartAdd(cartId: $cartId, lineItems: $lineItems) {
      id
      lineItems {
        id
        quantity
      }
    }
  }
`;

const GET_ROLES = gql`
  query GetRoles {
    me {
      roles
    }
  }
`;

const getSession = () => JSON.parse(window.localStorage.getItem('sessionContext') ?? '{}');
const updateSession = session => {
  cy.window().then(w => {
    w.sessionContext.set(session);
  });
};

// Command to make GraphQL queries and mutations (for backchannel operations)
Cypress.Commands.add('gql', (query, opts) => {
  const { variables = {}, headers = {} } = opts ?? {};
  const url = Cypress.env('gqlEndpoint');

  const session = getSession();
  const baseHeaders = {};
  if (session.username) baseHeaders.username = session.username;
  if (session.token) baseHeaders.authorization = `Bearer ${session.token}`;

  return cy.request({
    method: 'POST',
    url,
    headers: { ...baseHeaders, ...headers },
    body: {
      operationName: query.definitions[0].name.value,
      variables,
      query: query.loc.source.body
    }
  });
});

Cypress.Commands.add('login', (username, password, clearCart = true) => {
  // Ensure logged out - which we cannot do on a non-public page
  cy.visit('/content/homepage');
  updateSession({ type: 'NONE', token: undefined });

  cy.gql(AUTH_GQL, { variables: { username, password } }).then(response => {
    // Code in sessionContext.js adds roles to roles from useAuthentication, rather than replace, so must be replicated here
    const baseRoles = ['user'];
    const { token } = response.body.data.authLogin;
    updateSession({
      token,
      username,
      type: 'USER'
    });

    cy.gql(GET_ROLES).then(responseRoles => {
      updateSession({
        roles: baseRoles.concat(responseRoles.body.data.me?.roles) ?? baseRoles
      });
    });

    if (clearCart) {
      cy.gql(GET_CARTS_GQL).then(responseCarts => {
        const carts = responseCarts.body.data.me?.carts?.map(c => c.id) ?? [];
        carts.map(id => cy.gql(DELETE_CART_GQL, { variables: { cartId: id } }));
      });
      updateSession({ cartCount: 0, cartId: undefined });
    }
  });
  cy.wait(2000);
});

Cypress.Commands.add('addToCart', (item, quantity = 1) => {
  cy.gql(ADD_TO_CART_GQL, {
    variables: {
      lineItems: [{ ...item, quantity }],
      cartId: getSession().cartId
    }
  }).then(response => {
    updateSession({ cartCount: 1, cartId: response.body.data.cartAdd.id });
  });
});

Cypress.on('window:before:load', win => {
  cy.stub(win.console, 'error', msg => {
    cy.task('log', `console.error --> ${msg}`);
    throw new Error(msg);
  });
});

Cypress.Commands.add('navigate', (route = '') => {
  return cy
    .window()
    .its('_exoHistory')
    .invoke('push', route);
});

Cypress.Commands.add('setResolution', size => {
  if (Cypress._.isArray(size)) {
    cy.viewport(size[0], size[1]);
  } else {
    cy.viewport(size);
  }
});

Cypress.Commands.add('navigateToCart', (username, password, cart) => {
  cy.login(username, password);
  cy.addToCart(cart.items[0]);

  cy.navigate('/cart/cart');
  cy.contains('Subtotal').should('be.visible');
  cy.wait(1000); // Need to wait after visiting cart as there might be pending updates
});
