/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { ApplicationConfig, Extensions, WithSeoRewrites } from '@exo/frontend-common-app-shell';

declare global {
  interface EXOFeatureConfig {
    catalog?: CatalogConfig;
  }
}

export type CatalogConfig = WithSeoRewrites<{
  useSlugs?: boolean;
  useSlugseparator?: boolean;

  /** in case useSlugseparator, what is the separator string - check adapter for correct value */
  slugSeparator?: string;

  // TODO: We should remove this
  baseSort?: string;

  // TODO: ... and this
  baseFacets?: string[];
  defaultStoreId?: string;
  defaultCurrency?: string;
  plp?: {
    /** stock availability on PLP */
    availability?: 'online' | 'store' | 'online+store';

    /** enable/disable reviews on PLP */
    reviews?: boolean;
  };
  pdp?: {
    availability?: 'online' | 'store' | 'online+store';
    template: 'standard' | 'hero';
    extensions?: Extensions<'heroBar'>;

    /** enable/disable reviews on PDP */
    reviews?: boolean;
  };
  search?: {
    extensions?: Extensions<'form'>;
  };
  // TODO: We should remove this
  filters?: {
    includesPrice?: boolean;
  };
  speechly?: {
    appID?: string;
    appLang?: string;
  };
}>;

export const getCatalogConfig = (config: ApplicationConfig): CatalogConfig => {
  return config.featureConfig?.catalog ?? {};
};
