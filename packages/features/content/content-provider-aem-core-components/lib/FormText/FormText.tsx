/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/boolean-prop-naming */

import React from 'react';
import { Field, TextInput, TextArea } from '@exo/frontend-components-forms';

export const FormText = (props: Props) => {
  if (props.type === 'textarea') {
    return (
      <Field>
        <TextArea
          labelText={props.title}
          placeholderText={props.title}
          id={props.id}
          name={props.name}
          helpText={props.helpMessage}
          isRequired={props.required}
        />
      </Field>
    );
  } else if (props.type === 'text') {
    return (
      <Field>
        <TextInput
          labelText={props.title}
          placeholderText={props.title}
          id={props.id}
          name={props.name}
          helpText={props.helpMessage}
          isRequired={props.required}
        />
      </Field>
    );
  } else if (props.type === 'date') {
    return (
      <Field>
        <div>Date is not implemented</div>
      </Field>
    );
  } else if (props.type === 'email') {
    return (
      <Field>
        <div>Email is not implemented</div>
      </Field>
    );
  } else if (props.type === 'password') {
    return (
      <Field>
        <div>Password is not implemented</div>
      </Field>
    );
  } else {
    return <div>FormText Not Implemented</div>;
  }
};

type Props = {
  constraintMessage: string;
  defaultValue?: string;
  helpMessage?: string;
  id: string;
  name: string;
  readOnly: boolean;
  required: boolean;
  requiredMessage: string;
  rows?: number;
  title: string;
  type: string;
  value: string;
};
