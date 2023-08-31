/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import { useIntl } from '@exo/frontend-common-i18n';
import { LayoutSpacing, MonetaryAmount } from '@exo/frontend-components-core';
import { Address } from '@exo/frontend-components-commerce';
import { useCheckoutContext } from '@exo/frontend-features-checkout-logic';
import { CartSummary } from '../../components/CartSummary/CartSummary';
import * as S from './ConfirmationPage.styles';
import { InvoicePDF } from '../../components/InvoicePDF/InvoicePDF';
import { Button, ButtonGroup, Column, Grid, Row } from '@exo/frontend-components-base';
import { getClientImagePath } from '@exo/frontend-common-utils';
import { useHistory } from 'react-router-dom';

const ConfirmationPage = () => {
  const intl = useIntl('features.checkout.checkout-ui.pages.ConfirmationPage');
  const { checkout } = useCheckoutContext();
  const history = useHistory();
  const cart = checkout.context.cartSummary;

  return (
    <Grid>
      <LayoutSpacing size="sm" />
      <LayoutSpacing size="sm" />
      <Row>
        <Column>
          <S.ConfirmationPageHead>
            <h2>{intl.msg('header.confirmation', "It's ordered!")}</h2>
            <p>
              Thanks! You should receive an email with all your order and tracking information.{' '}
            </p>
          </S.ConfirmationPageHead>
        </Column>
      </Row>

      <Row>
        <Column>
          <S.OrderID>
            <b>Order ID:</b> {checkout.context.cartId}
          </S.OrderID>
        </Column>
      </Row>

      <Row>
        {checkout.context.shippingAddress && checkout.context.shippingAddress.address1 && (
          <S.AddressColumn sm="2" md="4" lg="5">
            <Address
              title={intl.msg('Checkoutaddress.shippingaddress', 'Shipping Address')}
              address={checkout.context.shippingAddress}
            />
          </S.AddressColumn>
        )}
        {checkout.context.billingAddress && checkout.context.billingAddress.address1 && (
          <S.AddressColumn sm="2" md="4" lg="5">
            <Address
              title={intl.msg('Checkoutaddress.billingaddress', 'Billing Address')}
              address={checkout.context.billingAddress}
            />
          </S.AddressColumn>
        )}
      </Row>

      <Row>
        <Column>
          <LayoutSpacing size="sm" />
          <S.Subtitle>What you ordered</S.Subtitle>
          <Grid>
            {cart.lineItems.map((item) => (
              <React.Fragment key={item.id}>
                <Row>
                  <Column sm="3" md="4" lg="5">
                    <S.TitleAndThumbnail>
                      <S.Thumbnail
                        src={getClientImagePath(item.product.thumbnail)}
                        alt={item.product.name}
                      />
                      <S.Caption>
                        <S.Name>{item.product.name}</S.Name>
                        <S.Partnumber>{item.product.partnumber}</S.Partnumber>
                      </S.Caption>
                    </S.TitleAndThumbnail>
                  </Column>
                  <S.ColumnHideOnMobile md="1" lg="1">
                    <p>qty {item.quantity}</p>
                  </S.ColumnHideOnMobile>
                  <S.ColumnHideOnMobile md="1" lg="2">
                    <S.UnitPrice>
                      à{' '}
                      <MonetaryAmount
                        value={item.unitPrice.value}
                        currency={item.linePrice.currency}
                      />
                    </S.UnitPrice>
                  </S.ColumnHideOnMobile>
                  <Column sm="1" md="2" lg="2">
                    <p style={{ textAlign: 'right' }}>
                      <S.ShowOnMobile>
                        {item.quantity} x&nbsp; 
                      </S.ShowOnMobile>
                      <MonetaryAmount
                        value={item.linePrice.value}
                        currency={item.linePrice.currency}
                      />
                    </p>
                  </Column>
                </Row>
                <LayoutSpacing size="sm" />
              </React.Fragment>
            ))}

            <Row>
              <Column md="8" lg="5"></Column>
              <Column md="8" lg="5">
                <CartSummary
                  cart={cart}
                  isConfirmation
                />
              </Column>
            </Row>
          </Grid>
        </Column>
      </Row>
      <Row>
        <Column>
          <LayoutSpacing size="xl" />
          <ButtonGroup isLeft>
            <InvoicePDF
              cart={checkout.context.cartSummary}
              billingAddress={checkout.context.billingAddress}
              shippingAddress={checkout.context.shippingAddress}
            />
            <Button 
              variant="tertiary"
              label="Back to shop"
              onClick={() => history.push('/')}
            />
          </ButtonGroup>
          <LayoutSpacing size="xl" />
        </Column>
      </Row>
    </Grid>
  );
};

export default ConfirmationPage;
