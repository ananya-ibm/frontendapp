/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { useHistory } from 'react-router-dom';
import React from 'react';
import { CartConfig } from '../../cartConfig';
import { LayoutSpacing } from '@exo/frontend-components-core';
import { Breadcrumb, Button, Column, Grid, Row } from '@exo/frontend-components-base';
import * as S from './AccountSelectionPage.styles';
import { LoginPaneContainer } from '@exo/frontend-features-authentication-logic';
import { LoginForm } from '@exo/frontend-components-forms';

const AccountSelectionPage = ({ }: Props) => {
  const history = useHistory();
  return (
    <>
      <LayoutSpacing size="sm" />

      <Grid>
        <Row>
          <Column>
            <Breadcrumb path={[{ url: '/cart/cart', label: 'Continue to checkout' }]} />
          </Column>
        </Row>

        <Row>
          <Column>
            <h1>Continue to checkout</h1>
            <LayoutSpacing size="sm" />
          </Column>
        </Row>

        <Row>
          <Column lg={8} md={4}>
            <S.Panel>
              <h2>Existing customer</h2>
              <LayoutSpacing size="sm" />

              {/* TODO: Add support for OIDC here */}
              <LoginPaneContainer
                onLoggedIn={() => history.push('/checkout/checkout')}
                render={args => (
                  <LoginForm 
                    onSubmit={({ username, password }) => args.onLogin(username, password)}
                    error={args.error}
                    renderFooter={() => (
                      <S.Button>
                        <Button type="submit" label="Sign in" />
                      </S.Button>
                    )}
                  />
                )}
              />
            </S.Panel>
          </Column>

          <Column lg={8} md={4}>
          <S.Panel>
              <h2>New customer</h2>

              <LayoutSpacing size="sm" />
              <S.Button>
                <Button variant='tertiary' label="Sign up and checkout" onClick={() => console.log('Not implemented yet')}/>
                <Button variant='tertiary' label="Continue as guest" onClick={() => history.push('/checkout/checkout')}/>
              </S.Button>
            </S.Panel>
          </Column>
        </Row>
      </Grid>
    </>
  );
};

type Props = {
  config: CartConfig;
};

export default AccountSelectionPage;
