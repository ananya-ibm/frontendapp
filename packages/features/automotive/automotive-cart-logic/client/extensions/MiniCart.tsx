/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import { useSessionContext } from '@exo/frontend-common-session-context';
import { gql } from '@apollo/client';
import { MiniCartPresentation } from '../components/MiniCartPresentation';
import { useCart } from '../hooks/useCart';

export const MiniCart = () => {
  const sessionContext = useSessionContext();
  const { data, loading, error } = useCart<any>({}, MiniCart.fragment);

  const updateCartCount = newVal => {
    if (sessionContext.cartCount !== newVal) {
      sessionContext.set({ cartCount: newVal });
    }
  };

  const updateCartId = newVal => {
    if (sessionContext.cartId !== newVal) {
      sessionContext.set({ cartId: newVal });
    }
  };

  if (!loading) {
    if (error) {
      updateCartCount(undefined);
    } else if (data?.me?.carts?.length) {
      if (sessionContext.cartCount === undefined) {
        updateCartCount(
          data?.me.carts[0].lineItems.map(li => li.quantity).reduce((a, b) => a + b, 0)
        );
      }
      if (sessionContext.cartId === undefined) {
        updateCartId(data?.me.carts[0].id);
      }
    }
  }

  return (
    <MiniCartPresentation
      count={sessionContext.type === 'NONE' ? 0 : sessionContext.cartCount || 0}
    />
  );
};

MiniCart.fragment = gql`
  fragment MiniCart on CrtCart {
    id
    grandTotal {
      value
      currency
    }
    lineItems {
      id
      quantity
    }
  }
`;
