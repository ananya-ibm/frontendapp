/*
 Licensed Materials - Property of IBM
 694906H
 (c) Copyright IBM Corp.  2020 All Rights Reserved

 US Government Users Restricted Rights - Use, duplication or disclosure restricted
 by GSA ADP Schedule Contract with IBM Corp.
 */

import React from 'react';
import { useOIDC } from '@exo/frontend-features-authentication-logic';
import { LoadingIndicator } from '@exo/frontend-components-base';
import { AuthenticationConfig } from '../../authenticationConfig';
import { useEffectOnce, useRedirect } from '@exo/frontend-common-hooks';

export const OIDCLoginPage = ({ config }: Props) => {
  const { redirect } = useRedirect();
  const oidc = useOIDC();

  useEffectOnce(() => {
    if (config.oidc?.flow === 'OPENID_CONNECT__PKCE_BACK_CHANNEL') {
      oidc
        .requestAuthorizationUrl(`${config.oidc?.publicUrl}/auth/callback`, config.oidc?.flow)
        .then(d => {
          redirect(d.data.authRequestAuthorizationUrl);
        });
    } else if (config.oidc?.flow === 'OPENID_CONNECT__PKCE_FRONT_CHANNEL') {
      oidc
        .requestAuthorizationUrl(`${config.oidc?.publicUrl}/auth/callback/code`, config.oidc?.flow)
        .then(d => {
          redirect(d.data.authRequestAuthorizationUrl);
        });
    }
  });

  return <LoadingIndicator />;
};

type Props = {
  config: AuthenticationConfig;
};
