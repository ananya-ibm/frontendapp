/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { SmartComponentWrapper } from '@exo/frontend-common-storybook';
import { AccountPayment } from './AccountPayment';

export default {
  title: 'Features/Payments/Account/Smart Components/AccountPayment',
  component: AccountPayment
};

export const Default = args => (
  <SmartComponentWrapper mocks={{}}>
    <AccountPayment {...args} />
  </SmartComponentWrapper>
);
Default.args = {};
