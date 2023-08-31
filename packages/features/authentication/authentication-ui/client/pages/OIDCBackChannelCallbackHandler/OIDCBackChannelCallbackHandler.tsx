/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { useHistory, useLocation } from 'react-router-dom';
import { useSessionContext } from '@exo/frontend-common-session-context';
import React, { useEffect, useState } from 'react';
import { LoadingIndicator } from '@exo/frontend-components-base';
import { useUserInfo } from '@exo/frontend-features-authentication-logic';
import { useEffectOnce, useRedirect } from '@exo/frontend-common-hooks';

export const OIDCBackChannelCallbackHandler = ({ cancelUrl, targetUrl, errorUrl }: Props) => {
  const { hash } = useLocation();
  const { redirect } = useRedirect();
  const session = useSessionContext();
  const [loadUserInfo, setLoadUserInfo] = useState(false);
  const { data, error } = useUserInfo({ skip: !loadUserInfo });
  const history = useHistory();

  const params = new URLSearchParams(hash.substring(1));

  useEffectOnce(() => {
    session
      .replace({
        token: 'cookie',
        username: 'unknown',
        type: 'USER',
        roles: ['user']
      })
      .then(() => {
        setLoadUserInfo(true);
      });
  });

  useEffect(() => {
    if (!data) return;

    // TODO: Maybe this should be sub instead of email
    session.set({ username: data.authUserInfo.email });
    history.push(targetUrl);
  }, [data]);

  useEffect(() => {
    if (params.get('authState') === 'error') {
      redirect(errorUrl);
    } else if (params.get('authState') === 'cancelled') {
      redirect(cancelUrl);
    }
  }, [params.get('authState')]);

  if (error) return <div>{JSON.stringify(error)}</div>;

  return <LoadingIndicator />;
};

type Props = {
  cancelUrl: string;
  targetUrl: string;
  errorUrl: string;
};
