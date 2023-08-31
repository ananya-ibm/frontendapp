/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { MonetaryAmount } from './monetaryAmount';

export type ShippingMethod = 'clickCollect' | 'homeDelivery' | 'organizationOrder';

export const DeliveryOptionTypes: Record<string, ShippingMethod> = {
  PICKUP_IN_STORE: 'clickCollect',
  HOME_DELIVERY: 'homeDelivery',
  ORGANIZATION_ORDER: 'organizationOrder'
};

export type ShippingState = {
  storeId?: string;
  storeName?: string;
  shippingModeId?: string;
  method?: ShippingMethod;
};

export type ShippingInfo = {
  shipMode: {
    id: string;
    identifier: string;
  };
  pickupInStore?: {
    id: string;
    name: string;
  };
  shippingAddress?: {
    country: string;
    zip: string;
  };
};

export type LineItem = {
  id: string;
  quantity: number;
  partnumber: string;
  linePrice: MonetaryAmount;
  unitPrice: MonetaryAmount;
  shippingInfo?: ShippingInfo;
  product: {
    id: string;
    type: 'product' | 'sku' | 'bundleOfProducts' | 'bundleOfSkus';
    thumbnail?: string;
    name: string;
    partnumber: string;
    description: string;
    price?: {
      list: MonetaryAmount;
      offer: MonetaryAmount;
    };
    selection?: {
      id: string;
      criteria: {
        id: string;
        criteriaId: string;
        name: string;
        value: {
          id: string;
          value: string;
        };
      }[];
    }[];
  };
};

export type Cart = {
  id: string;
} & CartShippingInfoMixin &
  CartTotalsMixin &
  CartLineItemsMixin;

export type CartTotalsMixin = {
  grandTotal: MonetaryAmount;
  totalProductPrice: MonetaryAmount;
  totalShippingCharge: MonetaryAmount;
  totalAdjustment: MonetaryAmount;
  totalShippingTax: MonetaryAmount;
  totalSalesTax: MonetaryAmount;
  adjustments?: {
    title: string;
    amount: MonetaryAmount;
  }[];
};

export type CartLineItemsMixin = {
  lineItems: LineItem[];
};

export type CartShippingInfoMixin = {
  shippingInfo?: ShippingInfo;
};

export type CartAvailableShippingModesMixin = {
  availableShippingModes: {
    id: string;
    identifier: string;
    description: string;
    type: string;
    shippingRate?: MonetaryAmount;
  }[];
};
