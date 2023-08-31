/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { ApplicationConfig } from '@exo/frontend-common-app-shell';

type ZipInTypes = 'simple' | 'full' | 'none';

export type CartConfig = {
  feature: {
    zipIn: ZipInTypes;
  };
};

declare global {
  interface EXOFeatureConfig {
    cart?: {
      useZipIn?: ZipInTypes;
    };
  }
}

export const getCartConfig = (config: ApplicationConfig): CartConfig => {
  return {
    feature: {
      zipIn: config?.featureConfig?.cart?.useZipIn ?? 'none'
    }
  };
};
