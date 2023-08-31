/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Mode, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, ButtonGroup } from '@exo/frontend-components-base';
import { useIntl } from '@exo/frontend-common-i18n';
import { ObjectSchema } from 'yup';
import { FormError } from '../../layout/FormError/FormError';
import { isRequired, requiredLabelText } from '../../helpers/isRequired';
import * as S from './SubscriptionForm.styles';
import { Field } from '../../layout/Field/Field';
import { FormBody } from '../../layout/FormBody/FormBody';
import { FormHeader } from '../../layout/FormHeader/FormHeader';
import { FormFooter } from '../../layout/FormFooter/FormFooter';
import { TextInput } from '../../fields/TextInput/TextInput';
import { onChangeResolver } from '../../helpers/onChangeResolver';

export const SubscriptionForm = ({
  onSubmit,
  onCancel,
  onError,
  onChange,
  children,
  error,
  mode = 'onBlur',
  renderFooter,
  intlPrefix = 'subscriptionForm',
  schema,
  data
}: Props) => {
  const { register, handleSubmit, formState, control } = useForm({
    mode,
    ...(schema && { resolver: onChangeResolver(onChange, yupResolver(schema)) })
  });
  const intl = useIntl(intlPrefix);

  const errorMessage = err =>
    err?.message !== '' ? err?.message : intl.msg('error.generic', 'Invalid');

  const footerFn =
    renderFooter ??
    (({ isDirty, isValid }) => (
      <ButtonGroup>
        <Button variant="secondary" onClick={onCancel} label={intl.msg('cancel.label', 'Cancel')} />
        <Button
          type="submit"
          disabled={!isDirty || !isValid}
          label={intl.msg('subscribe.label', 'Subscribe')}
        />
      </ButtonGroup>
    ));

  return (
    <S.SubscriptionForm onSubmit={handleSubmit(onSubmit, onError)}>
      {error && (
        <FormHeader>
          <FormError titleText="Error">{error}</FormError>
        </FormHeader>
      )}

      <FormBody>
        <Field>
          <TextInput
            id="name"
            {...register('name', { required: true, minLength: 3 })}
            isRequired={isRequired(schema, 'name', true)}
            requiredLabelText={requiredLabelText(intl)}
            control={control}
            value={data?.name}
            errorText={errorMessage(formState.errors.name)}
            labelText={intl.msg('name.label', 'Your name')}
            placeholderText={intl.msg('name.placeholder', 'Name')}
          />
        </Field>

        <Field>
          <TextInput
            id="email"
            {...register('email', { required: true, minLength: 6 })}
            isRequired={isRequired(schema, 'email', true)}
            requiredLabelText={requiredLabelText(intl)}
            type="email"
            control={control}
            value={data?.email}
            errorText={errorMessage(formState.errors.email)}
            labelText={intl.msg('email.label', 'Your email address')}
            placeholderText={intl.msg('email.placeholder', 'Email address')}
          />
        </Field>

        {children}
      </FormBody>

      {footerFn && <FormFooter>{footerFn(formState)}</FormFooter>}
    </S.SubscriptionForm>
  );
};

type Props = {
  onSubmit: (data: any) => void;
  onError?: (error: any) => void;
  onCancel?: () => void;
  onChange?: (data: any) => void;
  error?: string;
  intlPrefix?: string;
  children?: any;
  renderFooter?: (state: any) => React.ReactElement;
  data: {
    name?: string;
    email?: string;
  };
  mode?: Mode;
  schema?: ObjectSchema;
};
