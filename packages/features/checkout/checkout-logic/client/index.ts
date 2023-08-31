/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

export * from './context/defaultCheckoutStateMachine';
export * from './hooks/useCheckout';
export * from './context/CheckoutContext';
export * from './model/address';
export * from './smart-components/AddressBookContainer/AddressBookContainer';
export * from './smart-components/PaymentMethodsContainer/PaymentMethodsContainer';
export * from './smart-components/DeliveryContainer/DeliveryContainer';

declare global {
  interface EXOSession {
    checkout?: {
      storeId?: string;
      storeName?: string;
      deliveryOption?: any;
      shippingMode?: any;
    };
  }
}
