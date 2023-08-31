/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { SubscriptionItem } from './SubscriptionItem';

export default {
  title: 'Features/Automotive/Account/Components/SubscriptionItem',
  component: SubscriptionItem
};

export const Default = args => <SubscriptionItem {...args} />;
Default.args = {
  item: {
    title: 'EV Charging',
    subtitle: 'From £200.00/Month',
    thumbnail: '/static/images/products/thumbnails/PremiumChargingSubscription.png',
    onClick: () => {},
    actionLabel: 'See details'
  }
};
