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
import { DealerAddressForm } from './DealerAddressForm';

export default {
  title: 'Components/Forms/Forms/AddressForm',
  component: DealerAddressForm,
  parameters: { actions: { argTypesRegex: '^on.*' } }
};

// ---------------------------------------------------------------------------------------------------

export const Default = args => <DealerAddressForm {...args} />;
Default.args = {};

// ---------------------------------------------------------------------------------------------------

export const WithCountryStateDropdowns = args => <DealerAddressForm {...args} />;
WithCountryStateDropdowns.args = {
  ...Default.args,
  countries: [
    { name: 'United Kingdom', value: 'GB', states: undefined },
    {
      name: 'United States',
      value: 'US',
      states: [
        { name: 'Alabama', value: 'AL' },
        { name: 'Alaska', value: 'AK' },
        { name: 'Arizona', value: 'AZ' },
        { name: 'Arkansas', value: 'AR' },
        { name: 'California', value: 'CA' },
        { name: 'Colorado', value: 'CO' },
        { name: 'Connecticut', value: 'CT' },
        { name: 'Delaware', value: 'DE' }
      ]
    },
    {
      name: 'Canada',
      value: 'CA',
      states: [
        { value: 'AB', name: 'Alberta' },
        { value: 'BC', name: 'British Columbia' },
        { value: 'MB', name: 'Manitoba' },
        { value: 'NB', name: 'New Brunswick' },
        { value: 'NF', name: 'Newfoundland' }
      ]
    }
  ]
};

// ---------------------------------------------------------------------------------------------------

export const WithAllFields = args => <DealerAddressForm {...args} />;
WithAllFields.args = {
  ...Default.args,
  fields: [
    'company',
    'email',
    'phone',
    'firstName',
    'lastName',
    'address1',
    'address2',
    'city',
    'country',
    'province',
    'zip',
    'addressName'
  ]
};

// ---------------------------------------------------------------------------------------------------

export const WithAddressSearch = args => <DealerAddressForm {...args} />;
WithAddressSearch.args = {
  ...WithCountryStateDropdowns.args,
  fields: [
    'addressSearch',
    'firstName',
    'lastName',
    'address1',
    'address2',
    'city',
    'country',
    'province',
    'zip'
  ],
  addressSearch: {
    // eslint-disable-next-line no-unused-vars
    search: async _q => [
      { name: 'Street 1, London', value: { address1: 'Street 1', city: 'London', country: 'GB' } },
      {
        name: 'Dark Alley 4, New York',
        value: { address1: 'Dark Alley 4', city: 'New York', country: 'US', province: 'NY' }
      }
    ],
    lookup: async id => id
  }
};

// ---------------------------------------------------------------------------------------------------

export const WithErrors = args => <DealerAddressForm {...args} />;
WithErrors.args = {
  ...WithCountryStateDropdowns.args,
  data: {
    country: 'US',
    province: 'FL',
    address: 'AB'
  },
  error: 'Cannot save address'
};

// ---------------------------------------------------------------------------------------------------

export const WithCustomChildren = args => (
  <DealerAddressForm {...args}>
    <div>By saving this address I agree to Acme Corp sending me marketing material</div>
  </DealerAddressForm>
);
WithCustomChildren.args = {
  ...Default.args
};

// ---------------------------------------------------------------------------------------------------

export const WithCustomFooter = args => <DealerAddressForm {...args} />;
WithCustomFooter.args = {
  ...Default.args,
  // eslint-disable-next-line react/prop-types
  renderFooter: ({ isDirty, isValid }) => (
    <>
      <Button type="submit" disabled={!isDirty || !isValid} label="Save address" />
    </>
  )
};

// ---------------------------------------------------------------------------------------------------

const messagesInSwedish = {
  'addressForm.address1.label': 'Adress',
  'addressForm.address1.placeholder': 'Adress',
  'addressForm.address2.label': 'C/O',
  'addressForm.address2.placeholder': 'C/O',
  'addressForm.addressName.label': 'Namn på adress',
  'addressForm.addressName.placeholder': 'Adressnamn',
  'addressForm.cancel.label': 'Avbryt',
  'addressForm.city.label': 'Stad',
  'addressForm.city.placeholder': 'Stad',
  'addressForm.company.label': 'Företag',
  'addressForm.company.placeholder': 'Företag',
  'addressForm.country.label': 'Land',
  'addressForm.country.placeholder': 'Land',
  'addressForm.email.label': 'E-post',
  'addressForm.email.placeholder': 'E-post',
  'addressForm.firstName.label': 'Förnamn',
  'addressForm.firstName.placeholder': 'Förnamn',
  'addressForm.lastName.label': 'Efternamn',
  'addressForm.lastName.placeholder': 'Efternamn',
  'addressForm.phone.label': 'Telefon',
  'addressForm.phone.placeholder': 'Telefon',
  'addressForm.save.label': 'Spara',
  'addressForm.province.label': 'Stat/provins/region',
  'addressForm.province.placeholder': 'Stat/provins/region',
  'addressForm.zip.label': 'Postnummer',
  'addressForm.zip.placeholder': 'Postnummer',
  'addressForm.required_suffix': ' ',
  'addressForm.optional_suffix': ' (valfritt)'
};

export const WithIntl = args => (
  <IntlProvider
    messages={messagesInSwedish}
    locale="sv"
    defaultLocale="en"
    onError={_err => {
      /* Ignore */
    }}
  >
    <DealerAddressForm {...args} intlPrefix="addressForm" />
  </IntlProvider>
);
WithIntl.args = {
  ...WithAllFields.args
};

// ---------------------------------------------------------------------------------------------------

export const WithCustomValidation = args => <DealerAddressForm {...args} />;

const schema = yup.object().shape({
  address: yup.string().required()
});

WithCustomValidation.args = {
  ...Default.args,
  schema
};

// ---------------------------------------------------------------------------------------------------

export const WithTitleHack = args => <DealerAddressForm {...args} />;
WithTitleHack.args = {
  ...Default.args,
  fields: ['title'],
  data: {
    titleCode: 'mr'
  },
  titleField: 'titleCode',
  onSubmit: e => {
    console.log(e);
  }
};
