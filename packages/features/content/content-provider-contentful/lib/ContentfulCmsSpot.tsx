/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable no-else-return, no-underscore-dangle */
import React from 'react';
import { CmsProviders } from '@exo/frontend-content-api-types';
import { useContainerContext } from './ContentfulCmsContainer';

type CmsSpotType = NonNullable<CmsProviders['CmsSpot']>;

export const ContentfulCmsSpot: CmsSpotType = ({ name, spec, render, children }) => {
  const content = useContainerContext();

  const activeSpec: Record<string, string> = spec ?? {};
  activeSpec.name = name;

  if (!content || !content[activeSpec.name]) {
    return <>{children}</>;
  } else {
    const c = content[activeSpec.name];
    if (Array.isArray(c)) {
      return c.map((cc, idx) => render(React.createElement(cc._component, { ...cc, key: idx })));
    } else {
      return render(React.createElement(c._component, c));
    }
  }
};
