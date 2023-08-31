/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { ApplicationConfig } from '@exo/frontend-common-app-shell';
import { AddressSearch } from '@exo/frontend-features-account-address-search';

export type CheckoutConfig = {
  feature: {
    addressBook: 'org' | 'personal' | 'none';
    addressSearch?: AddressSearch;
    separateDeliveryScreen: boolean;
  };
};

declare global {
  interface EXOFeatureConfig {
    checkout?: {
      allowOrgAddress?: boolean;
    };
  }
}

export const getCheckoutConfig = (config: ApplicationConfig): CheckoutConfig => {
  return {
    feature: {
      addressBook: config?.featureConfig?.checkout?.allowOrgAddress ? 'org' : 'personal',
      addressSearch: config?.featureConfig?.account?.profile?.addressSearch,
      separateDeliveryScreen: config?.featureConfig?.cart?.useZipIn === 'none'
    }
  };
};
