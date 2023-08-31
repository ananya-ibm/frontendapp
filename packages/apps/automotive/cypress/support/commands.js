/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import {gql} from '@apollo/client';

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

const GET_ROLES = gql`
  query GetRoles {
    me {
      roles
    }
  }
`;

const DELETE_CART_GQL = gql`
  mutation CartDelete($cartId: ID!) {
    cartDelete(cartId: $cartId)
  }
`;

const getSession = () =>
  JSON.parse(window.localStorage.getItem('sessionContext') ?? '{}');
const updateSession = session => {
  cy.window().then(w => {
    w.sessionContext.set(session);
  });
};

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
    const { token } = response.body.data.authLogin;
    updateSession({ token, username, type: 'USER' });

    cy.gql(GET_ROLES).then(responseRoles => {
      updateSession({ roles: responseRoles.body.data.me?.roles ?? ['user'] });
    });

    if (clearCart) {
      cy.gql(GET_CARTS_GQL).then(responseCarts => {
        const carts = responseCarts.body.data.me?.carts?.map(c => c.id) ?? [];
        carts.map(id => cy.gql(DELETE_CART_GQL, { variables: { cartId: id } }));
      });
      updateSession({ cartCount: 0, cartId: undefined });
    }
  });
  cy.wait(1000);
});

Cypress.Commands.add('setResolution', size => {
  if (Cypress._.isArray(size)) {
    cy.viewport(size[0], size[1]);
  } else {
    cy.viewport(size);
  }
});
