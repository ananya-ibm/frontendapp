/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { States } from '@exo/frontend-features-checkout-logic';
import { CheckoutConfig } from '../../checkoutConfig';
import { BillingAddressPanel } from '../../panels/BillingAddressPanel/BillingAddressPanel';
import { DeliveryPanel } from '../../panels/DeliveryPanel/DeliveryPanel';
import { PaymentPanel } from '../../panels/PaymentPanel/PaymentPanel';
import { ShippingAddressPanel } from '../../panels/ShippingAddressPanel/ShippingAddressPanel';

export const CheckoutStep = ({ step, config }: Props) => {
  switch (step) {
    case 'shipping':
      return <ShippingAddressPanel config={config} />;
    case 'billing':
      return <BillingAddressPanel config={config} />;
    case 'delivery':
      return <DeliveryPanel config={config} />;
    case 'payment':
      return <PaymentPanel />;
    case 'initial':
      return <div>Loading...</div>;
    default:
      throw new Error(`Unsupported checkout step ${step}`);
  }
};

type Props = {
  step: States;
  config: CheckoutConfig;
};
