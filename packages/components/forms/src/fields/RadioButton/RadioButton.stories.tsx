/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { RadioButton } from './RadioButton';
import { FieldPanel } from '../../layout/FieldPanel/FieldPanel';
import { FormTest } from '../../helpers/FormTest';

export default {
  title: 'Components/Forms/Fields/RadioButton',
  component: RadioButton
};

export const Default = args => <RadioButton {...args} />;
Default.args = {
  id: 'id',
  name: 'name',
  labelText: 'A label'
};

// ---------------------------------------------------------------------------------------------------

export const WithHelpText = args => <RadioButton {...args} />;
WithHelpText.args = {
  ...Default.args,
  helpText: 'Some help text'
};

// ---------------------------------------------------------------------------------------------------

export const OnFieldPanel = args => (
  <FieldPanel title="A fieldpanel">
    <RadioButton {...args} />
  </FieldPanel>
);
OnFieldPanel.storyName = 'On FieldPanel';
OnFieldPanel.args = {
  ...Default.args
};

// ---------------------------------------------------------------------------------------------------

export const TestOnForm = args => (
  <FormTest
    data={''}
    render={({ register, control }) => (
      <RadioButton
        {...args}
        id="field"
        value="123"
        {...register('field', { required: true })}
        control={control}
      />
    )}
    renderStandalone={({ value, onChangeValue }) => (
      <RadioButton
        {...args}
        id="fieldStandalone"
        name="fs"
        value="123"
        isChecked={value === '123'}
        onChangeValue={onChangeValue}
      />
    )}
  />
);
TestOnForm.args = {
  ...Default.args
};
