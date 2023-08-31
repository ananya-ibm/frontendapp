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
import { TextArea } from './TextArea';

export default {
  title: 'Components/Forms/Fields/TextArea',
  component: TextArea
};

// ---------------------------------------------------------------------------------------------------

export const Default = args => <TextArea {...args} />;
Default.args = {
  labelText: 'A text field',
  placeholderText: 'Description',
  id: 'some_id',
  name: 'some_name'
};

// ---------------------------------------------------------------------------------------------------

export const WithError = args => <TextArea {...args} />;
WithError.args = {
  ...Default.args,
  errorText: 'Some error text'
};

// ---------------------------------------------------------------------------------------------------

export const WithHelpText = args => <TextArea {...args} />;
WithHelpText.args = {
  ...Default.args,
  helpText: 'Some help text'
};

// ---------------------------------------------------------------------------------------------------

export const OnFieldPanel = args => (
  <FieldPanel title="A fieldpanel">
    <TextArea {...args} />
  </FieldPanel>
);
OnFieldPanel.storyName = 'On FieldPanel';
OnFieldPanel.args = {
  ...Default.args
};

// ---------------------------------------------------------------------------------------------------

export const TestOnForm = args => (
  <FormTest
    data={'Lorem ipsum dolor sit amet'}
    render={({ register, control }) => (
      <TextArea {...args} id="field" {...register('field', { required: true })} control={control} />
    )}
    renderStandalone={({ value, onChangeValue }) => (
      <TextArea {...args} id="fieldStandalone" onChangeValue={onChangeValue} value={value} />
    )}
  />
);
TestOnForm.args = {
  ...Default.args
};
