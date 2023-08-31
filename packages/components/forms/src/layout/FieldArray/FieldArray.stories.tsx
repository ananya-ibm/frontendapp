/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { useForm } from 'react-hook-form';
import { FieldArray } from './FieldArray';
import { FieldRow } from '../FieldRow/FieldRow';
import { TextInput } from '../../fields/TextInput/TextInput';

export default {
  title: 'Components/Forms/Layout/FieldArray',
  component: FieldArray
};

// eslint-disable-next-line react/prop-types
const SampleFormWrapper = ({ render }) => {
  const { register, handleSubmit, control } = useForm({
    mode: 'onBlur'
  });

  return <form onSubmit={handleSubmit(() => {})}>{render(control, register)}</form>;
};

// ----------------------------------------------------------

// eslint-disable-next-line no-unused-vars
export const Default = _args => (
  <SampleFormWrapper
    render={(control, register) => (
      <FieldArray
        variant="row"
        titleText="Order Lines"
        addButtonText="Add"
        removeButtonText="Remove"
        name="orderLines"
        entryCount={3}
        control={control}
        newEntry={() => ({})}
        renderEntry={(_item, index) => (
          <FieldRow>
            <TextInput
              id={`orderLines[${index}].partnumber`}
              {...register(`orderLines[${index}].partnumber`, {
                required: true,
                minLength: 6
              })}
              control={control}
              labelText="Partnumber"
              placeholderText="Partnumber"
            />

            <TextInput
              id={`orderLines[${index}].quantity`}
              {...register(`orderLines[${index}].quantity`, {
                required: true
              })}
              control={control}
              labelText="Quantity"
              placeholderText="Quantity"
            />
          </FieldRow>
        )}
      />
    )}
  />
);
Default.args = {
  exampleProp: 'FieldArray'
};
