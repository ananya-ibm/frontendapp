/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useState, useEffect } from 'react';
import { useIntl } from '@exo/frontend-common-i18n';
import { ButtonGroup, Button } from '@exo/frontend-components-base';
import { FieldValues, FormState, UseFormHandleSubmit, UseFormReset } from 'react-hook-form';
import { FormBody } from '../../layout/FormBody/FormBody';
import { FormError } from '../../layout/FormError/FormError';
import { FormHeader } from '../../layout/FormHeader/FormHeader';
import { FormFooter } from '../../layout/FormFooter/FormFooter';

export const BaseForm = React.forwardRef<HTMLFormElement>(
  (
    {
      onSubmit,
      onCancel,
      onError,
      children,
      error,
      renderFooter,
      renderBody,
      intlPrefix = 'form',
      data,
      dataId,
      form,
      cancelLabel = 'Cancel',
      saveLabel = 'Save'
    }: Props,
    ref
  ) => {
    const [submitError, setSubmitError] = useState(undefined);
    const [previousDataId, setPreviousDataId] = useState(dataId);
    const intl = useIntl(intlPrefix);

    // Force refresh in case loading with new id
    useEffect(() => {
      if (previousDataId === dataId) return;

      setPreviousDataId(dataId);
      form.reset(data);
    }, [dataId, previousDataId, data, form]);

    const footerFn =
      renderFooter ??
      (() => (
        <ButtonGroup>
          <Button
            variant="secondary"
            onClick={onCancel}
            label={intl.msg('cancel.label', cancelLabel)}
          />
          <Button variant="primary" type="submit" label={intl.msg('save.label', saveLabel)} />
        </ButtonGroup>
      ));

    // We need Promise.resolve here as onSubmit can return a regular value -or- a promise
    const onSubmitWithErrorHandling = d =>
      Promise.resolve(onSubmit(d)).catch(e => setSubmitError(e.toString()));

    const footer = footerFn(form.formState);

    return (
      <form onSubmit={form.handleSubmit(onSubmitWithErrorHandling, onError)} ref={ref}>
        {(error || submitError) && (
          <FormHeader>
            <FormError titleText="Error">{error ?? submitError}</FormError>
          </FormHeader>
        )}

        {(renderBody ?? (body => <FormBody>{body}</FormBody>))(children)}

        {footer && <FormFooter>{footer}</FormFooter>}
      </form>
    );
  }
);

type Props = {
  onSubmit: (data: any) => void;
  onError?: (error: any) => void;
  onCancel?: () => void;

  error?: string;

  data?: any;
  dataId?: string;

  intlPrefix?: string;

  cancelLabel?: string;
  saveLabel?: string;

  form: {
    reset: UseFormReset<FieldValues>;
    formState?: FormState<FieldValues>;
    handleSubmit: UseFormHandleSubmit<FieldValues>;
  };

  renderFooter?: (state: any) => React.ReactElement;
  renderBody?: (children: any) => React.ReactElement;

  children: any;
};
