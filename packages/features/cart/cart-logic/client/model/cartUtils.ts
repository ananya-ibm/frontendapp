/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import {
  CartAvailableShippingModesMixin,
  CartShippingInfoMixin,
  DeliveryOptionTypes
} from './cartTypes';

export const getStoreFromCart = (cart: CartShippingInfoMixin, defaultStoreName?: string) => {
  if (!cart?.shippingInfo?.pickupInStore?.id) return undefined;
  return {
    name: cart?.shippingInfo?.pickupInStore?.name ?? defaultStoreName ?? '-',
    id: cart?.shippingInfo?.pickupInStore?.id!
  };
};

export const getDeliveryOptionsFromCart = (cart: CartAvailableShippingModesMixin) => {
  return cart?.availableShippingModes?.map(s => ({
    shippingModeId: s.id,
    name: s.identifier,
    method: DeliveryOptionTypes[s.type],
    shippingRate: s.shippingRate
  }));
};
