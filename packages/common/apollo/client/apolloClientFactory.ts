/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { from, ApolloClient, split } from '@apollo/client';
import { BatchHttpLink } from '@apollo/client/link/batch-http';
import { createHttpLink } from '@apollo/client/link/http';
import { getMainDefinition } from '@apollo/client/utilities';
import { cacheFactory } from './cache/cacheFactory';
import { errorLink } from './links/errorLink';
import { namedLink } from './links/namedLink';
import { intlLink } from './links/intlLink';
import { authLink } from './links/authLink';
import { loggingLink } from './links/loggingLink';
import { uniqueRequestIdLink } from './links/uniqueRequestIdLink';
import { smartBatchLink } from './links/smartBatchLink';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

declare global {
  interface Window {
    __APOLLO_STATE__: any;
  }
}

type Args = { ssrMode?: boolean; batch?: boolean; endpoint: string };

export const apolloClientFactory = ({ ssrMode, endpoint }: Args) => {
  const isSSR = typeof window === 'undefined';
  const isDevMode = process.env.NODE_ENV === 'development';

  const links: any[] = [];

  const rootLink = process.env.GRAPHQL_BATCH === 'TRUE'
    ? new BatchHttpLink({ credentials: 'include', uri: endpoint })
    : createHttpLink({ credentials: 'include', uri: endpoint });
    

  links.push(errorLink);
  
  const WsGraphQL = process.env.GRAPHQL_ENDPOINT?.replace('http' || 'https', 'ws')
  const wsLink = new GraphQLWsLink(
    createClient({
    // TODO: We probably need to extend the wsLink with additional links to handle auth, logging etc
    url: WsGraphQL ? WsGraphQL : 'ws://localhost:4002/graphql'
  }));

  if (isDevMode) {
    links.push(namedLink(endpoint));
    if (process.env.DEVMODE_GQL_LOGGING === 'TRUE') {
      links.push(loggingLink);
    }
  }

  links.push(intlLink);
  links.push(uniqueRequestIdLink);
  links.push(authLink);
  if (process.env.APOLLO_SMART_BATCH === 'TRUE') {
    links.push(smartBatchLink);
  }
  links.push(rootLink);

  const httpLink = from(links);

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );

  return new ApolloClient({
    link: splitLink,
    ssrMode,
    assumeImmutableResults: true,
    cache: cacheFactory().restore(
      // eslint-disable-next-line no-underscore-dangle
      isSSR ? {} : window.__APOLLO_STATE__
    )
  });
};