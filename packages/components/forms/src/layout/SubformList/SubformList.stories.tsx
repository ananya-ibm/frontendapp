/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { useForm } from 'react-hook-form';
import { SubformList } from './SubformList';
import { TextInput } from '../../fields/TextInput/TextInput';
import { Field } from '../Field/Field';

export default {
  title: 'Components/Forms/Layout/SubformList',
  component: SubformList
};

// eslint-disable-next-line react/prop-types
const SampleFormWrapper = ({ render }) => {
  const { register, handleSubmit, control } = useForm({
    mode: 'onBlur'
  });

  return <form onSubmit={handleSubmit(() => {})}>{render(control, register)}</form>;
};

// -------------------------------------------------------------------

// eslint-disable-next-line no-unused-vars
export const Default = args => (
  <SampleFormWrapper
    render={(control, register) => (
      <SubformList
        {...args}
        newEntry={type => ({ type })}
        control={control}
        types={[
          { value: 'name', name: 'Name' },
          { value: 'email', name: 'Email' }
        ]}
        discriminatorId={(_item, index) => `components[${index}].type`}
        discriminatorValue={item => item.type}
        renderEntry={(item, index) =>
          item.type === 'name' ? (
            <>
              <Field>
                <TextInput
                  id={`components[${index}].firstName`}
                  {...register(`components[${index}].firstName`, {
                    required: true,
                    minLength: 6
                  })}
                  control={control}
                  labelText="First Name"
                  placeholderText="First Name"
                />
              </Field>

              <Field>
                <TextInput
                  id={`components[${index}].lastName`}
                  {...register(`components[${index}].lastName`, {
                    required: true,
                    minLength: 6
                  })}
                  control={control}
                  labelText="Last Name"
                  placeholderText="Last Name"
                />
              </Field>
            </>
          ) : (
            <TextInput
              id={`components[${index}].email`}
              {...register(`components[${index}].email`, {
                required: true,
                minLength: 6
              })}
              control={control}
              labelText="Email"
              placeholderText="Email"
            />
          )
        }
      />
    )}
  />
);
Default.args = {
  titleText: 'Components',
  addButtonText: 'Add',
  removeButtonText: 'Remove',
  name: 'components',
  typeSelectorLabel: 'Choose Module to Add',
  typeSelectorPlaceholder: 'Module'
};
