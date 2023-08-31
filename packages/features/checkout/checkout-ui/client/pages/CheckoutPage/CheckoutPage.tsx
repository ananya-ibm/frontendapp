/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/jsx-props-no-spreading */

import React, { useEffect } from 'react';
import { LayoutSpacing } from '@exo/frontend-components-core';
import { Grid, Row, Column, Steps, Step } from '@exo/frontend-components-base';
import { useCheckoutContext } from '@exo/frontend-features-checkout-logic';
import { useHistory } from 'react-router-dom';
import { CheckoutStep } from './CheckoutStep';
import * as S from './CheckoutPage.styles';
import { CheckoutSidebar } from '../../components/CheckoutSidebar/CheckoutSidebar';
import { CheckoutConfig } from '../../checkoutConfig';
import { CartContainer } from '@exo/frontend-features-cart-logic';

export const CheckoutPage = ({ config, store, shippingModeId }: Props) => {
  const history = useHistory();

  const { dispatch, stateDescriptions, checkout, loading, error } = useCheckoutContext();

  useEffect(() => {
    dispatch({ type: 'INIT_SHIPPING', store, shippingModeId });
  }, [store, shippingModeId]);

  const { stateList } = checkout.context;
  const currentStep = stateList.findIndex(s => s.state === checkout.state);
  const stepDetail = stateList.map(s => ({ ...s, ...stateDescriptions[s.state] }));

  useEffect(() => {
    if (checkout.state === 'summary') {
      history.push('/checkout/confirmation');
    } else if (checkout.state === 'cart') {
      history.push('/cart/cart');
    }
  }, [checkout.state]);

  if (loading || checkout.context.loading)
    return (
      <Grid>
        <S.CheckoutPage>
          <LayoutSpacing size="sm" />
          Loading...
        </S.CheckoutPage>
      </Grid>
    );
  if (error) return <div>Error</div>;

  if (checkout.state === 'summary' || checkout.state === 'cart') return null;

  return (
    <Grid>
      <S.CheckoutPage>
        <LayoutSpacing size="sm" />
        <Row>
          <Column>
            <Steps current={currentStep} variant="full-width">
              {stepDetail.filter(step => !step.hidden).map(step => (
                <Step
                  key={step.label}
                  isDisabled={step.enabled !== undefined && !step.enabled}
                  title={step.label!}
                  description={step.secondaryLabel}
                />
              ))}
            </Steps>
            <LayoutSpacing size="sm" />
          </Column>
        </Row>

        <Row>
          <Column md={6} lg={11}>
            <S.StepContentWrapper>
              <CheckoutStep config={config} step={checkout.state} />
            </S.StepContentWrapper>
          </Column>

          <Column md={2} lg={5}>
            <CartContainer
              render={args => (
                <CheckoutSidebar {...args} />
              )}
            />
          </Column>
        </Row>
        <LayoutSpacing size="sm" />
      </S.CheckoutPage>
    </Grid>
  );
};

type Props = {
  config: CheckoutConfig;
  store?: string;
  shippingModeId?: string;
};
