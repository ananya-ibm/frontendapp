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
import { RegistrationForm } from './RegistrationForm';

export default {
  title: 'Components/Forms/Forms/RegistrationForm',
  component: RegistrationForm,
  parameters: { actions: { argTypesRegex: '^on.*' } }
};

// ---------------------------------------------------------------------------------------------------

export const Default = args => <RegistrationForm {...args} />;
Default.args = {};

// ---------------------------------------------------------------------------------------------------

export const WithAllFields = args => <RegistrationForm {...args} />;
WithAllFields.args = {
  ...Default.args,
  fields: [
    'firstName',
    'lastName',
    'email',
    'phone',
    'password',
    'confirmPassword',
    'address1',
    'address2',
    'country',
    'city',
    'zip',
    'province',
    'integrityPolicy',
    'termsAndConditions',
    'communicationPreference'
  ]
};

// ---------------------------------------------------------------------------------------------------

export const WithCountryStateDropdowns = args => <RegistrationForm {...args} />;
WithCountryStateDropdowns.args = {
  ...WithAllFields.args,
  countries: [
    { name: 'United Kingdom', value: 'UK', states: undefined },
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
        { name: 'Connecticut', value: 'CT' }
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
        { value: 'NF', name: 'Newfoundland' },
        { value: 'NT', name: 'Northwest Territories' }
      ]
    }
  ]
};

// ---------------------------------------------------------------------------------------------------

export const WithAddressSearch = args => <RegistrationForm {...args} />;
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

export const WithErrors = args => <RegistrationForm {...args} />;
WithErrors.args = {
  ...WithCountryStateDropdowns.args,
  data: {
    email: 'test@test.com',
    password: 'Passw0rd',
    confirmPassword: 'Passw0rd',
    country: 'US',
    province: 'FL',
    address1: 'AB'
  },
  error: 'Cannot save address'
};

// ---------------------------------------------------------------------------------------------------

export const WithCustomChildren = args => (
  <RegistrationForm {...args}>
    <div>By registering I agree to Acme Corp sending me marketing material</div>
  </RegistrationForm>
);
WithCustomChildren.args = {
  ...Default.args
};

// ---------------------------------------------------------------------------------------------------

export const WithCustomFooter = args => <RegistrationForm {...args} />;
WithCustomFooter.args = {
  ...Default.args,
  // eslint-disable-next-line react/prop-types
  renderFooter: ({ isDirty, isValid }) => (
    <>
      <Button type="submit" disabled={!isDirty || !isValid} label="Register account" />
    </>
  )
};

// ---------------------------------------------------------------------------------------------------

const messagesInSwedish = {
  'registrationForm.address1.label': 'Adress',
  'registrationForm.address1.placeholder': 'Adress',
  'registrationForm.address2.label': 'C/O',
  'registrationForm.address2.placeholder': 'C/O',
  'registrationForm.addressName.label': 'Namn på adress',
  'registrationForm.addressName.placeholder': 'Adressnamn',
  'registrationForm.cancel.label': 'Avbryt',
  'registrationForm.city.label': 'Stad',
  'registrationForm.city.placeholder': 'Stad',
  'registrationForm.company.label': 'Företag',
  'registrationForm.company.placeholder': 'Företag',
  'registrationForm.country.label': 'Land',
  'registrationForm.country.placeholder': 'Land',
  'registrationForm.email.label': 'E-post',
  'registrationForm.email.placeholder': 'E-post',
  'registrationForm.firstName.label': 'Förnamn',
  'registrationForm.firstName.placeholder': 'Förnamn',
  'registrationForm.lastName.label': 'Efternamn',
  'registrationForm.lastName.placeholder': 'Efternamn',
  'registrationForm.phone.label': 'Telefon',
  'registrationForm.phone.placeholder': 'Telefon',
  'registrationForm.save.label': 'Spara',
  'registrationForm.province.label': 'Stat/provins/region',
  'registrationForm.province.placeholder': 'Stat/provins/region',
  'registrationForm.zip.label': 'Postnummer',
  'registrationForm.zip.placeholder': 'Postnummer',
  'registrationForm.password.label': 'Lösenord',
  'registrationForm.password.placeholder': 'Lösenord',
  'registrationForm.confirmPassword.label': 'Bekräfta Lösenord',
  'registrationForm.confirmPassword.placeholder': 'Bekräfta Lösenord',
  'registrationForm.register.label': 'Registrera',
  'registrationForm.fieldset.address.label': 'Adress',
  'registrationForm.communicationPreference.label': 'Typ av kommunikation',
  'registrationForm.communicationPreference.sms': 'SMS',
  'registrationForm.communicationPreference.email': 'Epost',
  'registrationForm.integrityPolicy.label':
    'Jag har läst och godkänner <link>vår integritetspolicy</link>',
  'registrationForm.termsAndConditions.label':
    'Jag har läst och godkänner <link>våra allmänna vilkor</link>',
  'registrationForm.required_suffix': ' ',
  'registrationForm.optional_suffix': ' (valfritt)'
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
    <RegistrationForm {...args} intlPrefix="registrationForm" />
  </IntlProvider>
);
WithIntl.args = {
  ...WithAllFields.args
};

// ---------------------------------------------------------------------------------------------------

export const WithCustomValidation = args => <RegistrationForm {...args} />;

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  name: yup.string().required(),
  password: yup.string().required()
});

WithCustomValidation.args = {
  ...Default.args,
  schema
};
