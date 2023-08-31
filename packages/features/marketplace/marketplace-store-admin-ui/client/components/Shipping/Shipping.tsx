/* eslint-disable react/jsx-props-no-spreading */
/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ManageShippingContainerRenderProps } from '@exo/frontend-features-marketplace-logic';
import { ShippingRateTable } from './ShippingRateTable/ShippingRateTable';

export const Shipping = ({ shippingMethods }: ManageShippingContainerRenderProps) => {
  const headerData = [
    {
      header: 'Name',
      key: 'id'
    },
    {
      header: 'Range',
      key: 'shipping_method_range'
    },
    {
      header: 'Rate',
      key: 'shipping_method_rate'
    }
  ];
  return (
    <ShippingRateTable headerData={headerData} rowData={shippingMethods} addText="Add service" />
  );
};
