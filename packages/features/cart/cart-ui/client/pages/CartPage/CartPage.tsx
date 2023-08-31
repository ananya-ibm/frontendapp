/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/jsx-props-no-spreading */

import React, { useCallback, useState } from 'react';
import { Grid, Row, Column, Breadcrumb } from '@exo/frontend-components-base';
import { LayoutSpacing, MonetaryAmount } from '@exo/frontend-components-core';
import {
  CartContainer,
  DeliveryOptionsContainer,
  ShippingState,
  ZipInDeliveryOptionsContainer
} from '@exo/frontend-features-cart-logic';
import { ApplePayButton } from '@exo/frontend-features-payments-provider-apple-pay';
import { useHistory } from 'react-router-dom';
import { useSessionContext } from '@exo/frontend-common-session-context';
import { EmptyCart } from '@exo/frontend-components-commerce';
import { useIntl } from '@exo/frontend-common-i18n';
import * as S from './CartPage.styles';
import { CartItemList } from '../../components/CartItemList/CartItemList';
import { CartSubtotal } from '../../components/CartSubtotal/CartSubtotal';
import { CartButtons } from '../../components/CartButtons/CartButtons';
import { ZipInDeliveryOptions } from '../../components/ZipInDeliveryOptions/ZipInDeliveryOptions';
import { DeliveryOptions } from '../../components/DeliveryOptions/DeliveryOptions';
import { CartConfig } from '../../cartConfig';

export const CartPage = ({ config }: Props) => {
  const history = useHistory();
  const session = useSessionContext();
  const intl = useIntl('features.cart.cart-ui.pages.CartPage');

  const [shippingState, setShippingState] = useState<ShippingState>({
    storeId: session.storeId,
    storeName: session.storeName
  });
  const onShippingModeUpdate = useCallback(
    (state: ShippingState) => {
      if (state.storeId && state.storeId !== session.storeId) {
        session.set({ storeId: state.storeId, storeName: state.storeName });
      }
      setShippingState(state);
    },
    [session]
  );

  const canCheckout =
    config.feature.zipIn === 'none' ||
    ((shippingState.method && shippingState.method !== 'clickCollect') || !!shippingState.storeId);

  const checkout = useCallback(() => {
    session.set({
      checkout: {
        deliveryOption: shippingState?.method,
        storeId: session.storeId,
        storeName: session.storeName,
        shippingMode: shippingState?.shippingModeId
      }
    });

    if (session.type === 'USER') {
      history.push('/checkout/checkout');
    } else {
      history.push('/cart/account-selection');
    }
  }, [session, history, shippingState]);

  return (
    <>
      <LayoutSpacing size="sm" />

      <Grid>
        <Row>
          <Column>
            <Breadcrumb path={[{ url: '/cart/cart', label: 'Shopping Bag' }]} />
          </Column>
        </Row>

        {!session.cartId && (
          <EmptyCart
            primaryText={intl.msg('EmptyCart.primaryText', 'Continue Shopping')}
            primaryUrl="/"
          />
        )}
        {session.cartId && (
          <>
            <Row>
              <Column>
                <h1>{intl.msg('Cart.header', 'Shopping bag')}</h1>
                <LayoutSpacing size="sm" />
              </Column>
            </Row>

            <CartContainer
              render={(args) => (
                <>
                  <Row>
                    <Column>
                      <p>
                        <>
                          Your shopping bag contains{' '}
                          {args.cart.lineItems.reduce((p, c) => p + c.quantity, 0)} items and comes
                          to a total of <MonetaryAmount {...args.cart.grandTotal} />
                        </>
                      </p>
                    </Column>
                  </Row>

                  <LayoutSpacing size="md" />

                  <Row>
                    <Column md={5} lg={11}>
                      <CartItemList cart={args.cart} onItemUpdate={args.onItemUpdate} />
                    </Column>
                    <Column md={3} lg={5}>
                      <S.SubtotalDelivery>
                        <CartSubtotal cart={args.cart} />
                      </S.SubtotalDelivery>

                      {config.feature.zipIn === 'full' && (
                        <>
                          <LayoutSpacing size="sm" />
                          <ZipInDeliveryOptionsContainer
                            cartId={session.cartId!}
                            shippingState={shippingState}
                            country={session.country}
                            onShippingModeUpdate={onShippingModeUpdate}
                            render={(zipInArgs) => <ZipInDeliveryOptions {...zipInArgs} />}
                            renderLoading={() => <ZipInDeliveryOptions.Skeleton />}
                          />
                        </>
                      )}

                      {config.feature.zipIn === 'simple' && (
                        <>
                          <LayoutSpacing size="sm" />
                          <DeliveryOptionsContainer
                            cartId={session.cartId!}
                            shippingState={shippingState}
                            onShippingModeUpdate={onShippingModeUpdate}
                            render={(zipInArgs) => <DeliveryOptions {...zipInArgs} />}
                            renderLoading={() => <DeliveryOptions.Skeleton />}
                          />
                        </>
                      )}

                      <LayoutSpacing size="sm" />
                      <ApplePayButton />
                      <LayoutSpacing size="sm" />

                      <S.StickyBottom>
                        <CartButtons
                          isDisabled={!canCheckout}
                          next={intl.msg('CartButtons.next', 'Checkout')}
                          onNext={checkout}
                        />
                      </S.StickyBottom>
                    </Column>
                  </Row>
                </>
              )}
            />

          </>
        )}
      </Grid>
    </>
  );
};

type Props = {
  config: CartConfig;
};
