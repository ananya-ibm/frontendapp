/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { StateMachine } from '@exo/frontend-common-state-machine';
import { useCheckout } from '../hooks/useCheckout';
import cloneDeep from 'lodash/cloneDeep'
import isEqual from 'lodash/isEqual'
import { SessionContextType } from '@exo/frontend-common-session-context';

export type MachineConfig = {
  separateDeliveryScreen: boolean;  
};

export type States = 'initial' | 'cart' | 'shipping' | 'billing' | 'payment' | 'delivery' | 'summary';

export const states = (config: MachineConfig) => ['cart', 'shipping', 'billing', 'delivery', 'payment', 'summary']
  .filter(e => !config.separateDeliveryScreen ? e !== 'delivery' : true)
  .map(e => ({ state: e as States }));

// TODO: We need to make this translatable
export const stateDescriptions = {
  cart: {
    label: 'Shopping cart',
    hidden: true
  },
  shipping: {
    label: 'Shipping Address'
  },
  billing: {
    label: 'Billing Address'
  },
  delivery: {
    label: 'Delivery'
  },
  payment: {
    label: 'Payment'
  },
  summary: {
    label: 'Order summary',
    hidden: true
  }
};

export type CheckoutContextState = {
  cartId: string;
  initialized: boolean;
  loading?: boolean;
  useBillingAddress?: boolean;
  shippingMode?: string;
  storeId?: string;
  attributes?: { name: string; value: string }[];
  shippingAddress?: any;
  billingAddress?: any;
  cartSummary?: any;
  stateList: {
    state: States;
    enabled?: boolean;
    error?: string;
    hidden?: boolean;
  }[];
};

export type CheckoutAction =
  | { type: 'NEXT' }
  | { type: 'NEXT'; address: any; shippingAddressIsNew: boolean }
  | { type: 'NEXT'; address: any; billingAddressIsNew: boolean }
  | { type: 'NEXT'; paymentMethod: string; attributes?: { name: string; value: string }[] }
  | { type: 'NEXT'; shipModeId: string; storeId?: string }
  | { type: 'INITIALIZE'; addressBook: any[]; defaultAddressId?: string; cartShippingAddress?: any; cartBillingAddress?: any }
  | { type: 'INIT_SHIPPING'; store?: string; shippingModeId?: string }
  | { type: 'PREVIOUS' }
  | { type: 'TOGGLE_USE_BILLING_ADDRESS' }
  | { type: 'START_LOADING' };

