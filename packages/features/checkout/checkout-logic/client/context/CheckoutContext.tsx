/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql } from '@apollo/client';
import React, { useContext, useEffect } from 'react';
import { useMe } from '@exo/frontend-features-account-profile-logic';
import { useSessionContext } from '@exo/frontend-common-session-context';
import { useMachine } from '@exo/frontend-common-state-machine';
import { useCheckout } from '../hooks/useCheckout';
import {
  CheckoutAction,
  CheckoutContextState,
  States,
  makeMachine,
  stateDescriptions,
  states,
  MachineConfig
} from './defaultCheckoutStateMachine';
import { useCart } from '@exo/frontend-features-cart-logic';

export const CheckoutContext = React.createContext<CheckoutContextType | undefined>(undefined);

export const useCheckoutContext = (): CheckoutContextType => {
  const c = useContext<CheckoutContextType | undefined>(CheckoutContext);
  if (!c) throw new Error('Attempt to use CheckoutContext without setting it up');
  return c;
};

type CheckoutContextType = {
  checkout: {
    state: States;
    context: CheckoutContextState;
  };
  loading: boolean;
  error: any;
  stateDescriptions: Partial<Record<States, { label: string; secondaryLabel?: string }>>;
  dispatch: (action: CheckoutAction) => void;
};

export const CheckoutContextProvider = ({
  initialState = 'initial',
  initialContext,
  config,
  children
}: Props) => {
  const session = useSessionContext();

  // TODO: Instead of featchPolicy here and in useCart - maybe some way to invalidate
  //       these objects when doing mutations
  const me = useMe<any>({ fetchPolicy: 'network-only' }, CheckoutContextProvider.meFragment);

  const checkoutAPI = useCheckout();

  // TODO: Opportunity to merge with useMe
  const cart = useCart<CartAddresses>({ cartId: session.cartId!, fetchPolicy: 'network-only' }, CheckoutContextProvider.cartAddressesFragment);

  const machine = makeMachine(checkoutAPI, session, config);
  const [state, dispatch] = useMachine<States, CheckoutContextState, CheckoutAction>(
    machine,
    initialState,
    {
      loading: true,
      initialized: false,
      cartId: session.cartId!,
      stateList: states(config),
      ...initialContext
    }
  );

  useEffect(() => {
    if (!me.loading && !cart.loading && !state.context.initialized) {
      dispatch({
        type: 'INITIALIZE',
        addressBook: me?.data?.me?.addresses,
        defaultAddressId: me?.data?.me?.defaultAddress?.id,
        cartShippingAddress: cart.data?.me.carts?.[0].shippingInfo?.shippingAddress,
        cartBillingAddress: cart.data?.me.carts?.[0].paymentInstructions?.billingAddress
      });
    }
  }, [me.loading, cart.loading]);

  return (
    <CheckoutContext.Provider
      value={{ loading: me.loading, error: me.error, dispatch, checkout: state, stateDescriptions }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

type Props = {
  initialState?: States;
  initialContext?: Partial<CheckoutContextState>;
  config: MachineConfig;
  children: JSX.Element;
};

CheckoutContextProvider.meFragment = gql`
  fragment CheckoutContextProviderAddresses on CusMe {
    id
    username
    defaultAddress {
      id
    }
    addresses {
      id
      address1
      address2
      city
      company
      country
      countryCode
      firstName
      lastName
      name
      phone
      province
      zip
      email
      availableForShipping
      availableForBilling
    }
  }
`;

type Address = {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address1?: string;
  address2?: string;
  city?: string;
  country?: string;
  countryCode?: string;
  countryName?: string;
  zip?: string;
}

type CartAddresses = {
  id: string;
  shippingInfo?: {
    shippingAddress?: Address;
  };
  paymentInstructions?: {
    id: string;
    billingAddress?: Address;
  };
}

CheckoutContextProvider.cartAddressesFragment = gql`
  fragment CartAddresses on CrtCart {
    id
    shippingInfo {
      shippingAddress {
        ...AddressDetails
      }
    }
    paymentInstructions {
      id
      billingAddress {
        ...AddressDetails
      }
    }
  }

  fragment AddressDetails on CusAddress {
    id
    firstName
    lastName
    email
    phone
    address1
    address2
    city
    # TODO: Remove country
    country
    countryCode
    countryName
    zip
  }
`