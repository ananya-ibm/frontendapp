/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useState, useEffect } from 'react';
import { Mode, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useIntl } from '@exo/frontend-common-i18n';
import { ObjectSchema } from 'yup';
import { isRequired, requiredLabelText } from '../../helpers/isRequired';
import { Field } from '../../layout/Field/Field';
import { FieldPanel } from '../../layout/FieldPanel/FieldPanel';
import { FieldRow } from '../../layout/FieldRow/FieldRow';
import { TextInput } from '../../fields/TextInput/TextInput';
import { ComboBox } from '../../fields/ComboBox/ComboBox';
import { PhoneInput } from '../../fields/PhoneInput/PhoneInput';
import { Dropdown } from '../../fields/Dropdown/Dropdown';
import { BaseForm } from '../BaseForm/BaseForm';
import { onChangeResolver } from '../../helpers/onChangeResolver';

// TODO: There's a inconsistency of title and titleCode
//       see https://github.ibm.com/ixliberty/ixl-adapter/issues/867
//
//       For now, we work around this by essentially aliasing title
//       and titleCode - i.e. copying from one to the other

export const AddressForm = React.forwardRef<HTMLFormElement>(
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
      titles = [
        { name: 'Ms', value: 'ms' },
        { name: 'Miss', value: 'miss' },
        { name: 'Mrs', value: 'mrs' },
        { name: 'Mr', value: 'mr' }
      ],
       // TODO: Clear this up when https://github.ibm.com/ixliberty/ixl-adapter/issues/867 is fixed
      titleField = 'titleCode',
      countries,
      fields = ['address1', 'address2', 'city', 'country', 'province', 'zip'],
      idPrefix = 'address',
      dataId,
      addressSearch,
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

    const [result, setResult] = useState({});

    const { setValue, register, handleSubmit, formState, control, watch, reset } = useForm({
      mode,
      ...(schema && { resolver: onChangeResolver((d) => onChange?.(fixData(d)), yupResolver(schema))
      })
    });
    const intl = useIntl(intlPrefix);
    // const intr = useIntl('features.account.account-profile-ui.components');

    const country = countries ? watch('country', data?.country) : undefined;

    const foundAddress = watch('addressSearch', {});

    // Update address in case of new address search result
    useEffect(() => {
      if (
        addressSearch &&
        foundAddress &&
        JSON.stringify(result) !== JSON.stringify(foundAddress)
      ) {
        setResult(result);
        addressSearch.lookup(foundAddress).then(f => {
          setValue('address1', f.address1, { shouldDirty: true });
          setValue('address2', f.address2, { shouldDirty: true });
          setValue('city', f.city, { shouldDirty: true });
          setValue('country', f.country, { shouldDirty: true });
          setValue('province', f.province, { shouldDirty: true });
          setValue('zip', f.zip, { shouldDirty: true });
        });
      }
    }, [result, setResult, setValue, foundAddress, addressSearch]);

    // TODO: Clear this up when https://github.ibm.com/ixliberty/ixl-adapter/issues/867 is fixed
    if (data?.titleCode) {
      // eslint-disable-next-line no-param-reassign
      data.title = data?.titleCode;
    }

    return (
      <BaseForm
        // TODO: Clear this up when https://github.ibm.com/ixliberty/ixl-adapter/issues/867 is fixed
        onSubmit={(d) => onSubmit(fixData(d))}
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
        {fields.includes('addressName') && (
          <Field>
            <TextInput
              id={`${idPrefix}_addressName`}
              {...register('addressName', { required: true, minLength: 6 })}
              control={control}
              isRequired={isRequired(schema, 'addressName', true)}
              requiredLabelText={requiredLabelText(intl)}
              value={data?.addressName}
              errorText={intl.error(formState.errors.addressName)}
              labelText={intl.msg('addressName.label', 'Address Label')}
              placeholderText={intl.msg('addressName.placeholder', 'Address Label')}
            />
          </Field>
        )}

        {fields.includes('company') && (
          <Field>
            <TextInput
              id={`${idPrefix}_company`}
              {...register('company')}
              control={control}
              isRequired={isRequired(schema, 'company', false)}
              requiredLabelText={requiredLabelText(intl)}
              value={data?.company}
              errorText={intl.error(formState.errors.company)}
              labelText={intl.msg('company.label', 'Company')}
              placeholderText={intl.msg('company.placeholder', 'Company')}
            />
          </Field>
        )}

        {fields.includes('title') && (
          <Field>
            <Dropdown
              id={`${idPrefix}_title`}
              {...register('title')}
              control={control}
              isRequired={isRequired(schema, 'title', true)}
              requiredLabelText={requiredLabelText(intl)}
              errorText={intl.error(formState.errors.title)}
              value={data?.title || data?.titleCode}
              labelText={intl.msg('title.label', 'Title')}
              placeholderText={intl.msg('title.placeholder', 'Title')}
              items={titles}
            />
          </Field>
        )}

        {fields.includes('name') && (
          <Field>
            <TextInput
              id={`${idPrefix}_name`}
              {...register('name', { required: true, minLength: 3 })}
              isRequired={isRequired(schema, 'name', true)}
              requiredLabelText={requiredLabelText(intl)}
              control={control}
              value={data?.name}
              errorText={intl.error(formState.errors.name)}
              labelText={intl.msg('name.label', 'Your name')}
              placeholderText={intl.msg('name.placeholder', 'Name')}
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

        {fields.includes('phone') && (
          <Field>
            {(countries === undefined || countries[0].phonePrefix === undefined) && (
              <TextInput
                id={`${idPrefix}_phone`}
                {...register('phone', { minLength: 6 })}
                type="tel"
                control={control}
                isRequired={isRequired(schema, 'phone', false)}
                requiredLabelText={requiredLabelText(intl)}
                value={data?.phone}
                errorText={intl.error(formState.errors.phone)}
                labelText={intl.msg('AddressForm.Phonenumber.label', 'Your phone number')}
                placeholderText={intl.msg('AddressForm.Phonenumber.label', 'Your phone number')}
              />
            )}

            {countries !== undefined && countries[0].phonePrefix !== undefined && (
              <PhoneInput
                id={`${idPrefix}_phone`}
                {...register('phone', { minLength: 6 })}
                type="tel"
                control={control}
                isRequired={isRequired(schema, 'phone', false)}
                requiredLabelText={requiredLabelText(intl)}
                value={data?.phone}
                prefixes={countries.map(c => ({
                  value: c.phonePrefix,
                  name: `${c.name} (${c.phonePrefix})`
                }))}
                errorText={intl.error(formState.errors.phone)}
                labelText={intl.msg('phone.label', 'Your phone number')}
                placeholderText={intl.msg('phone.placeholder', 'Phone number')}
              />
            )}
          </Field>
        )}

        {fields.includes('addressSearch') && (
          <FieldPanel title="Search Address">
            <Field>
              <ComboBox
                id={`${idPrefix}_addressSearch`}
                {...register('addressSearch')}
                isRequired={isRequired(schema, 'addressSearch', true)}
                requiredLabelText={requiredLabelText(intl)}
                control={control}
                errorText={intl.error(formState.errors.addressSearch)}
                labelText={intl.msg('addressSearch.label', 'Search for your address')}
                placeholderText={intl.msg('addressSearch.placeholder', '13 Streetname')}
                loadItems={addressSearch?.search}
              />
            </Field>
          </FieldPanel>
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

        {fields.includes('address2') && (
          <Field>
            <TextInput
              id={`${idPrefix}_address2`}
              {...register('address2', { minLength: 3 })}
              control={control}
              isRequired={isRequired(schema, 'address2', false)}
              requiredLabelText={requiredLabelText(intl)}
              value={data?.address2}
              labelText={intl.msg(
                'AddressForm.Additional.address.label',
                'Additional address line'
              )}
              errorText={intl.error(formState.errors.address2)}
              placeholderText={intl.msg('AddressForm.Additional.address.label', 'Address line 2')}
            />
          </Field>
        )}

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

        {(fields.includes('city') || fields.includes('province') || fields.includes('zip')) && (
          <FieldRow>
            {fields.includes('city') && (
              <TextInput
                id={`${idPrefix}_city`}
                {...register('city', { required: true, minLength: 3 })}
                isRequired={isRequired(schema, 'city', true)}
                requiredLabelText={requiredLabelText(intl)}
                control={control}
                value={data?.city}
                errorText={intl.error(formState.errors.city)}
                labelText={intl.msg('AddressForm.City.label', 'City')}
                placeholderText={intl.msg('AddressForm.City.label', 'City')}
              />
            )}

            {fields.includes('province') && (
              <>
                {countries === undefined && (
                  <TextInput
                    id={`${idPrefix}_province`}
                    {...register('province', { minLength: 3 })}
                    control={control}
                    value={data?.province}
                    isRequired={isRequired(schema, 'province', false)}
                    requiredLabelText={requiredLabelText(intl)}
                    errorText={intl.error(formState.errors.province)}
                    labelText={intl.msg('AddressForm.State.Province.label', 'State/province')}
                    placeholderText={intl.msg('AddressForm.State.Province.label', 'State/province')}
                  />
                )}

                {countries !== undefined && (
                  <Dropdown
                    id={`${idPrefix}_province`}
                    {...register('province')}
                    control={control}
                    value={data?.province}
                    isRequired={isRequired(schema, 'province', false)}
                    requiredLabelText={requiredLabelText(intl)}
                    errorText={intl.error(formState.errors.province)}
                    labelText={intl.msg('province.label', 'State/province')}
                    placeholderText={intl.msg('province.placeholder', 'State/province')}
                    isDisabled={countries.find(c => c.value === country)?.states === undefined}
                    items={countries.find(c => c.value === country)?.states ?? []}
                  />
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
