/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ProductAvailability } from './ProductAvailability';

export default {
  title: 'Features/Catalog/Components/ProductAvailability',
  component: ProductAvailability
};

type Props = React.ComponentProps<typeof ProductAvailability>;

// -------------------------------------------------------------------------------------------------------------

export const Default = (args: Props) => <ProductAvailability {...args} />;
Default.args = {
  isOnlineEnabled: true,
  isStoreEnabled: true,
  availability: [
    { distributionGroup: { id: '1', name: 'Online' }, status: 'Available' },
    { shipNode: { id: '2', name: 'London' }, status: 'Unavailable' },
    { shipNode: { id: '3', name: 'Glasgow' }, status: 'Future', availableDate: '2024-06-30T13:48' }
  ]
} as Props;

export const Skeleton = () => <ProductAvailability.Skeleton />;
