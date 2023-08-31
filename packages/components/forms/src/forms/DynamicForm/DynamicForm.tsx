/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/forbid-prop-types */

import React, { useState } from 'react';
import { FieldValues, FormState, Mode, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useIntl } from '@exo/frontend-common-i18n';
import { Button, ButtonGroup } from '@exo/frontend-components-base';
import { defaultSchemaHandler } from './defaultSchema';
import { legacySchemaHandler } from './legacySchema';
import { FormBody } from '../../layout/FormBody/FormBody';
import { FormFooter } from '../../layout/FormFooter/FormFooter';
import { onChangeResolver } from '../../helpers/onChangeResolver';
import {
  CustomFieldDefinitions,
  DynamicFormState,
  FormSchemaHandler,
  ValidationFunction
} from './types';

const getSchema = (schemaName): FormSchemaHandler<any> => {
  switch (schemaName) {
    case 'default':
      return defaultSchemaHandler;
    case 'legacy':
      return legacySchemaHandler;
    default:
      throw new Error(`Schema named ${schemaName} does not exist`);
  }
};

export const DynamicForm = React.forwardRef<HTMLFormElement>(
  (
    {
      form,
      data,
      schema = 'default',
      intlPrefix = 'dynamicForm',
      renderFooter,
      customFieldDefinitions,
      customValidationRules,
      onChange,
      onSubmit,
      onCancel,
      onError,
      mode = 'onBlur',
      viewOnly
    }: Props,
    ref
  ) => {
    const s = getSchema(schema);

    const parsedForm = s.parse(form);

    const [dynamicFormState, setDynamicFormState] = useState(s.getFormState(parsedForm));

    const intl = useIntl(intlPrefix);

    const validationSchema = s.getValidationSchema(parsedForm, {
      intl,
      customValidationRules: customValidationRules ?? {}
    });
    const { register, handleSubmit, formState, control, watch } = useForm({
      mode,
      resolver: onChangeResolver(onChange, yupResolver(validationSchema)),
      defaultValues: data
    });

    const formControls = s.getFormControls(parsedForm);

    const footerFn =
      renderFooter ??
      (({ isDirty, isValid }) => {
        const f = s.getFooter(parsedForm, {
          intl,
          dynamicFormState,
          formState,
          actions: {
            submit: formControls.canSubmit(formState, dynamicFormState) ? () => {} : undefined,
            cancel: onCancel,
            next: formControls.hasNext(formState, dynamicFormState)
              ? () => setDynamicFormState(formControls.next(formState, dynamicFormState))
              : undefined,
            previous: formControls.hasPrevious(formState, dynamicFormState)
              ? () => setDynamicFormState(formControls.previous(formState, dynamicFormState))
              : undefined
          }
        });

        if (f) return f;

        return (
          <ButtonGroup>
            <Button type="button" onClick={onCancel} label={intl.msg('cancel.label', 'Cancel')} />
            <Button
              type="submit"
              disabled={!isDirty || !isValid}
              label={intl.msg('save.label', 'Save')}
            />
          </ButtonGroup>
        );
      });

    return (
      <form onSubmit={handleSubmit(onSubmit, onError)} ref={ref}>
        <FormBody>
          {s.getComponentTree(parsedForm, {
            control,
            register,
            data,
            schema: validationSchema,
            errors: formState.errors,
            intl,
            watch,
            dynamicFormState,
            setDynamicFormState,
            customFieldDefinitions: customFieldDefinitions ?? {},
            viewOnly: !!viewOnly
          })}
        </FormBody>

        <FormFooter>{footerFn(formState, dynamicFormState)}</FormFooter>
      </form>
    );
  }
);

type Props = {
  onSubmit: (data: any) => void;
  onError?: (error: any) => void;
  onCancel?: () => void;
  onChange?: (data: any) => void;

  form: any;
  data?: any;

  viewOnly?: boolean;

  customFieldDefinitions?: CustomFieldDefinitions;
  customValidationRules?: Record<string, ValidationFunction>;

  intlPrefix?: string;
  renderFooter?: (
    state: FormState<FieldValues>,
    dynamicFormState: DynamicFormState
  ) => React.ReactElement;
  mode?: Mode;
  schema?: 'default' | 'legacy';
};
