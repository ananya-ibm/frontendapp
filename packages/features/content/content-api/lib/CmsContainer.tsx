/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { BaseProviderComponent } from '@exo/frontend-common-provider';
import { CmsProviders } from '@exo/frontend-content-api-types';
import { CmsContext } from './CmsContext';

type CmsContainerType = NonNullable<CmsProviders['CmsContainer']>;

export const CmsContainer: CmsContainerType = ({ children, name, spec }) => {
  return (
    <BaseProviderComponent<React.ComponentProps<CmsContainerType>>
      name={name}
      spec={spec}
      _name="CmsContainer"
      _context={CmsContext}
    >
      {children}
    </BaseProviderComponent>
  );
};
