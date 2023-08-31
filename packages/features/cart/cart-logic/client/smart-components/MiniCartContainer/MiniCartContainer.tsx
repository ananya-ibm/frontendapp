/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import { ReactElement, useEffect } from 'react';
import { useSessionContext } from '@exo/frontend-common-session-context';
import { gql } from '@apollo/client';
import {
  renderDefaultError,
  renderDefaultLoading,
  SmartComponentProps
} from '@exo/frontend-common-utils';
import { useCart } from '../../hooks/useCart';
import { MonetaryAmount } from '../../model/monetaryAmount';

export const MiniCartContainer = ({
  render,
  renderError = renderDefaultError,
  renderLoading = renderDefaultLoading
}: Props) => {
  const sessionContext = useSessionContext();
  const { data, loading, error } = useCart<MiniCartResponse>(
    { cartId: sessionContext.cartId! },
    MiniCartContainer.fragment
  );

  const updateCartCount = (ctx: CartSession) => {
    if (ctx?.cartId !== sessionContext.cartId || ctx?.cartCount !== sessionContext.cartCount) {
      sessionContext.set(ctx);
    }
  };

  // TODO: Should this really be in the MiniCart
  useEffect(() => {
    const handleEvent = () => {
      if (sessionContext.token || sessionContext.cartId) {
        sessionContext.replace({ roles: [] });
      }
    };
    document.addEventListener('token-expired', handleEvent, false);

    return () => {
      document.removeEventListener('token-expired', handleEvent, false);
    };
  });
  useEffect(() => {
    if (loading) return;
    if (error) {
      updateCartCount({});
    } else if (data?.me?.carts?.length! > 0) {
      updateCartCount({
        cartCount: data!.me.carts[0].lineItems.map(li => li.quantity).reduce((a, b) => a + b, 0),
        cartId: data!.me.carts[0].id
      });
    }
  }, [JSON.stringify(data), loading, error]);

  if (loading) renderLoading();
  if (error) renderError(error);

  return render({
    count: sessionContext.type === 'NONE' ? 0 : (sessionContext.cartCount as number) || 0
  });
};

type Props = SmartComponentProps<{
  render: ({ count: number }) => ReactElement | null;
}>;

MiniCartContainer.fragment = gql`
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

type CartSession = {
  cartCount?: number;
  cartId?: string;
};

type MiniCartResponse = {
  id: string;
  grandTotal: MonetaryAmount;
  lineItems: {
    id: string;
    quantity: number;
  }[];
};
