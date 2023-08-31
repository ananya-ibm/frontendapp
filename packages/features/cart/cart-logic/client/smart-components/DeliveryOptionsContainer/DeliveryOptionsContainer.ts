/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import {
  renderDefaultError,
  renderDefaultLoading,
  SmartComponentProps
} from '@exo/frontend-common-utils';
import { ReactElement } from 'react';
import { gql } from '@apollo/client';
import { useCart } from '../../hooks/useCart';
import { useShippingState } from '../useShippingState';
import { getDeliveryOptionsFromCart, getStoreFromCart } from '../../model/cartUtils';
import {
  CartAvailableShippingModesMixin,
  CartShippingInfoMixin,
  ShippingState
} from '../../model/cartTypes';

export const DeliveryOptionsContainer = ({
  cartId,
  shippingState,
  onShippingModeUpdate,
  render,
  renderError = renderDefaultError,
  renderLoading = renderDefaultLoading
}: Props) => {
  const { data, loading, error } = useCart<Cart>({ cartId }, [DeliveryOptionsContainer.fragment]);

  const cart = data?.me?.carts[0]!;

  const { updateShippingState } = useShippingState(shippingState, cart, onShippingModeUpdate);

  if (loading) return renderLoading();
  if (error) return renderError(error);

  return render({
    onDeliveryOptionChange: updateShippingState,
    deliveryOptions: getDeliveryOptionsFromCart(cart),
    currentStore: getStoreFromCart(cart, shippingState.storeName),
    selected: shippingState
  });
};

type Props = SmartComponentProps<{
  cartId: string;
  shippingState: ShippingState;
  onShippingModeUpdate: (state: ShippingState) => void;
  render: (args: DeliveryOptionsContainerRenderProps) => ReactElement | null;
}>;

export type DeliveryOptionsContainerRenderProps = {
  onDeliveryOptionChange: (state: ShippingState) => void;
  deliveryOptions: {
    shippingModeId: string;
    name: string;
    method: 'clickCollect' | 'homeDelivery' | 'organizationOrder';
  }[];
  currentStore?: {
    name: string;
    id: string;
  };
  selected: ShippingState;
};

DeliveryOptionsContainer.fragment = gql`
  fragment DeliveryOptions on CrtCart {
    id
    availableShippingModes {
      id
      identifier
      description
      type
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
    }
  }
`;

type Cart = {
  id: string;
} & CartAvailableShippingModesMixin &
  CartShippingInfoMixin;
