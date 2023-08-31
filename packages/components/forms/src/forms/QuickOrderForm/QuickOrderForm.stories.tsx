/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Button } from '@exo/frontend-components-base';
import { IntlProvider } from 'react-intl';
import * as yup from 'yup';
import { QuickOrderForm } from './QuickOrderForm';

export default {
  title: 'Components/Forms/Forms/QuickOrderForm',
  component: QuickOrderForm,
  parameters: { actions: { argTypesRegex: '^on.*' } }
};

// ---------------------------------------------------------------------------------------------------

const d = [
  { value: 'HK1010-b', name: 'HK1010-B Drawn cup needle roller bearing open end' },
  { value: 'HK6020', name: 'HK6020 Drawn cup needle roller bearing open end' },
  { value: 'HK2010', name: 'HK2010 Drawn cup needle roller bearing open end' },
  { value: '20226-MB', name: '20226-MB Barrel roller bearing' },
  { value: 'MB3', name: 'MB3 Securing Plate' }
];

const dynamicListSource = d.map(e => ({ value: e.value, name: e.name }));

const isMatch = (input, item) =>
  item.toLowerCase().match(new RegExp(`^.*${input?.split('').join('.*')}.*$`)) !== null;
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const Default = args => <QuickOrderForm {...args} />;
Default.args = {
  loadItems: async input => {
    await delay(500);
    return dynamicListSource.filter(i => isMatch(input, i.name));
  },
  data: {
    orderLines: [{ quantity: 123 }]
  }
};

// ---------------------------------------------------------------------------------------------------

export const WithErrors = args => <QuickOrderForm {...args} />;

WithErrors.args = {
  ...Default.args,
  error: 'Cannot place order. Inventory missing',
  data: {
    reference: 'John Olson',
    orderNumber: 'ABC1234',
    orderLines: [
      {
        partnumber: 'HK1010-B',
        partnumberAndName: 'HK1010-B Drawn cup needle roller bearing open end',
        quantity: 200
      },
      { partnumber: 'MB3', partnumberAndName: 'MB3 Securing Plate', quantity: 120 }
    ]
  }
};

// ---------------------------------------------------------------------------------------------------

export const WithCustomChildren = args => (
  <QuickOrderForm {...args}>
    <div style={{ marginTop: '2em' }}>Please expect delivery time of 3-7 working days</div>
  </QuickOrderForm>
);

WithCustomChildren.args = {
  ...Default.args
};

// ---------------------------------------------------------------------------------------------------

export const WithCustomFooter = args => <QuickOrderForm {...args} />;

WithCustomFooter.args = {
  ...Default.args,
  // eslint-disable-next-line react/prop-types
  renderFooter: ({ isDirty, isValid }) => (
    <>
      <Button type="submit" disabled={!isDirty || !isValid} label="Place order" />
    </>
  )
};

// ---------------------------------------------------------------------------------------------------

const messagesInSwedish = {
  'quickOrderForm.cancel.label': 'Avbryt',
  'quickOrderForm.orderNumber.label': 'Ordernummer',
  'quickOrderForm.orderNumber.placeholder': 'ex. 123456',
  'quickOrderForm.partnumber.label': 'Artikelnummer',
  'quickOrderForm.partnumber.placeholder': 'ex. HK1012',
  'quickOrderForm.quantity.label': 'Antal',
  'quickOrderForm.quantity.placeholder': 'ex. 20',
  'quickOrderForm.reference.label': 'Din referens',
  'quickOrderForm.reference.placeholder': 'ex. Ola Persson',
  'quickOrderForm.submit.label': 'Lägg order',
  'quickOrderForm.addOrderLine.label': 'Lägg till orderrad',
  'quickOrderForm.remove.label': 'Radera',
  'quickOrderForm.required_suffix': ' ',
  'quickOrderForm.optional_suffix': ' (valfritt)'
};
export const WithIntl = args => (
  <IntlProvider
    messages={messagesInSwedish}
    locale="sv"
    defaultLocale="en"
    onError={err => console.log(err.toString().split('"')[1])}
  >
    <QuickOrderForm {...args} intlPrefix="quickOrderForm" />
  </IntlProvider>
);
WithIntl.args = {
  ...Default.args
};

// ---------------------------------------------------------------------------------------------------

export const WithCustomValidation = args => <QuickOrderForm {...args} />;

const schema = yup.object().shape({
  reference: yup.string().required(),
  orderNumber: yup.string().required(),
  orderLines: yup.array().of(
    yup.object().shape({
      partnumber: yup
        .string()
        .min(3)
        .max(10)
        .required(),
      quantity: yup.number()
    })
  )
});

WithCustomValidation.args = {
  ...Default.args,
  schema
};
