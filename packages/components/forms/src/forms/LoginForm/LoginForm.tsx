/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Button } from '@exo/frontend-components-base';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Mode, useForm } from 'react-hook-form';
import { useIntl } from '@exo/frontend-common-i18n';
import { ObjectSchema } from 'yup';
import { isRequired, requiredLabelText } from '../../helpers/isRequired';
import { Field } from '../../layout/Field/Field';
import { TextInput } from '../../fields/TextInput/TextInput';
import { BaseForm } from '../BaseForm/BaseForm';
import { onChangeResolver } from '../../helpers/onChangeResolver';

// eslint-disable-next-line react/prop-types
export const LoginForm = ({
  onSubmit,
  onChange,
  onError,
  children,
  error,
  renderFooter,
  renderBody,
  intlPrefix = 'loginForm',
  mode = 'onBlur',
  idPrefix = 'login',
  schema,
  data
}: Props) => {
  const { register, handleSubmit, formState, control, reset } = useForm({
    mode,
    ...(schema && { resolver: onChangeResolver(onChange, yupResolver(schema)) })
  });
  const intl = useIntl(intlPrefix);

  return (
    <BaseForm
      onSubmit={onSubmit}
      onError={onError}
      error={error}
      renderFooter={
        renderFooter ?? (() => <Button type="submit" label={intl.msg('login.label', 'Login')} />)
      }
      renderBody={renderBody}
      data={data}
      intlPrefix={intlPrefix}
      form={{ handleSubmit, formState, reset }}
    >
      <Field>
        <TextInput
          id={`${idPrefix}_username`}
          {...register('username', { required: true, minLength: 6 })}
          isRequired={isRequired(schema, 'username', true)}
          requiredLabelText={requiredLabelText(intl)}
          control={control}
          value={data?.username}
          errorText={intl.error(formState.errors.username)}
          labelText={intl.msg('username.label', 'Your email address')}
          placeholderText={intl.msg('username.placeholder', 'Username')}
        />
      </Field>

      <Field>
        <TextInput
          id={`${idPrefix}_password`}
          {...register('password', { required: true, minLength: 6 })}
          isRequired={isRequired(schema, 'password', true)}
          requiredLabelText={requiredLabelText(intl)}
          type="password"
          control={control}
          value={data?.password}
          errorText={intl.error(formState.errors.password)}
          labelText={intl.msg('password.label', 'Password')}
          placeholderText={intl.msg('password.placeholder', 'Password')}
        />
      </Field>

      {children}
    </BaseForm>
  );
};

type Props = {
  onSubmit: (data: any) => void;
  onError?: (error: any) => void;
  onChange?: (data: any) => void;
  error?: string;
  intlPrefix?: string;
  children?: any;
  renderFooter?: (state: any) => React.ReactElement;
  renderBody?: (state: any) => React.ReactElement;
  data?: {
    username: string;
    password: string;
  };
  mode?: Mode;
  schema?: ObjectSchema;
  idPrefix?: string;
};
