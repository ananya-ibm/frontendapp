/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { ApplicationConfig } from '@exo/frontend-common-app-shell';
import { AddressSearch } from '@exo/frontend-features-account-address-search';

export type AccountProfileConfig = {
  feature: {
    requireOldPasswordsWhenChanging: boolean;
    addressSearch?: AddressSearch;
  };
};

declare global {
  interface EXOFeatureConfig {
    account?: {
      profile?: {
        requireOldPasswordWhenChanging?: boolean;
        addressSearch?: AddressSearch;
      };
      accounts?: {
        title: string;
        id: string;
        url: string;
        items?: { url: string; text: string; id: string }[];
      }[];
    };
  }
}

export const getAccountProfileConfig = (config: ApplicationConfig): AccountProfileConfig => {
  return {
    feature: {
      requireOldPasswordsWhenChanging:
        config?.featureConfig?.account?.profile?.requireOldPasswordWhenChanging ?? false,
      addressSearch: config?.featureConfig?.account?.profile?.addressSearch
    }
  };
};
