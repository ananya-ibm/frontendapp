/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/**
 * This link adds a queryString to the end of each GQL URL making it easier
 * to see what each request is doing in the browser devtools
 */

import { ApolloLink } from '@apollo/client';
import { FragmentDefinitionNode } from 'graphql';

export const namedLink = (endpoint: string) =>
  new ApolloLink((operation, forward) => {
    if (operation.query && operation.query.definitions.length > 1) {
      operation.setContext(() => ({
        uri: `${endpoint}?${operation.operationName}/${operation.query.definitions
          .filter(d => d.kind === 'FragmentDefinition')
          .map(d => (d as FragmentDefinitionNode).name.value)
          .join(', ')}`
      }));
    } else {
      operation.setContext(() => ({
        uri: `${endpoint}?${operation.operationName}`
      }));
    }
    return forward ? forward(operation) : null;
  });
