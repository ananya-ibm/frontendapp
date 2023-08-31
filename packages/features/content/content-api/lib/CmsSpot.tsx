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

type CmsSpotType = NonNullable<CmsProviders['CmsSpot']>;

export const CmsSpot = ({ spec, name, children, render = content => content }: Props) => {
  return (
    // @ts-ignore
    <BaseProviderComponent<React.ComponentProps<CmsSpotType>>
      // @ts-ignore
      name={name}
      spec={spec}
      render={render}
      _name="CmsSpot"
      _context={CmsContext}
    >
      {children ? render(children) : null}
    </BaseProviderComponent>
  );
};

type Props = {
  children?: any;
  name: string;
  spec?: Record<string, string>;
  render?: (content: any) => React.ReactElement;
};
