/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { ApplicationConfig } from '@exo/frontend-common-app-shell';

export type FeatureConfig = {
  feature: {
    vr: boolean;
  };
};

declare global {
  interface EXOFeatureConfig {
    automotive?: {
      vr?: boolean;
    };
  }
} 


export const getFeatureConfig = (config: ApplicationConfig): FeatureConfig => {
  return {
    feature: {
      vr: !!config?.featureConfig?.automotive?.vr
    }
  };
};
