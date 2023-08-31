/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { DeliveryOptions } from './DeliveryOptions';

export default {
  title: 'Features/Cart/Components/DeliveryOptions',
  component: DeliveryOptions
};

type Props = React.ComponentProps<typeof DeliveryOptions>;

export const Default = (args: Props) => <DeliveryOptions {...args} />;
Default.args = {
  selected: {
    name: 'Home Delivery',
    shippingModeId: '1',
    method: 'homeDelivery'
  },
  deliveryOptions: [
    {
      shippingModeId: 'click-and-collect',
      name: 'Click and Collect',
      method: 'clickCollect'
    },
    {
      shippingModeId: 'home-delivery',
      name: 'Home Delivery',
      method: 'homeDelivery'
    },
    {
      shippingModeId: 'home-delivery2',
      name: 'Express Delivery',
      method: 'homeDelivery'
    }
  ],
  onDeliveryOptionChange: () => {}
} as Props;

export const Skeleton = () => <DeliveryOptions.Skeleton />;
