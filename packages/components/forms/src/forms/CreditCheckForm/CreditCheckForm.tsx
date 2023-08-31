/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Mode, useForm } from 'react-hook-form';
import { useIntl } from '@exo/frontend-common-i18n';
import { ObjectSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { onChangeResolver } from '../../helpers/onChangeResolver';
import { isRequired, requiredLabelText } from '../../helpers/isRequired';
import { Field } from '../../layout/Field/Field.styles';
import { FieldRow } from '../../layout/FieldRow/FieldRow.styles';
import { BaseForm } from '../BaseForm/BaseForm';
import { TextInput } from '../../fields/TextInput/TextInput';
import { Dropdown } from '../../fields/Dropdown/Dropdown';

export const CreditCheckForm = ({
  onSubmit,
  onCancel,
  onError,
  onChange,
  mode = 'onBlur',
  children,
  error,
  renderFooter,
  renderBody,
  intlPrefix,
  schema,
  data,
  titles = [
    { name: 'Ms', value: 'ms' },
    { name: 'Miss', value: 'miss' },
    { name: 'Mrs', value: 'mrs' },
    { name: 'Mr', value: 'mr' }
  ],
  fields = ['title', 'firstName', 'lastName', 'dateOfBirth','amount', 'monthlyAmount', 'term'],
  idPrefix = 'creditCheck',
  dataId,
  cancelLabel = 'Cancel',
  saveLabel = 'Save'
}: Props) => {
  const { /* setValue, */ register, handleSubmit, formState, control, /* watch, */ reset } =
    useForm({
      mode,
      ...(schema && { resolver: onChangeResolver(onChange, yupResolver(schema)) })
    });

  const intl = useIntl(intlPrefix);
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const terms = [12, 18, 24, 30, 36, 42, 48];
  const termsList = terms.map(term => ({
      name: term,
      value: term
  }));

  return (
    <BaseForm
      onSubmit={onSubmit}
      onCancel={onCancel}
      onError={onError}
      error={error}
      data={data}
      dataId={dataId}
      intlPrefix={intlPrefix}
      renderBody={renderBody}
      renderFooter={renderFooter}
      cancelLabel={cancelLabel}
      saveLabel={saveLabel}
      form={{
        handleSubmit,
        formState,
        reset
      }}
    >
      {fields.includes('title') && (
        <Field>
          <Dropdown
            id={`${idPrefix}_title`}
            {...register('title')}
            control={control}
            isRequired={isRequired(schema, 'title', false)}
            requiredLabelText={requiredLabelText(intl)}
            value={data?.title}
            labelText={intl.msg('title.label', 'Title')}
            placeholderText={intl.msg('title.placeholder', 'Title')}
            items={titles}
          />
        </Field>
      )}
      {(fields.includes('firstName') || fields.includes('lastName')) && (
        <FieldRow>
          {fields.includes('firstName') && (
            <TextInput
              id={`${idPrefix}_firstName`}
              {...register('firstName', { minLength: 3 })}
              control={control}
              isRequired={isRequired(schema, 'firstName', false)}
              requiredLabelText={requiredLabelText(intl)}
              value={data?.firstName}
              errorText={intl.error(formState.errors.firstName)}
              labelText={intl.msg('CreditCheckForm.Firstname.label', 'Your first name')}
              placeholderText={intl.msg('CreditCheckForm.Firstname.label', 'Your first name')}
            />
          )}

          {fields.includes('lastName') && (
            <TextInput
              id={`${idPrefix}_lastName`}
              {...register('lastName', { required: true, minLength: 3 })}
              isRequired={isRequired(schema, 'lastName', true)}
              requiredLabelText={requiredLabelText(intl)}
              control={control}
              value={data?.lastName}
              errorText={intl.error(formState.errors.lastName)}
              labelText={intl.msg('CreditCheckForm.Lastname.label', 'Your last name')}
              placeholderText={intl.msg('CreditCheckForm.Lastname.label', 'Your last name')}
            />
          )}
        </FieldRow>
      )}
      {fields.includes('dateOfBirth') && (
        <Field>
          <TextInput
            id={`${idPrefix}_dateOfBirth`}
            {...register('dateOfBirth', {
              required: false,
              minLength: 3
            })} // TODO - check what this function does
            control={control}
            isRequired={isRequired(schema, 'dateOfBirth', true)}
            requiredLabelText={requiredLabelText(intl)}
            value={data?.dateOfBirth}
            errorText={intl.error(formState.errors.dateOfBirth)}
            labelText={intl.msg('dateOfBirth.label', 'Date of Birth')}
            placeholderText={intl.msg('dateOfBirth.placeholder', 'Date of Birth')}
          />
        </Field>
      )}
      {fields.includes('amount') && (
        <Field>
          <TextInput
            id={`${idPrefix}_amount`}
            {...register('amount', { required: false, minLength: 3 })} // TODO - check what this function does
            control={control}
            isRequired={isRequired(schema, 'amount', true)}
            requiredLabelText={requiredLabelText(intl)}
            value={data?.amount}
            errorText={intl.error(formState.errors.amount)}
            labelText={intl.msg('amount.label', 'Total Repayable Amount')}
            placeholderText={intl.msg('amount.placeholder', 'Amount')}
          />
        </Field>
      )}
      {fields.includes('monthlyAmount') && (
        <Field>
          
            <TextInput
              id={`${idPrefix}_monthlyAmount`}
              {...register('monthlyAmount', { minLength: 3 })}
              control={control}
              value={data?.monthlyAmount}
              isRequired={isRequired(schema, 'monthlyAmount', false)}
              requiredLabelText={requiredLabelText(intl)}
              errorText={intl.error(formState.errors.monthlyAmount)}
              labelText={intl.msg('monthlyAmount.label', 'Monthly Repayable Amount')}
              placeholderText={intl.msg('CreditCheckFrom.monthlyAmount', 'Monthly amount')}
            />
          
        </Field>
      )}

      {fields.includes('term') && (
        <Field>
          {months !== undefined && (
            <Dropdown
              id={`${idPrefix}_term`}
              {...register('term')}
              control={control}
              value={data?.term}
              isRequired={isRequired(schema, 'term', false)}
              requiredLabelText={requiredLabelText(intl)}
              errorText={intl.error(formState.errors.term)}
              labelText={intl.msg('term', 'Term')}
              placeholderText={intl.msg(
                'term.placeholder',
                'Please select the term'
              )}
              items={termsList}
            />
          )}
        </Field>
      )}
      {children}
    </BaseForm>
  );
};

// TODO - set proper props (these are from CreditCheckForm)
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
  data?: Data;
  mode?: Mode;
  cancelLabel?: string;
  saveLabel?: string;
  schema?: ObjectSchema;
  loadItems?: (input: string) => Promise<{ value: string; name: string }[]>;
  fields?: string[];
  dataId?: string;
  idPrefix?: string;
  titles?: {
    name: string;
    value: string;
  }[];
  countries?: {
    name: string;
    value: string;
    phonePrefix?: string;
    states?: {
      name: string;
      value: string;
    }[];
  }[];
};

type Data = {
  title?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  amount?: number;
  term?: number;
  monthlyAmount?: number;
};
