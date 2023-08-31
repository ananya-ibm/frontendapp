/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { CmsConfiguration } from '@exo/frontend-content-api-types';

type Component = {
  name: string;
  props: {
    key: string;
    value: string;
  }[];
  children?: Component[];
};

const notFound = (cmsComponent: Component) => {
  return React.createElement('div', {}, `Component ${cmsComponent.name} not found`);
};

export const instantiateComponents = (
  cmsComponent: Component,
  key: string,
  componentMap?: CmsConfiguration['components']
) => {
  if (!componentMap) return notFound(cmsComponent);

  const component = componentMap.find(c => c.name === cmsComponent.name);

  if (component === undefined) return notFound(cmsComponent);

  const props: Record<string, string> = {};
  for (const p of cmsComponent.props) {
    props[p.key] = p.value;
  }
  props.key = key;

  return React.createElement(
    component.component,
    props,
    (cmsComponent.children || []).map((c, idx) =>
      instantiateComponents(c, `${key} ${idx}`, componentMap)
    )
  );
};
