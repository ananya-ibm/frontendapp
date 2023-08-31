/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { useEffect } from 'react';
import { useCartModification } from '../hooks/useCartModification';
import {
  CartAvailableShippingModesMixin,
  CartShippingInfoMixin,
  DeliveryOptionTypes,
  ShippingState
} from '../model/cartTypes';

type Cart = {
  id: string;
} & CartAvailableShippingModesMixin &
  CartShippingInfoMixin;

const getDefaultShippingMode = (cart: Cart): ShippingState | undefined => {
  const modes = cart?.availableShippingModes ?? [];
  const id = cart?.shippingInfo?.shipMode?.id;

  if (modes.length === 0) return undefined;

  const type = modes.find(f => f.id === id)?.type!;

  return id
    ? { method: DeliveryOptionTypes[type], shippingModeId: id }
    : { method: DeliveryOptionTypes[modes[0].type], shippingModeId: modes[0].id };
};

export const useShippingState = (
  shippingState: ShippingState,
  cart: Cart,
  onShippingModeUpdate: (state: ShippingState) => void
) => {
  const cartModification = useCartModification();

  useEffect(() => {
    if (!cart) return;
    onShippingModeUpdate({ ...shippingState, ...getDefaultShippingMode(cart) });
  }, [cart?.id]);

  const updateShippingState = async (state: ShippingState) => {
    const newState = { ...shippingState, ...state };

    if (
      shippingState.storeId !== newState.storeId ||
      shippingState.shippingModeId !== newState.shippingModeId
    ) {
      if (newState.method !== DeliveryOptionTypes.PICKUP_IN_STORE || newState.storeId) {
        await cartModification.setShippingMode(
          newState.shippingModeId,
          undefined,
          newState.method === DeliveryOptionTypes.PICKUP_IN_STORE ? newState.storeId : undefined
        );
      }
    }

    onShippingModeUpdate(newState);
  };

  return { updateShippingState };
};
