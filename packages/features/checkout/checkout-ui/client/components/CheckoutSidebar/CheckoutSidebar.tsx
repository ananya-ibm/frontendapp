/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import { LayoutSpacing } from '@exo/frontend-components-core';
import { Cart, CartContainerRenderProps } from '@exo/frontend-features-cart-logic';
import { CartSummary } from '../CartSummary/CartSummary';

export const CheckoutSidebar = ({ cart }: Props) => {
  return (
    <>
      <CartSummary
        cart={cart}
      />

      {/* TODO: Find a way to make this work */}
      {/*
      <S.SubmitButton>      
        <Button disabled label="Almost done" />
      </S.SubmitButton>
      */}
      <LayoutSpacing size="xl" />

    </>
  );
};

CheckoutSidebar.Skeleton = () => <div>Loading...</div>;

type Props = CartContainerRenderProps & {
  cart: Cart;
};
