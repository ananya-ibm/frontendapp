/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { CustomerConfiguration } from './CustomerConfiguration';

export default {
  title: 'Components/Automotive/CustomerConfiguration',
  component: CustomerConfiguration
};

const storyProps = {
  onDelete: () => {},
  onCartAdd: () => {},
  configuration: {
    description: 'DeLorean description',
    id: '12345678',
    image: '/static/automotive/exterior.png',
    amount: {
      value: 500,
      currency: 'GBP'
    },
    productId: 'DMCDeLorean'
  }
};

export const normal = args => <CustomerConfiguration {...args} />;
normal.args = storyProps;
