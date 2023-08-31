/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { CmsConfiguration } from '@exo/frontend-content-api-types';

export const getSpotComponentResourceType = (config: CmsConfiguration) => {
  return `${config.aem?.siteName}/${config.components.find(c => c.name === 'cmsSpot')?.aem?.name}`;
};

export type ContentItem = {
  ':items': Record<string, ContentItem>;
  ':type': string;
};

export const getSpots = (
  root: ContentItem,
  path: string,
  resourceType: string
): Record<string, ContentItem> => {
  let m = {};

  if (!root[':items']) return m;

  for (const [key, child] of Object.entries(root[':items'])) {
    m = { ...m, ...getSpots(child, `${path}/${key}`, resourceType) };

    if (child[':type'] === resourceType) {
      m = { ...m, [`${path}/${key}`]: child };
    }
  }
  return m;
};
