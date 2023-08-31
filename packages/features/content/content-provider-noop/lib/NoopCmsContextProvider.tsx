/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { BaseProviderContextProvider } from '@exo/frontend-common-provider';
import { CmsProviderContextProvider } from '@exo/frontend-content-api-types';
import React from 'react';

export const CmsContextProvider: CmsProviderContextProvider = ({
  children,
  configuration,
  context
}) => {
  return (
    <BaseProviderContextProvider
      components={{}}
      value={{}}
      context={context}
      configuration={configuration}
    >
      {children}
    </BaseProviderContextProvider>
  );
};