export const makeMachine = (
  checkoutAPI: ReturnType<typeof useCheckout>,
  session: SessionContextType,
  config: MachineConfig
): StateMachine<States, CheckoutContextState, CheckoutAction> => {
  return {
    initial: {},
    shipping: {
      TOGGLE_USE_BILLING_ADDRESS: ({ context }) => {
        return {
          context: {
            useBillingAddress: !context.useBillingAddress,
            stateList: context.stateList.map(s => ({
              ...s,
              enabled: s.state !== 'billing' || !context.useBillingAddress
            }))
          }
        };
      },

      NEXT: async ({ event, context, dispatch }) => {
        if (!('address' in event))
          throw new Error('Address needs to be supplied when dispatching NEXT from shipping');

        dispatch({ type: 'START_LOADING' });

        let addressId : string | undefined;
        if (session.type === 'USER') {
          addressId = await checkoutAPI.saveToAddressBook(event.address);
          await checkoutAPI.saveShippingInfo({
            addressId,
            shipModeId: context.shippingMode, 
            storeId: session?.checkout?.storeId
          });
        } else {
          await checkoutAPI.saveShippingInfo({
            shipModeId: context.shippingMode, 
            address: event.address, 
            storeId: session?.checkout?.storeId
          });
        }

        return {
          state: context.useBillingAddress ? 'billing' 
            : config.separateDeliveryScreen ? 'delivery' : 'payment',
          context: {
            shippingAddress: { ...event.address, addressId },
            billingAddress: { ...event.address, addressId },
            loading: false
          }
        };
      },

      PREVIOUS: () => 'cart'
    },
    billing: {
      NEXT: async ({ event, context, dispatch }) => {
        if (!('address' in event))
          throw new Error('Address needs to be supplied when dispatching NEXT from billing');

        dispatch({ type: 'START_LOADING' });

        const billingAddressId = 
          context.shippingAddress?.id === event.address?.id && !isEqual(context.shippingAddress, event.address)
            ? undefined
            : event.address?.id;

        let id = billingAddressId;
        if (session.type === 'USER') {
          id = await checkoutAPI.saveToAddressBook({
            ...event.address,
            id: billingAddressId
          });
        }

        return {
          state: config.separateDeliveryScreen ? 'delivery' : 'payment',
          context: {
            billingAddress: { ...event.address, id },
            loading: false
          }
        };
      },
      PREVIOUS: () => 'shipping'
    },
    delivery: {
      NEXT: async ({ event, context, dispatch }) => {
        if (!('shipModeId' in event))
          throw new Error('Shipping mode needs to be supplied when dispatching NEXT from delivery');

          dispatch({ type: 'START_LOADING' });

          if (session.type === 'USER') {
            await checkoutAPI.saveShippingInfo({
              shipModeId: event.shipModeId,
              addressId: context.shippingAddress.id,
              storeId: event.storeId
            });
          } else {
            await checkoutAPI.saveShippingInfo({
              shipModeId: event.shipModeId,
              address: context.shippingAddress,
              storeId: event.storeId
            });
          }

          return {
            state: 'payment',
            context: {
              shippingMode: event.shipModeId,
              storeId: event.storeId,
              loading: false
            }
          }
      },
      PREVIOUS: ({ context }) => context.useBillingAddress ? 'billing' : 'shipping'
    },
    payment: {
      NEXT: async ({ event, dispatch, context }) => {
        if (!('paymentMethod' in event))
          throw new Error('Payment info needs to be supplied when dispatching NEXT from payment');

        dispatch({ type: 'START_LOADING' });

        if (session.type === 'USER') {
          await checkoutAPI.savePaymentInfo({
            addressId: context.billingAddress.id,
            paymentMethodId: event.paymentMethod,
            attributes: event.attributes
          });
        } else {
          await checkoutAPI.savePaymentInfo({
            address: context.billingAddress,
            paymentMethodId: event.paymentMethod,
            attributes: event.attributes
         });
        }

        const res = await checkoutAPI.getCartForSummary(context.cartId);

        // Keep copy of cart for order summary
        const cart = res.data.me.carts[0];

        await checkoutAPI.placeOrder(context.cartId);
        await session.set({ cartCount: 0, cartId: undefined });

        return {
          state: 'summary',
          context: {
            paymentAttributes: event.attributes,
            cartSummary: cart,
            loading: false
          }
        };
      },
      PREVIOUS: ({ context }) => config.separateDeliveryScreen ? 'delivery' : context.useBillingAddress ? 'billing' : 'shipping'
    },
    '*': {
      START_LOADING: () => {
        return { context: { loading: true } };
      },

      INITIALIZE: ({ event }) => {
        const shippingAddressToUse = event.cartShippingAddress 
          ?? event.addressBook?.find(a => a.availableForShipping && a.id === event.defaultAddressId) 
          ?? event.addressBook?.find(a => a.availableForShipping && a.id === event.defaultAddressId);
        const billingAddressToUse = event.cartBillingAddress 
          ?? event.addressBook?.find(a => a.availableForBilling && a.id === event.defaultAddressId)
          ?? event.addressBook?.find(a => a.availableForBilling);
        return {
          context: {
            loading: false,
            initialized: true,
            shippingAddress: cloneDeep(shippingAddressToUse),
            billingAddress: cloneDeep(billingAddressToUse),
            stateList: states(config).map(e => ({
              ...e,
              enabled: e.state !== 'billing'
            }))
          },
          state: 'shipping'
        };
      },

      INIT_SHIPPING: ({ context, event }) => {
        return {
          context: {
            shippingMode: event.shippingModeId,
            store: event.store,
            ...context
          }
        };
      }
    }
  };
};
