/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@exo/frontend-components-base';
import * as yup from 'yup';
import { BaseForm, Field, TextInput, Dropdown } from '@exo/frontend-components-forms';
import { useForm } from 'react-hook-form';
import * as S from './TradeInForm.styles';

export const TradeInForm = ({ onClickTerms, carCondition, formProps }: Props) => {
  const schema = yup.object().shape({
    registration: yup.string().required(),
    mileage: yup
      .number()
      .required()
      .positive(),
    condition: yup.string().required()
  });

  const { register, handleSubmit, formState, control, reset } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  return (
    <S.TradeInForm>
      <BaseForm
        onSubmit={formProps?.onSubmit}
        data={formProps?.initialValues}
        renderFooter={() => <Button type="submit" label="Search Vehicle" />}
        form={{ handleSubmit, formState, reset }}
      >
        <Field>
          <TextInput
            id="registration"
            {...register('registration', { required: true, minLength: 6 })}
            isRequired={true}
            control={control}
            value={formProps?.initialValues?.registration}
            errorText={formState.errors.registration && 'Incorrect registration number'}
            labelText={'Registration Number'}
            placeholderText={'Enter your registration number'}
          />
        </Field>

        <Field>
          <TextInput
            id="mileage"
            {...register('mileage', { required: true })}
            isRequired={true}
            control={control}
            value={formProps?.initialValues?.mileage}
            errorText={formState.errors.mileage && 'Incorrect mileage'}
            labelText={'Car Mileage'}
            placeholderText={"Enter your car's mileage"}
          />
        </Field>

        <Field>
          <Dropdown
            id="condition"
            {...register('condition', { required: true })}
            isRequired={true}
            control={control}
            value={formProps?.initialValues?.condition}
            errorText={formState.errors.condition && 'Incorrect condition'}
            labelText={'Car Condition'}
            placeholderText={"Enter your car's condition..."}
            items={carCondition.options.map(o => ({ name: o, value: o }))}
          />
        </Field>

        <Button variant="link" label="Terms and conditions" onClick={onClickTerms} />
      </BaseForm>
    </S.TradeInForm>
  );
};

type Props = {
  onClickTerms?: () => void;
  carCondition: {
    label: string;
    options: string[];
  };
  formProps: {
    onSubmit: (a: any) => void;
    initialValues?: {
      mileage?: string | number;
      registration?: string;
      condition?: string;
    };
  };
};
