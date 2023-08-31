/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { CustomFormFieldWrapper } from './CustomFormFieldWrapper';

export default {
  title: 'Components/Forms/Layout/CustomFormFieldWrapper',
  component: CustomFormFieldWrapper
};

// ---------------------------------------------------------------------------------------------------

export const Default = args => (
  <CustomFormFieldWrapper {...args}>
    <div style={{ width: '30ch', height: '2rem', backgroundColor: '#eeeeee' }}></div>
  </CustomFormFieldWrapper>
);
Default.args = {
  labelText: 'A phone-number field'
};

// --------------------------------------------------------------------------------------------------

export const Required = args => (
  <CustomFormFieldWrapper {...args}>
    <div style={{ width: '30ch', height: '2rem', backgroundColor: '#eeeeee' }}></div>
  </CustomFormFieldWrapper>
);
Required.args = {
  ...Default.args,
  isRequired: true
};

// --------------------------------------------------------------------------------------------------

export const WithError = args => (
  <CustomFormFieldWrapper {...args}>
    <div style={{ width: '30ch', height: '2rem', backgroundColor: '#eeeeee' }}></div>
  </CustomFormFieldWrapper>
);
WithError.args = {
  ...Default.args,
  errorText: 'An error message'
};

// --------------------------------------------------------------------------------------------------

export const WithHelpText = args => (
  <CustomFormFieldWrapper {...args}>
    <div style={{ width: '30ch', height: '2rem', backgroundColor: '#eeeeee' }}></div>
  </CustomFormFieldWrapper>
);
WithHelpText.args = {
  ...Default.args,
  helpText: 'Some help text'
};
