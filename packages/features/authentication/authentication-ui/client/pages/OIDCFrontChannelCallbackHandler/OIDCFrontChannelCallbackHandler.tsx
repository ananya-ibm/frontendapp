/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { useAppShellContext } from '@exo/frontend-common-app-shell';
import { useSessionContext } from '@exo/frontend-common-session-context';
import { useHistory, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { LoadingIndicator } from '@exo/frontend-components-base';
import { useOIDC, useUserInfo } from '@exo/frontend-features-authentication-logic';
import { useEffectOnce, useRedirect } from '@exo/frontend-common-hooks';

type State = 'initial' | 'loadUserInfo';

// TODO: Add support for errorUrl
export const OIDCFrontChannelCallbackHandler = ({ cancelUrl, targetUrl }: Props) => {
  const { featureConfig } = useAppShellContext();
  const location = useLocation();
  const oidc = useOIDC();
  const { redirect } = useRedirect();
  const session = useSessionContext();
  const [state, setState] = useState<State>('initial');
  const { data, error } = useUserInfo({ skip: state !== 'loadUserInfo' });
  const history = useHistory();

  const params = new URLSearchParams(
    location.hash === '' ? location.search.substring(1) : location.hash.substring(1)
  );

  // This is essentially a state machine
  //   -> initial -> loadUserInfo
  //   -> error   -> error
  useEffectOnce(() => {
    if (state !== 'initial') return;

    if (params.has('code')) {
      oidc.callback(params.get('code'), params.get('state')).then(a => {
        session
          .replace({
            token:
              featureConfig?.authentication?.carrier === 'cookie'
                ? 'cookie'
                : a.data.authCallback.token,
            username: 'unknown',
            type: 'USER',
            roles: ['user']
          })
          .then(() => {
            setState('loadUserInfo');
          });
      });
    }
  });

  useEffect(() => {
    if (! data) return;

    session.set({ username: data.authUserInfo.email });
    history.push(targetUrl);
  }, [data])

  useEffect(() => {
    if (params.has('error')) redirect(cancelUrl);
  }, [params.has('error')]);

  if (error) return <div>{JSON.stringify(error)}</div>;

  return <LoadingIndicator />;
};

type Props = {
  cancelUrl: string;
  targetUrl: string;
};
