/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */

import React, { useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import { Field, TextInput } from '@exo/frontend-components-forms';
import { PaymentHandle } from '@exo/frontend-features-payments-logic';

export const AccountPayment = React.forwardRef<PaymentHandle>((_: Props, ref) => {
  const { register, handleSubmit, formState, control } = useForm({});

  useImperativeHandle(
    ref,
    () => ({
      submit: async () => {
        return new Promise<{ name: string; value: string }[]>((resolve, reject) => {
          handleSubmit(
            data => resolve([{ name: 'purchaseOrder', value: data.purchaseOrder }]),
            error => reject(error)
          )();
        });
      }
    }),
    [handleSubmit]
  );

  return (
    <Field>
      <TextInput
        id="purchaseOrder"
        {...register('purchaseOrder', { required: true, minLength: 6 })}
        isRequired
        requiredLabelText={() => 'Purchase Order *'}
        control={control}
        value=""
        errorText={formState.errors.purchaseOrder && 'Invalid'}
        labelText="Purchase Order"
        placeholderText="Your purchase order number"
      />
    </Field>
  );
});

type Props = {};
