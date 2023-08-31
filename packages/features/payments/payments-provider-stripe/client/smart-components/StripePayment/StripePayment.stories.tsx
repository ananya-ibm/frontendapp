/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { SmartComponentWrapper } from '@exo/frontend-common-storybook';
import faker from 'faker';
import { StripePayment } from './StripePayment';

export default {
  title: 'Features/Payments/Stripe/Smart Components/StripePayment',
  component: StripePayment
};

export const Default = args => (
  <SmartComponentWrapper mocks={{}}>
    <StripePayment {...args} />
  </SmartComponentWrapper>
);
Default.args = {
  billingAddress: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    city: faker.address.city(),
    address1: faker.address.streetAddress(),
    zip: faker.address.zipCode()
  },
  stripeApiKey: 'pk_test_JJ1eMdKN0Hp4UFJ6kWXWO4ix00jtXzq5XG'
};
