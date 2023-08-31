/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { FormTest } from '../../helpers/FormTest';
import { FieldPanel } from '../../layout/FieldPanel/FieldPanel';
import { TextInput } from './TextInput';

export default {
  title: 'Components/Forms/Fields/TextInput',
  component: TextInput
};

// ---------------------------------------------------------------------------------------------------

export const Default = args => <TextInput {...args} />;
Default.args = {
  labelText: 'A text field',
  placeholderText: 'Username',
  id: 'some_id',
  name: 'some_name'
};

// ---------------------------------------------------------------------------------------------------

export const WithError = args => <TextInput {...args} />;
WithError.args = {
  ...Default.args,
  errorText: 'Some error text'
};

// ---------------------------------------------------------------------------------------------------

export const WithHelpText = args => <TextInput {...args} />;
WithHelpText.args = {
  ...Default.args,
  helpText: 'Some help text'
};

// ---------------------------------------------------------------------------------------------------

export const OnFieldPanel = args => (
  <FieldPanel title="A fieldpanel">
    <TextInput {...args} />
  </FieldPanel>
);
OnFieldPanel.storyName = 'On FieldPanel';
OnFieldPanel.args = {
  ...Default.args
};

// ---------------------------------------------------------------------------------------------------

export const Password = args => <TextInput {...args} />;
Password.args = {
  ...Default.args,
  placeholderText: 'Password',
  type: 'password'
};

// ---------------------------------------------------------------------------------------------------

export const TestOnForm = args => (
  <FormTest
    data={'Some value'}
    render={({ register, control }) => (
      <TextInput
        {...args}
        id="field"
        {...register('field', { required: true })}
        control={control}
      />
    )}
    renderStandalone={({ value, onChangeValue }) => (
      <TextInput {...args} id="field" value={value} onChangeValue={onChangeValue} />
    )}
  />
);
TestOnForm.args = {
  ...Default.args
};
