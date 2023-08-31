/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { TradeInForm } from './TradeInForm';

export default {
  title: 'Components/Automotive/TradeInForm',
  component: TradeInForm
};

const storyProps = {
  carCondition: {
    label: 'Car Condition',
    options: ['Excellent', 'Good', 'Fair', 'Poor']
  },
  formProps: {
    onSubmit: () => {}
  }
};

const initialValues = {
  registration: 'ABC123',
  mileage: '10000'
};

export const normal = args => <TradeInForm {...args} />;
normal.args = storyProps;

export const prePopulated = args => (
  <TradeInForm {...args} formProps={{ ...storyProps.formProps, initialValues }} />
);
prePopulated.args = storyProps;
