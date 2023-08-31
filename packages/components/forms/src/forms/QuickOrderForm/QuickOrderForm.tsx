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
import { ButtonGroup, Button } from '@exo/frontend-components-base';
import { useIntl } from '@exo/frontend-common-i18n';
import { ObjectSchema } from 'yup';
import { FormError } from '../../layout/FormError/FormError';
import { isRequired, requiredLabelText } from '../../helpers/isRequired';
import { Field } from '../../layout/Field/Field';
import { FieldRow } from '../../layout/FieldRow/FieldRow';
import { FormBody } from '../../layout/FormBody/FormBody';
import { FormHeader } from '../../layout/FormHeader/FormHeader';
import { FormFooter } from '../../layout/FormFooter/FormFooter';
import { TextInput } from '../../fields/TextInput/TextInput';
import { FieldArray } from '../../layout/FieldArray/FieldArray';
import { ComboBox } from '../../fields/ComboBox/ComboBox';
import { onChangeResolver } from '../../helpers/onChangeResolver';
import * as S from './QuickOrderForm.styles';

export const QuickOrderForm = ({
  onSubmit,
  onCancel,
  onChange,
  onError,
  children,
  error,
  renderFooter,
  mode = 'onBlur',
  intlPrefix = 'QuickOrderForm',
  schema,
  data,
  loadItems
}: Props) => {
  const { register, handleSubmit, formState, control } = useForm({
    mode,
    ...(schema && { resolver: onChangeResolver(onChange, yupResolver(schema)) })
  });

  const intl = useIntl(intlPrefix);

  const footerFn =
    renderFooter ??
    (({ isDirty, isValid }) => (
      <ButtonGroup>
        <Button variant="secondary" onClick={onCancel} label={intl.msg('cancel.label', 'Cancel')} />
        <Button
          type="submit"
          disabled={!isDirty || !isValid}
          label={intl.msg('submit.label', 'Submit')}
        />
      </ButtonGroup>
    ));

  return (
    <S.QuickOrderForm onSubmit={handleSubmit(onSubmit, onError)}>
      {error && (
        <FormHeader>
          <FormError titleText="Error">{error}</FormError>
        </FormHeader>
      )}

      <FormBody>
        <Field>
          <TextInput
            id="reference"
            {...register('reference', { required: true, minLength: 6 })}
            control={control}
            value={data?.reference}
            isRequired={isRequired(schema, 'reference', true)}
            requiredLabelText={requiredLabelText(intl)}
            errorText={intl.error(formState.errors.reference)}
            labelText={intl.msg('reference.label', 'Your Reference')}
            placeholderText={intl.msg('reference.placeholder', 'Reference')}
          />
        </Field>

        <Field>
          <TextInput
            id="orderNumber"
            {...register('orderNumber', { required: true, minLength: 6 })}
            control={control}
            value={data?.orderNumber}
            isRequired={isRequired(schema, 'orderNumber', false)}
            requiredLabelText={requiredLabelText(intl)}
            errorText={intl.error(formState.errors.orderNumber)}
            labelText={intl.msg('orderNumber.label', 'Your Order Number')}
            placeholderText={intl.msg('orderNumber.placeholder', 'Your Order Number')}
          />
        </Field>

        <FieldArray
          variant="row"
          titleText="Order Lines"
          addButtonText={intl.msg('addOrderLine.label', 'Add Order Line')}
          removeButtonText={intl.msg('remove.label', 'Remove')}
          name="orderLines"
          entryCount={Math.max(data?.orderLines?.length ?? 0, 3)}
          control={control}
          newEntry={() => ({ partnumber: '', quantity: 1 })}
          renderEntry={(_item, index) => (
            <FieldRow>
              <ComboBox
                id={`orderLines[${index}].partnumber`}
                {...register(`orderLines[${index}].partnumber`, {
                  required: true,
                  minLength: 6
                })}
                isRequired={isRequired(schema, `orderLines[${index}].partnumber`, true)}
                requiredLabelText={requiredLabelText(intl)}
                loadItems={loadItems}
                control={control}
                value={data?.orderLines?.[index]?.partnumber}
                valueLabel={
                  data?.orderLines?.[index]?.partnumberAndName ??
                  data?.orderLines?.[index]?.partnumber
                }
                errorText={intl.error(formState.errors?.orderLines?.[index]?.partnumber)}
                labelText={intl.msg('partnumber.label', 'Partnumber')}
                placeholderText={intl.msg('partnumber.placeholder', 'Partnumber')}
              />

              <TextInput
                id={`orderLines[${index}].quantity`}
                {...register(`orderLines[${index}].quantity`, {
                  required: true
                })}
                isRequired={isRequired(schema, `orderLines[${index}].quantity`, true)}
                requiredLabelText={requiredLabelText(intl)}
                control={control}
                value={data?.orderLines?.[index]?.quantity?.toString() ?? '1'}
                errorText={intl.error(formState.errors?.orderLines?.[index]?.quantity)}
                labelText={intl.msg('quantity.label', 'Quantity')}
                placeholderText={intl.msg('quantity.placeholder', 'Quantity')}
              />
            </FieldRow>
          )}
        />

        {children}
      </FormBody>

      {footerFn && <FormFooter>{footerFn(formState)}</FormFooter>}
    </S.QuickOrderForm>
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
  data?: Data;
  mode?: Mode;
  schema?: ObjectSchema;
  loadItems?: (input: string) => Promise<{ value: string; name: string }[]>;
};

type Data = {
  reference?: string;
  orderNumber?: string;
  orderLines: {
    partnumber: string;
    partnumberAndName: string;
    quantity: number;
  }[];
};
