/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { CmsConfiguration } from '@exo/frontend-content-api-types';

declare global {
  // Extension for CMS provider specific component level config
  interface EXOCmsComponentConfig {}

  // Extension for CMS provider specific config
  interface EXOCmsConfig {}

  // Extension for CMS provider specific context vars
  interface EXOCmsContext {}

  interface EXOFeatureConfig {
    content?: CmsConfiguration;
  }
}

export * from './CmsContainer';
export * from './CmsContext';
export * from './CmsSpot';
