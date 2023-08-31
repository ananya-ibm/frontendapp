/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { ZipInDeliveryOptions } from './ZipInDeliveryOptions';

export default {
  title: 'Features/Cart/Components/ZipInDeliveryOptions',
  component: ZipInDeliveryOptions
};

type Props = React.ComponentProps<typeof ZipInDeliveryOptions>;

export const Default = (args: Props) => <ZipInDeliveryOptions {...args} />;
Default.args = {
  selected: {
    name: 'Home Delivery',
    shippingModeId: '1',
    method: 'homeDelivery'
  },
  countries: [
    { isoCode: 'US', name: 'United States' },
    { isoCode: 'Uk', name: 'United Kingdom' }
  ],
  storeAvailability: [
    { type: 'clickCollect', name: 'Bristol', id: '1', status: 'Available' },
    { type: 'clickCollect', name: 'London', id: '2', status: 'Partial' },
    { type: 'clickCollect', name: 'Cardiff', id: '3', status: 'Unavailable' }
  ],
  zipInAddress: {
    country: 'US',
    zip: '12345'
  },
  deliveryOptions: [
    {
      shippingModeId: 'click-and-collect',
      name: 'Click and Collect',
      method: 'clickCollect',
      shippingRate: {
        currency: 'USD',
        value: '0'
      }
    },
    {
      shippingModeId: 'home-delivery',
      name: 'Normal',
      method: 'homeDelivery',
      shippingRate: {
        currency: 'USD',
        value: '1.99'
      }
    },
    {
      shippingModeId: 'home-delivery-express',
      name: 'Express',
      method: 'homeDelivery',
      shippingRate: {
        currency: 'USD',
        value: '3.99'
      }
    }
  ],
  onDeliveryOptionChange: () => {}
} as Props;

export const BeforeZipIn = (args: Props) => <ZipInDeliveryOptions {...args} />;
BeforeZipIn.args = {
  ...Default.args,
  zipInAddress: undefined,
  deliveryOptions: undefined,
  isInitialState: true
} as Props;

export const BeforeZipInOnlyOneCountry = (args: Props) => <ZipInDeliveryOptions {...args} />;
BeforeZipInOnlyOneCountry.args = {
  ...Default.args,
  zipInAddress: undefined,
  deliveryOptions: undefined,
  countries: [Default.args.countries[0]],
  isInitialState: true
} as Props;

export const Skeleton = () => <ZipInDeliveryOptions.Skeleton />;
