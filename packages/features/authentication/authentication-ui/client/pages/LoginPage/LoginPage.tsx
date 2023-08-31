/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { LayoutSpacing } from '@exo/frontend-components-core';
import { Grid, Row, Column, Breadcrumb } from '@exo/frontend-components-base';
import { LoginPaneContainer } from '@exo/frontend-features-authentication-logic';
import { useHistory } from 'react-router-dom';
import { LoginPane } from '../../components/LoginPane/LoginPane';
import { AuthenticationConfig } from '../../authenticationConfig';

export const LoginPage = ({ config }: Props) => {
  const history = useHistory();

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
            <LoginPaneContainer
              onLoggedIn={() => history.push(config.login.postLoginRedirect)}
              render={args => (
                <LoginPane {...args} onRegister={() => history.push('/account-profile/register')} />
              )}
            />
          </Column>
        </Row>
      </Grid>
    </>
  );
};

type Props = {
  config: AuthenticationConfig;
};
