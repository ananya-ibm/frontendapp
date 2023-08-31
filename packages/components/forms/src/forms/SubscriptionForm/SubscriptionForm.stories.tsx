/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Button } from '@exo/frontend-components-base';
import React from 'react';
import { IntlProvider } from 'react-intl';
import * as yup from 'yup';
import { SubscriptionForm } from './SubscriptionForm';

export default {
  title: 'Components/Forms/Forms/SubscriptionForm',
  component: SubscriptionForm,
  parameters: { actions: { argTypesRegex: '^on.*' } }
};

export const Default = args => <SubscriptionForm {...args} />;
Default.args = {
  onSubmit: data => {
    // eslint-disable-next-line no-console
    console.log(data);
  },
  onCancel: () => {
    // eslint-disable-next-line no-console
    console.log('Cancel');
  }
};

// ---------------------------------------------------------------------------------------------------

export const WithErrors = args => <SubscriptionForm {...args} />;

WithErrors.args = {
  ...Default.args,
  error: 'Cannot subscribe at this time. Please try again',
  data: {
    name: 'John Johnson'
  }
};

// ---------------------------------------------------------------------------------------------------

export const WithCustomChildren = args => (
  <SubscriptionForm {...args}>
    <div>The newsletter is sent every week.</div>
  </SubscriptionForm>
);

WithCustomChildren.args = {
  ...Default.args
};

// ---------------------------------------------------------------------------------------------------

export const WithCustomFooter = args => <SubscriptionForm {...args} />;

WithCustomFooter.args = {
  ...Default.args,
  // eslint-disable-next-line react/prop-types
  renderFooter: ({ isDirty, isValid }) => (
    <>
      <Button type="submit" disabled={!isDirty || !isValid} label="Subscribe to Newsletter" />
    </>
  )
};

// ---------------------------------------------------------------------------------------------------

const messagesInSwedish = {
  'subscriptionForm.name.label': 'Namn',
  'subscriptionForm.name.placeholder': 'Ange ditt namn',
  'subscriptionForm.email.label': 'Epost',
  'subscriptionForm.email.placeholder': 'Ange din epostaddress',
  'subscriptionForm.error.generic': 'Felaktig data',
  'subscriptionForm.subscribe.label': 'Prenumerera',
  'subscriptionForm.cancel.label': 'Avbryt',
  'subscriptionForm.required_suffix': ' ',
  'subscriptionForm.optional_suffix': ' (valfritt)'
};
export const WithIntl = args => (
  <IntlProvider messages={messagesInSwedish} locale="sv" defaultLocale="en">
    <SubscriptionForm {...args} intlPrefix="subscriptionForm" />
  </IntlProvider>
);
WithIntl.args = {
  ...Default.args
};

// ---------------------------------------------------------------------------------------------------

export const WithCustomValidation = args => <SubscriptionForm {...args} />;

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup
    .string()
    .email()
    .required()
});

WithCustomValidation.args = {
  ...Default.args,
  schema
};
