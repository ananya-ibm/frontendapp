/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import { useSessionContext } from '@exo/frontend-common-session-context';
import {
  renderDefaultError,
  renderDefaultLoading,
  SmartComponentProps
} from '@exo/frontend-common-utils';
import { gql } from '@apollo/client';
import { ReactElement, useCallback } from 'react';
import { useCart } from '../../hooks/useCart';
import { useCartModification } from '../../hooks/useCartModification';
import { Cart } from '../../model/cartTypes';

// TODO: Remove use of session context
export const CartContainer = ({
  render,
  renderError = renderDefaultError,
  renderLoading = renderDefaultLoading
}: Props) => {
  const session = useSessionContext();

  const { data, loading, error } = useCart<Cart>(
    { cartId: session.cartId! },
    CartContainer.fragment
  );
  const cartModification = useCartModification();

  const update = useCallback(
    async (id: string, qty: number | string) => {
      await cartModification.update([{ id, quantity: Number(qty) }]);
    },
    [cartModification]
  );

  if (loading) return renderLoading();
  if (error) return renderError(error);

  const cart = data?.me?.carts[0]!;

  return render({ cart, onItemUpdate: update });
};

type Props = SmartComponentProps<{
  render: (args: CartContainerRenderProps) => ReactElement | null;
}>;

export type CartContainerRenderProps = {
  cart: Cart;
  onItemUpdate?: (id: string, qty: string | number) => Promise<void> | void;
};

CartContainer.fragment = gql`
  fragment Cart on CrtCart {
    id
    grandTotal {
      value
      currency
    }
    totalProductPrice {
      value
      currency
    }
    totalShippingCharge {
      value
      currency
    }
    totalAdjustment {
      value
      currency
    }
    totalShippingTax {
      value
      currency
    }
    totalSalesTax {
      value
      currency
    }
    adjustments {
      title
      amount {
        currency
        value
      }
    }
    shippingInfo {
      shipMode {
        id
        identifier
      }
      pickupInStore {
        id
        name
      }
      shippingAddress {
        id
        country
        zip
      }
    }
    lineItems {
      id
      quantity
      partnumber
      linePrice {
        currency
        value
      }
      unitPrice {
        currency
        value
      }
      shippingInfo {
        shipMode {
          id
          identifier
        }
        pickupInStore {
          id
          name
        }
        shippingAddress {
          id
          country
          zip
        }
      }
      product {
        id
        type
        thumbnail
        name
        partnumber
        description
        price {
          list {
            value
            currency
          }
          offer {
            value
            currency
          }
        }
        selection {
          id
          criteria {
            id
            criteriaId
            name
            value {
              id
              value
            }
          }
        }
      }
    }
  }
`;
