/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { CmsComponent } from '@exo/frontend-content-api-types';
import React from 'react';
import { ContainerDefinition, ContainerDefinitions, Content } from './types';

export const findMatchingEntry = (
  data: ContainerDefinitions,
  name: string,
  spec: Record<string, string> | undefined
) => {
  const matchingPageEntry = data[name];
  return matchingPageEntry?.(spec);
};

export const findMatchingSpot = (
  entry: ContainerDefinition | undefined,
  name: string,
  spec: Record<string, string> | undefined
) => {
  // TODO: Fix these ts-ignore
  // @ts-ignore
  if (!entry || !entry.spots) return undefined;
  // @ts-ignore
  return entry.spots[name]?.(spec);
};

export const makeComponents = (content: Content[], components: CmsComponent[]) => {
  return content.map((c, idx) => {
    const cmsComponent = components.find((cmp) => cmp.name === c.component);
    if (!cmsComponent) throw new Error(`Component ${c.component} not defined`);
    return React.createElement(cmsComponent.component, { ...c.props, key: idx });
  });
};
