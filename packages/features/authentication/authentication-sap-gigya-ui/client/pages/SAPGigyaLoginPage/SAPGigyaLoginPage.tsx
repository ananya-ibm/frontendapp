/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/jsx-props-no-spreading */

import React, { useLayoutEffect } from 'react';
import { LayoutSpacing } from '@exo/frontend-components-core';
import { Grid, Row, Column, Breadcrumb } from '@exo/frontend-components-base';
import { useSessionContext } from '@exo/frontend-common-session-context';
import { gql, useApolloClient } from '@apollo/client';
import { useHistory } from 'react-router';
import { AuthenticationConfig } from '../../authenticationConfig';

export const SAPGigyaLoginPage = ({ config }: Props) => {
  const sessionContext = useSessionContext();
  const apolloClient = useApolloClient();
  const history = useHistory();

  useLayoutEffect(() => {
    const scripts = document.head.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i += 1) {
      const s = scripts.item(i)!;
      if (s.id === 'gigya-script') return;
    }

    const script = document.createElement('script');
    script.id = 'gigya-script';
    script.type = 'text/javascript';
    script.lang = 'javascript';
    script.src = config.url!;
    script.innerText = "{ include: 'id_token' }";
    script.addEventListener('load', () => {
      (window as any).gigya.socialize.addEventHandlers({
        onLogin: async e => {
          const { UID, UIDSignature, id_token, signatureTimestamp, user } = e;
          const { firstName, lastName, email } = user;

          // TODO: For some reason the first is not updated
          sessionContext.set({
            firstName,
            lastName,
            email,
            username: email
          });

          const res = await apolloClient.mutate({
            mutation: gql`
              mutation GigyaCallback($idToken: String, $params: [AutParam!]) {
                authCallback(idToken: $idToken, parameters: $params) {
                  token
                }
              }
            `,
            variables: {
              idToken: id_token,
              params: [
                { name: 'flow', value: 'social-login' },
                { name: 'UID', value: UID },
                { name: 'UIDSignature', value: UIDSignature },
                { name: 'signatureTimestamp', value: signatureTimestamp }
              ]
            }
          });

          // TODO: Add expiry time
          sessionContext.set({
            firstName,
            lastName,
            email,
            username: email,
            token: res.data.authCallback.token,
            type: 'USER',
            roles: ['customer', 'user']
          });

          /* console.log('*************************');
          console.log(e);
          console.log(res); */

          history.push('/home/homepage');
        }
      });

      (window as any).gigya.accounts.showScreenSet({
        screenSet: 'Default-RegistrationLogin',
        containerID: 'gigyaContainer'
      });
    });
    document.head.appendChild(script);
  }, []);

  return (
    <>
      <LayoutSpacing size="sm" />
      <Grid>
        <Row>
          <Column sm={'100%'}>
            <Breadcrumb path={[{ url: '/account-profile/login', label: 'Login' }]} />
            <LayoutSpacing size="sm" />
          </Column>
        </Row>

        <Row>
          <Column sm={'100%'}>
            <h1>Login</h1>
            <LayoutSpacing size="sm" />
          </Column>
        </Row>

        <Row>
          <Column sm={'100%'}>
            <div id="gigyaContainer"></div>
          </Column>
        </Row>
      </Grid>
    </>
  );
};

type Props = {
  config: AuthenticationConfig;
};
