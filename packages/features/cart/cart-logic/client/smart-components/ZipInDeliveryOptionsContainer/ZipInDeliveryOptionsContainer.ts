/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable no-param-reassign */

import { ReactElement, useCallback, useEffect, useState } from 'react';
import { useMe } from '@exo/frontend-features-account-profile-logic';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import { gql } from '@apollo/client';
import {
  renderDefaultError,
  renderDefaultLoading,
  SmartComponentProps
} from '@exo/frontend-common-utils';
import { useLocales } from '@exo/frontend-common-i18n';
import { useCartAvailability } from '../../hooks/useCartAvailability';
import { useCartModification } from '../../hooks/useCartModification';
import { useCart } from '../../hooks/useCart';
import { DeliveryOptionsContainer } from '../DeliveryOptionsContainer/DeliveryOptionsContainer';
import { MonetaryAmount } from '../../model/monetaryAmount';
import { useShippingState } from '../useShippingState';
import { getDeliveryOptionsFromCart, getStoreFromCart } from '../../model/cartUtils';
import { Availability, AvailabilityEntry, getAvailability } from './getAvailability';
import {
  CartAvailableShippingModesMixin,
  CartShippingInfoMixin,
  ShippingState
} from '../../model/cartTypes';

export const ZipInDeliveryOptionsContainer = ({
  cartId,
  shippingState,
  country,
  onShippingModeUpdate,
  shouldZipInAutomatically = true,
  render,
  renderError = renderDefaultError,
  renderLoading = renderDefaultLoading
}: Props) => {
  const cartQ = useCart<Cart>({ cartId }, [
    ZipInDeliveryOptionsContainer.cartFragment,
    DeliveryOptionsContainer.fragment
  ]);

  const cartModification = useCartModification();

  const cart = cartQ.data?.me?.carts[0]!;

  // Need to keep track of selected shipping state - i.e. store + method
  const { updateShippingState } = useShippingState(shippingState, cart, onShippingModeUpdate);

  // Also need to keep track of which zip the user has provided
  // ... need available countries and users address book
  const me = useMe<any>(
    { skip: !shouldZipInAutomatically },
    ZipInDeliveryOptionsContainer.meFragment
  );
  const localesQ = useLocales();

  // ... then we keep the zipin state
  const [zipInAddress, setZipInAddress] = useState<ZipState>();
  const skuIds = cart?.lineItems?.map((li: any) => li.partnumber);
  const storeAvailabilityQ = useCartAvailability<Availability>(
    zipInAddress ? { ...pick(zipInAddress, ['zip', 'country']), skuIds } : {},
    ZipInDeliveryOptionsContainer.storeFragment
  );

  const loading = storeAvailabilityQ.loading || localesQ.loading || cartQ.loading;
  const error = storeAvailabilityQ.error ?? localesQ.error ?? cartQ.error;

  const changeZipInAddress = async (address: any) => {
    await cartModification.setShippingMode(undefined, address.id, undefined);
    setZipInAddress(address);
  };

  // ... when loading component, automatically zip-in with users zip
  useEffect(() => {
    if (!shouldZipInAutomatically) return;
    if (me.loading || me.error) return;

    if (cart?.shippingInfo?.shippingAddress?.country) {
      setZipInAddress(cart?.shippingInfo?.shippingAddress);
    } else if (me?.data?.me?.addresses?.length > 0) {
      changeZipInAddress(me?.data?.me?.addresses[0]);
    }
  }, [cartId, me.data, me.data?.id, cart?.id]);

  // ... to be called when the zip is changed
  const onZipIn = useCallback(
    async (address: Address) => {
      if (!address.country || address.country === '') {
        address.country = country ?? 'US';
      }

      await cartModification.updateShippingAddress(
        omit(
          address,
          ['deliveryOption', '__typename', 'availableForShipping', 'availableForBilling']
        )
      );

      setZipInAddress(address);
    },
    [cartModification]
  );

  if (loading) return renderLoading();
  if (error) return renderError(error);

  const hasZippedIn = !!zipInAddress;
  if (!hasZippedIn) {
    if (shouldZipInAutomatically && (me.loading || me?.data?.me?.addresses?.length > 0)) {
      return renderLoading();
    }

    return render({ isInitialState: true, onZipIn, countries: localesQ.data });
  }

  return render({
    countries: localesQ.data,
    storeAvailability: getAvailability(storeAvailabilityQ?.data?.availability),
    addresses: me?.data?.me?.addresses,
    zipInAddress,
    onZipIn,
    onDeliveryOptionChange: updateShippingState,
    deliveryOptions: getDeliveryOptionsFromCart(cart),
    currentStore: getStoreFromCart(cart, shippingState.storeName),
    selected: shippingState
  });
};

type Props = SmartComponentProps<{
  cartId: string;
  shippingState: ShippingState;
  country?: string;
  onShippingModeUpdate: (state: ShippingState) => void;
  shouldZipInAutomatically?: boolean;
  render: (args: ZipInDeliveryOptionsContainerRenderProps) => ReactElement | null;
}>;

export type ZipInDeliveryOptionsContainerRenderProps = {
  onDeliveryOptionChange?: (state: ShippingState) => void;
  deliveryOptions?: {
    shippingModeId: string;
    name: string;
    method: 'clickCollect' | 'homeDelivery' | 'organizationOrder';
    shippingRate?: MonetaryAmount;
  }[];
  currentStore?: {
    name: string;
    id: string;
  };
  storeAvailability?: AvailabilityEntry[];
  addresses?: Address[];
  zipInAddress?: ZipState;
  selected?: ShippingState;
  onZipIn?: (address: any) => void;
  countries: { isoCode: string; name: string }[];
  isInitialState?: boolean;
};

ZipInDeliveryOptionsContainer.meFragment = gql`
  fragment DeliveryOptionsZipInAddresses on CusMe {
    id
    username
    addresses {
      id
      address1
      address2
      city
      country
      zip
      availableForShipping
      availableForBilling
    }
  }
`;

ZipInDeliveryOptionsContainer.storeFragment = gql`
  fragment ZipInDeliveryOptionsContainer_StoreAvailability on AvItemAvailability {
    partnumber
    availability {
      status
      availableDate
      availableQuantity
      shipNode {
        id
        name
        distance
      }
      distributionGroup {
        id
        name
      }
    }
  }
`;

ZipInDeliveryOptionsContainer.cartFragment = gql`
  fragment CartZipInDeliveryOptionsContainer on CrtCart {
    id
    shippingInfo {
      shippingAddress {
        id
        country
        zip
      }
    }
    lineItems {
      partnumber
    }
    availableShippingModes {
      id
      shippingRate {
        value
        currency
      }
    }
  }
`;

type Address = {
  id: string;
  address1?: string;
  address2?: string;
  city?: string;
  country: string;
  zip: string;
  availableForShipping: boolean;
  availableForBilling: boolean;
};

type Cart = {
  id: string;
  lineItems: {
    partnumber: string;
  }[];
} & CartAvailableShippingModesMixin &
  CartShippingInfoMixin;

type ZipState = { zip: string; country: string };
