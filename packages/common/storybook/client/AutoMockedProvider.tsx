/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ApolloProvider, ApolloClient } from '@apollo/client';
import { SchemaLink } from '@apollo/client/link/schema';
import { makeExecutableSchema } from 'graphql-tools';
import { printSchema, buildClientSchema } from 'graphql/utilities';
import { cacheFactory } from '@exo/frontend-common-apollo';

// eslint-disable-next-line monorepo-cop/no-relative-import-outside-package 
import introspectionResult from '../../../../schema.json';

export const AutoMockedProvider = ({ children, mockResolvers, mockState }: Props) => {
  if (mockState === 'loading') {
    for (const q of Object.keys(mockResolvers?.Query ?? {})) {
      // eslint-disable-next-line no-param-reassign
      mockResolvers.Query[q] = () => new Promise(() => {});
    }
  }

  if (mockState === 'error') {
    for (const q of Object.keys(mockResolvers?.Query ?? {})) {
      // eslint-disable-next-line no-param-reassign
      mockResolvers.Query[q] = () => {
        throw new Error('Unknown error');
      };
    }
  }

  const schemaSDL = printSchema(
    // @ts-ignore
    // eslint-disable-next-line no-underscore-dangle
    buildClientSchema({ __schema: introspectionResult.__schema })
  );

  const schema = makeExecutableSchema({
    typeDefs: schemaSDL,
    resolvers: mockResolvers
  });

  const client = new ApolloClient({
    link: new SchemaLink({ schema }),
    cache: cacheFactory()
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

type Props = {
  mockResolvers?: any;
  mockState?: 'ok' | 'loading' | 'error';
  children: any;
};
