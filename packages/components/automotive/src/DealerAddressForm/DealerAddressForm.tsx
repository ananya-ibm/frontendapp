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
import { useIntl } from '@exo/frontend-common-i18n';
import { ObjectSchema } from 'yup';
import { isRequired, requiredLabelText, Field, FieldRow, TextInput, Dropdown, BaseForm, onChangeResolver } from '@exo/frontend-components-forms';

// TODO: There's a inconsistency of title and titleCode
//       see https://github.ibm.com/ixliberty/ixl-adapter/issues/867
//
//       For now, we work around this by essentially aliasing title
//       and titleCode - i.e. copying from one to the other

export const DealerAddressForm = React.forwardRef<HTMLFormElement>(
  (
    {
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
      // TODO: Clear this up when https://github.ibm.com/ixliberty/ixl-adapter/issues/867 is fixed
      titleField = 'titleCode',
      countries,
      fields = ['address1', 'country', 'zip'],
      idPrefix = 'address',
      dataId,
      cancelLabel = 'Cancel',
      saveLabel = 'Save',
      disabledFields = []
    }: Props,
    ref
  ) => {
    // TODO: Clear this (onChange) when https://github.ibm.com/ixliberty/ixl-adapter/issues/867 is fixed
    const fixData = (d: any) => {
      const res = d;
      res[titleField] = res.title;
      if (titleField === 'titleCode') delete res.title;
      return res;
    };

    const { register, handleSubmit, formState, control, reset } = useForm({
      mode,
      ...(schema && {
        resolver: onChangeResolver(d => onChange?.(fixData(d)), yupResolver(schema))
      })
    });
    const intl = useIntl(intlPrefix);
    // const intr = useIntl('features.account.account-profile-ui.components');

    // TODO: Clear this up when https://github.ibm.com/ixliberty/ixl-adapter/issues/867 is fixed
    if (data?.titleCode) {
      // eslint-disable-next-line no-param-reassign
      data.title = data?.titleCode;
    }

    return (
      <BaseForm
        // TODO: Clear this up when https://github.ibm.com/ixliberty/ixl-adapter/issues/867 is fixed
        onSubmit={d => onSubmit(fixData(d))}
        onCancel={onCancel}
        onError={onError}
        error={error}
        renderFooter={renderFooter}
        renderBody={renderBody}
        data={data}
        dataId={dataId}
        intlPrefix={intlPrefix}
        cancelLabel={cancelLabel}
        saveLabel={saveLabel}
        form={{ reset, handleSubmit, formState }}
        ref={ref}
      >
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
                labelText={intl.msg('AddressForm.Firstname.label', 'Your first name')}
                placeholderText={intl.msg('AddressForm.Firstname.label', 'Your first name')}
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
                labelText={intl.msg('AddressForm.Lastname.label', 'Your last name')}
                placeholderText={intl.msg('AddressForm.Lastname.label', 'Your last name')}
              />
            )}
          </FieldRow>
        )}

        {fields.includes('email') && (
          <Field>
            <TextInput
              id={`${idPrefix}_email`}
              {...register('email', { minLength: 6 })}
              type="email"
              control={control}
              isRequired={isRequired(schema, 'email', false)}
              requiredLabelText={requiredLabelText(intl)}
              value={data?.email}
              errorText={intl.error(formState.errors.email)}
              labelText={intl.msg('AddressForm.Email.label', 'Your email address')}
              isDisabled={disabledFields?.includes('email')}
              placeholderText={intl.msg('AddressForm.Email.label', 'Your email address')}
            />
          </Field>
        )}

        {fields.includes('address1') && (
          <Field>
            <TextInput
              id={`${idPrefix}_address1`}
              {...register('address1', { required: true, minLength: 6 })}
              isRequired={isRequired(schema, 'address1', true)}
              requiredLabelText={requiredLabelText(intl)}
              control={control}
              value={data?.address1}
              errorText={intl.error(formState.errors.address1)}
              labelText={intl.msg('AddressForm.Address.label', 'Your address')}
              placeholderText={intl.msg('AddressForm.Address.label', 'Address')}
            />
          </Field>
        )}

        {(fields.includes('country') || fields.includes('zip')) && (
          <FieldRow>
            {fields.includes('country') && (
              <>
                {countries === undefined && (
                  <Field>
                    <TextInput
                      id={`${idPrefix}_country`}
                      {...register('country', { minLength: 3 })}
                      control={control}
                      isRequired={isRequired(schema, 'country', false)}
                      requiredLabelText={requiredLabelText(intl)}
                      value={data?.country}
                      errorText={intl.error(formState.errors.country)}
                      labelText={intl.msg('AddressForm.Country.label', 'Country')}
                      placeholderText={intl.msg('AddressForm.Country.label', 'Country')}
                    />
                  </Field>
                )}

                {countries !== undefined && (
                  <Field>
                    <Dropdown
                      id={`${idPrefix}_country`}
                      {...register('country')}
                      control={control}
                      value={data?.country}
                      errorText={intl.error(formState.errors.country)}
                      isRequired={isRequired(schema, 'country', false)}
                      requiredLabelText={requiredLabelText(intl)}
                      labelText={intl.msg('country.label', 'Country')}
                      placeholderText={intl.msg('country.placeholder', 'Country')}
                      items={countries}
                    />
                  </Field>
                )}
              </>
            )}

            {fields.includes('zip') && (
              <TextInput
                id={`${idPrefix}_zip`}
                {...register('zip', { required: true, minLength: 3 })}
                isRequired={isRequired(schema, 'zip', true)}
                requiredLabelText={requiredLabelText(intl)}
                control={control}
                value={data?.zip}
                errorText={intl.error(formState.errors.zip)}
                labelText={intl.msg('AddressForm.Postal.zipcode.label', 'Postal/Zip Code')}
                placeholderText={intl.msg('AddressForm.Postal.zipcode.label', 'Postal/Zip Code')}
              />
            )}
          </FieldRow>
        )}

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
  addressSearch?: AddressSearch;
  disabledFields?: string[];

  // TODO: Clear this up when https://github.ibm.com/ixliberty/ixl-adapter/issues/867 is fixed
  titleField?: 'title' | 'titleCode';
};

type Data = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  address1?: string;
  address2?: string;
  city?: string;
  country?: string;
  province?: string;
  zip?: string;
  addressName?: string;

  // TODO: Clear this up when https://github.ibm.com/ixliberty/ixl-adapter/issues/867 is fixed
  title?: string;
  titleCode?: string;
};

type AddressSearch = {
  search: (q: string) => Promise<any>;
  lookup: (q: string) => Promise<any>;
};
