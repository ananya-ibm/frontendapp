/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { useForm } from 'react-hook-form';
import { ComboBox } from './ComboBox';
import { FieldPanel } from '../../layout/FieldPanel/FieldPanel';
import { FormTest } from '../../helpers/FormTest';

export default {
  title: 'Components/Forms/Fields/ComboBox',
  component: ComboBox
};

const Wrapper = ({ render }) => {
  const { control } = useForm({ mode: 'onBlur' });
  return render(control);
};

// ---------------------------------------------------------------------------------------------------

export const Default = args => (
  <Wrapper render={control => <ComboBox control={control} {...args} />} />
);
Default.args = {
  id: 'id',
  name: 'name',
  labelText: 'Some label',
  placeholderText: 'Some label',
  items: [
    { value: 'red', name: 'Red' },
    { value: 'green', name: 'Green' },
    { value: 'blue', name: 'Blue' }
  ]
};

// ---------------------------------------------------------------------------------------------------

export const WithError = args => (
  <Wrapper render={control => <ComboBox control={control} {...args} />} />
);
WithError.args = {
  ...Default.args,
  errorText: 'Some error text'
};

// ---------------------------------------------------------------------------------------------------

export const WithHelpText = args => (
  <Wrapper render={control => <ComboBox control={control} {...args} />} />
);
WithHelpText.args = {
  ...Default.args,
  helpText: 'Some help text'
};

// ---------------------------------------------------------------------------------------------------

export const OnFieldPanel = args => (
  <FieldPanel title="A fieldpanel">
    <Wrapper render={control => <ComboBox control={control} {...args} />} />
  </FieldPanel>
);
OnFieldPanel.storyName = 'On FieldPanel';
OnFieldPanel.args = {
  ...Default.args
};

// ---------------------------------------------------------------------------------------------------

const dynamicListSource = [
  'Liam',
  'Olivia',
  'Noah',
  'Emma',
  'Oliver',
  'Ava',
  'William',
  'Sophia',
  'Elijah',
  'Isabella',
  'James',
  'Charlotte',
  'Benjamin',
  'Amelia',
  'Lucas',
  'Mia',
  'Mason',
  'Harper',
  'Ethan',
  'Evelyn'
].map(name => ({ value: name.toLowerCase(), name }));

const isMatch = (input, item) =>
  item.toLowerCase().match(new RegExp(`^.*${input?.split('').join('.*')}.*$`)) !== null;
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const WithDynamicList = args => (
  <Wrapper render={control => <ComboBox control={control} {...args} />} />
);
WithDynamicList.args = {
  ...Default.args,
  loadItems: async input => {
    await delay(500);
    return dynamicListSource.filter(i => isMatch(input, i.name));
  }
};

// ---------------------------------------------------------------------------------------------------

export const WithDynamicListAndSelectedValue = args => (
  <Wrapper render={control => <ComboBox control={control} {...args} />} />
);
WithDynamicListAndSelectedValue.args = {
  ...WithDynamicList.args,
  value: 'lucas',
  valueLabel: 'Lucas'
};

// ---------------------------------------------------------------------------------------------------

export const TestOnForm = args => (
  <FormTest
    data={'green'}
    render={({ register, control }) => (
      <ComboBox id="field" {...args} {...register('field', { required: true })} control={control} />
    )}
    renderStandalone={({ onChangeValue, value }) => (
      <ComboBox id="fieldStandalone" {...args} value={value} onChangeValue={onChangeValue} />
    )}
  />
);
TestOnForm.args = {
  ...Default.args
};
