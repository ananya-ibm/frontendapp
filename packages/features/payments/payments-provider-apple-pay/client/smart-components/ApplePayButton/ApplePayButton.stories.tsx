/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { SmartComponentWrapper } from '@exo/frontend-common-storybook';
import { ApplePayButton } from './ApplePayButton';

export default {
  title: 'Features/Payments/ApplePay/Smart Components/ApplePayButton',
  component: ApplePayButton
};

const ApplePaySession = window?.ApplePaySession;

export const Default = args => {
  return ApplePaySession?.canMakePayments() ? (
    <SmartComponentWrapper mocks={{}}>
      <ApplePayButton {...args} />
    </SmartComponentWrapper>
  ) : (
    <div>
      Please note that this component cannot be previewed properly without running Safari over https
    </div>
  );
};
Default.args = {};
