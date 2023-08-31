/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { FormTest } from '../../helpers/FormTest';
import { Range } from './Range';

export default {
  title: 'Components/Forms/Fields/Range',
  component: Range
};

// ---------------------------------------------------------------------------------------------------

export const Default = args => <Range {...args} />;
Default.args = {
  labelText: 'A text field',
  id: 'some_id',
  name: 'some_name',
  min: 10,
  max: 100,
  value: 20
};

// ---------------------------------------------------------------------------------------------------

export const TestOnForm = args => (
  <FormTest
    data={50}
    render={({ register, control }) => (
      <Range {...args} id="field" {...register('field', { required: true })} control={control} />
    )}
    renderStandalone={({ value, onChangeValue }) => (
      <Range {...args} id="fieldStandalone" onChangeValue={onChangeValue} value={value} />
    )}
  />
);
TestOnForm.args = {
  ...Default.args
};
