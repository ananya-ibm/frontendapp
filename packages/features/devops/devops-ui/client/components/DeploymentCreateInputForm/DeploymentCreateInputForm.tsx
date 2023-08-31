/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Mode, useForm } from 'react-hook-form';
import { ObjectSchema } from 'yup';
import {
  onChangeResolver,
  BaseForm,
  Field,
  TextInput,
  isRequired,
  requiredLabelText
} from '@exo/frontend-components-forms';
import { yupResolver } from '@hookform/resolvers/yup';
import { useIntl } from '@exo/frontend-common-i18n';
import { DeploymentCreateInput, useDevopsModification } from '@exo/frontend-features-devops-logic';
import { useNotificationContext } from '@exo/frontend-common-notification';

export const DeploymentCreateInputForm = React.forwardRef<HTMLFormElement>(
  (
    {
      // onSubmit,
      onChange,
      onError,
      children,
      error,
      renderFooter,
      renderBody,
      intlPrefix = 'deploymentCreateInputForm',
      mode = 'onBlur',
      idPrefix = 'deploymentCreateInput',
      schema,
      data
    }: Props,
    ref
  ) => {
    const { register, handleSubmit, formState, control, reset } = useForm({
      mode,
      ...(schema && { resolver: onChangeResolver(onChange, yupResolver(schema)) })
    });
    const intl = useIntl(intlPrefix);
    const { createNotification } = useNotificationContext()!;
    const { deploymentCreate } = useDevopsModification();

    const handleDeploy = async () => {
      // @ts-ignore
      await deploymentCreate(data.id) &&
        createNotification({
          kind: 'success',
          title: 'Your deployment has been triggered'
        });
    };

    return (
      <BaseForm
        onSubmit={handleDeploy}
        onError={onError}
        error={error}
        renderFooter={renderFooter}
        renderBody={renderBody}
        data={data}
        intlPrefix={intlPrefix}
        form={{ handleSubmit, formState, reset }}
        ref={ref}
      >
        <Field>
          <TextInput
            id={`${idPrefix}_name`}
            {...register('name', { required: true, minLength: 6 })}
            isRequired={isRequired(schema, 'name', true)}
            requiredLabelText={requiredLabelText(intl)}
            control={control}
            value={data?.name}
            errorText={intl.error(formState.errors.name)}
            labelText={intl.msg('name.label', 'Name')}
            placeholderText={intl.msg('name.placeholder', 'Name')}
          />
        </Field>

        {children}
      </BaseForm>
    );
  }
);

type Props = {
  onSubmit: (data: any) => void;
  onError?: (error: any) => void;
  onCancel?: () => void;
  onChange?: (data: any) => void;
  error?: string;
  intlPrefix?: string;
  children?: any;
  renderFooter?: (state: any) => React.ReactElement;
  renderBody?: (state: any) => React.ReactElement;
  data?: DeploymentCreateInput;
  mode?: Mode;
  schema?: ObjectSchema;
  idPrefix?: string;
};
