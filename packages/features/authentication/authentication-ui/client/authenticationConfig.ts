/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { ApplicationConfig } from '@exo/frontend-common-app-shell';

declare global {
  interface EXOFeatureConfig {
    authentication?: {
      flow?: string;
      publicUrl?: string;
      carrier?: string;
      loginRedirect?: string;
    };
  }
}
export type AuthenticationConfig = {
  feature: {
    authenticationMode: 'oidc' | 'simple';
  };
  oidc?: {
    flow: string;
    publicUrl: string;
  };
  login: {
    postLoginRedirect: string;
  };
};

export const getAuthenticationConfig = (config: ApplicationConfig): AuthenticationConfig => {
  return {
    feature: {
      authenticationMode: config?.featureConfig?.authentication?.flow?.includes('OPENID_CONNECT')
        ? 'oidc'
        : 'simple'
    },
    oidc: {
      flow: config?.featureConfig?.authentication?.flow!,
      publicUrl: config?.featureConfig?.authentication?.publicUrl!
    },
    login: {
      postLoginRedirect: config.featureConfig?.authentication?.loginRedirect ?? '/content/homepage'
    }
  };
};
