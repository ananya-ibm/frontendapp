/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { CmsProviderContextProvider } from '@exo/frontend-content-api-types';
import { BaseProviderContextProvider } from '@exo/frontend-common-provider';
import { GraphQLCmsContainer } from './GraphQLCmsContainer';
import { GraphQLCmsSpot } from './GraphQLCmsSpot';

export const CmsContextProvider: CmsProviderContextProvider = ({
  children,
  configuration,
  context
}) => {
  return (
    <BaseProviderContextProvider
      components={{
        CmsContainer: GraphQLCmsContainer,
        CmsSpot: GraphQLCmsSpot
      }}
      value={{}}
      context={context}
      configuration={configuration}
    >
      {children}
    </BaseProviderContextProvider>
  );
};
