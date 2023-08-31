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
import { createClient } from 'contentful';
import { ContentfulCmsSpot } from './ContentfulCmsSpot';
import { ContentfulCmsContainer } from './ContentfulCmsContainer';

export const CmsContextProvider: CmsProviderContextProvider = ({
  children,
  configuration,
  context
}) => {
  return (
    <BaseProviderContextProvider
      components={{
        CmsContainer: ContentfulCmsContainer,
        CmsSpot: ContentfulCmsSpot
      }}
      value={{
        contentful: {
          api: createClient({
            space: configuration.contentful!.space,
            accessToken: configuration.contentful!.accessToken
          })
        }
      }}
      context={context}
      configuration={configuration}
    >
      {children}
    </BaseProviderContextProvider>
  );
};
