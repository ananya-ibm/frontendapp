/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { makeProviderContext } from '@exo/frontend-common-provider';
import React, { useContext } from 'react';
import { CmsContextProvider as ProviderCmsContextProvider } from '@exo-provider/frontend-content-provider';
import { ApplicationConfig } from '@exo/frontend-common-app-shell';
import { CmsConfiguration, CmsContextInterface, CmsProviders } from '@exo/frontend-content-api-types';

export const CmsContext = makeProviderContext<
  CmsProviders,
  CmsConfiguration,
  CmsContextInterface
>();

export const useCmsContext = () => {
  return useContext(CmsContext);
};

export const CmsContextProvider = ({ children, configuration }: Props) => {
  const existingCmsContext = useCmsContext();

  // Ensure contexts are not nested
  if (existingCmsContext) {
    console.warn('CMS: Ignoring nested contexts');
    return children;
  }

  if (!configuration || !ProviderCmsContextProvider) {
    return <CmsContext.Provider value={{}}>{children}</CmsContext.Provider>;
  }

  return (
    <ProviderCmsContextProvider
      context={CmsContext}
      configuration={configuration?.featureConfig?.content!}
    >
      {children}
    </ProviderCmsContextProvider>
  );
};

type Props = {
  children: any;
  configuration: ApplicationConfig;
};
