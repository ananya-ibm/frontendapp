/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@exo/frontend-components-base';
import { TextInput, Field, FormFooter, BaseForm } from '@exo/frontend-components-forms';
import { useForm } from 'react-hook-form';
import { validatorFactory } from '@exo/frontend-common-validator-factory';
import { useNotificationContext } from '@exo/frontend-common-notification';
import { ResetPasswordContainerRenderProps } from '@exo/frontend-features-account-profile-logic';
import { useIntl } from '@exo/frontend-common-i18n';

export const ResetPassword = ({
  onSubmit,
  requireOldPassword
}: ResetPasswordContainerRenderProps) => {
  const { createNotification } = useNotificationContext()!;
  const intl = useIntl('features.account.account-profile-ui.components');

  const schema = yup
    .object()
    .shape(
      validatorFactory(
        ['password', 'confirmPassword', ...(requireOldPassword ? ['oldPassword'] : [])],
        ['password', 'confirmPassword', ...(requireOldPassword ? ['oldPassword'] : [])]
      )
    );

  const { register, handleSubmit, formState, reset, control } = useForm({
    mode: 'onBlur',
    ...(schema && { resolver: yupResolver(schema) })
  });

  return (
    <div>
      <BaseForm
        onSubmit={async values => {
          await onSubmit(values);
          createNotification({
            kind: 'success',
            title: intl.msg('ResetPassword.Password.text', 'Your password has been changed') as string
          });
        }}
        renderFooter={() => (
          <FormFooter>
            <Button type="submit" label={intl.msg('ResetPassword.Update.Button', 'Update' )}/>
          </FormFooter>
        )}
        form={{ formState, reset, handleSubmit }}
      >
        {requireOldPassword && (
          <Field>
            <TextInput
              {...register('oldPassword')}
              isRequired
              requiredLabelText={(_, labelText) => labelText}
              type="password"
              control={control}
              errorText={formState.errors.oldPassword?.message}
              labelText={intl.msg('ResetPassword.Current.Password', 'Current Password')}
              placeholderText={intl.msg('ResetPassword.Current.Password', 'Current Password')}
            />
          </Field>
        )}

        <Field>
          <TextInput
            {...register('password')}
            isRequired
            requiredLabelText={(_, labelText) => labelText}
            type="password"
            control={control}
            errorText={formState.errors.password?.message}
            labelText={intl.msg('ResetPassword.Password', 'Password')}
            placeholderText={intl.msg('ResetPassword.Password', 'Password')}
          />
        </Field>

        <Field>
          <TextInput
            {...register('confirmPassword')}
            isRequired
            requiredLabelText={(_, labelText) => labelText}
            type="password"
            control={control}
            errorText={formState.errors.confirmPassword?.message}
            labelText={intl.msg('ResetPassword.Confirm.Password', 'Confirm Password')}
            placeholderText={intl.msg('ResetPassword.Confirm.Password', 'Confirm Password')}
          />
        </Field>
      </BaseForm>
    </div>
  );
};

ResetPassword.Skeleton = () => <div>Loading...</div>;
