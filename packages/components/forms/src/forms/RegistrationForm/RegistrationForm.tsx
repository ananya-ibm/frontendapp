/* eslint-disable no-restricted-syntax */
/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useState, useEffect } from 'react';
import { useForm, Mode } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useIntl } from '@exo/frontend-common-i18n';
import { ObjectSchema } from 'yup';
import { isRequired, requiredLabelText } from '../../helpers/isRequired';
import { Field } from '../../layout/Field/Field';
import { FieldRow } from '../../layout/FieldRow/FieldRow';
import { FieldPanel } from '../../layout/FieldPanel/FieldPanel';
import { TextInput } from '../../fields/TextInput/TextInput';
import { PhoneInput } from '../../fields/PhoneInput/PhoneInput';
import { Dropdown } from '../../fields/Dropdown/Dropdown';
import { BaseForm } from '../BaseForm/BaseForm';
import { ComboBox } from '../../fields/ComboBox/ComboBox';
import { Checkbox } from '../../fields/Checkbox/Checkbox';
import { RadioButtonGroup } from '../../fields/RadioButtonGroup/RadioButtonGroup';
import { onChangeResolver } from '../../helpers/onChangeResolver';

export const RegistrationForm = ({
  onSubmit,
  onCancel,
  onError,
  onChange,
  children,
  error,
  renderFooter,
  intlPrefix = 'RegistrationForm',
  schema,
  data,
  mode = 'onBlur',
  countries,
  titles = [
    { name: 'Ms', value: 'ms' },
    { name: 'Miss', value: 'miss' },
    { name: 'Mrs', value: 'mrs' },
    { name: 'Mr', value: 'mr' }
  ],
  fields = ['name', 'email', 'password', 'integrityPolicy', 'termsAndConditions'],
  integrityPolicyLink = '#integrityPolicy',
  termsAndConditionsLink = '#termsAndConditions',
  addressSearch,
  idPrefix = 'register',
  renderBody
}: Props) => {
  const [result, setResult] = useState({});

  const { register, handleSubmit, formState, control, watch, setValue, reset } = useForm({
    mode,
    ...(schema && { resolver: onChangeResolver(onChange, yupResolver(schema)) })
  });
  const intl = useIntl(intlPrefix);
  // const intr = useIntl('features.account.account-profile-ui.components');

  const country = countries ? watch('country', data?.country) : undefined;

  const foundAddress = watch('addressSearch', {});

  // Update address in case of new address search result
  useEffect(() => {
    if (addressSearch && foundAddress && JSON.stringify(result) !== JSON.stringify(foundAddress)) {
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

  return (
    <BaseForm
      onSubmit={onSubmit}
      onCancel={onCancel}
      onError={onError}
      error={error}
      renderFooter={renderFooter}
      renderBody={renderBody}
      data={data}
      intlPrefix={intlPrefix}
      saveLabel={intl.msg('RegistrationForm.Button.Register', 'Register')}
      form={{ handleSubmit, formState, reset }}
    >
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
              {...register('firstName', { required: true, minLength: 3 })}
              isRequired={isRequired(schema, 'firstName', true)}
              requiredLabelText={requiredLabelText(intl)}
              control={control}
              value={data?.firstName}
              errorText={intl.error(formState.errors.firstName)}
              labelText={intl.msg('RegistrationForm.YourFirstname', 'Your first name')}
              placeholderText={intl.msg('RegistrationForm.Firstname', 'First name')}

            />
          )}

          {fields.includes('lastName') && (
            <TextInput
              id={`${idPrefix}_lastName`}
              {...register('lastName', { required: true, minLength: 3 })}
              isRequired={isRequired(schema, 'lastName', true)}
              requiredLabelText={requiredLabelText(intl)}
              control={control}
              // value={data?.lastName}
              errorText={intl.error(formState.errors.lastName)}
              labelText={intl.msg('RegistrationForm.YourLastname', 'Your last name')}
              placeholderText={intl.msg('RegistrationForm.Lastname', 'Last name')}
            />
          )}
        </FieldRow>
      )}

      {fields.includes('email') && (
        <Field>
          <TextInput
            id={`${idPrefix}_email`}
            {...register('email', { required: true, minLength: 6 })}
            isRequired={isRequired(schema, 'email', true)}
            requiredLabelText={requiredLabelText(intl)}
            type="email"
            control={control}
            value={data?.email}
            errorText={intl.error(formState.errors.email)}
            labelText={intl.msg('RegistrationForm.YouremailAddress', 'Your email address')}
            placeholderText={intl.msg('RegistrationForm.emailAddress', 'Email address')}
          />
        </Field>
      )}

      {fields.includes('password') && (
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
            labelText={intl.msg('RegistrationForm.Password', 'Password')}
            placeholderText={intl.msg('RegistrationForm.Password', 'Password')}
          />
        </Field>
      )}

      {fields.includes('confirmPassword') && (
        <Field>
          <TextInput
            id={`${idPrefix}_confirmPassword`}
            {...register('confirmPassword', { required: true, minLength: 6 })}
            isRequired={isRequired(schema, 'confirmPassword', true)}
            requiredLabelText={requiredLabelText(intl)}
            type="password"
            control={control}
            value={data?.confirmPassword}
            errorText={intl.error(formState.errors.confirmPassword)}
            labelText={intl.msg('RegistrationForm.ConfirmPassword', 'Confirm Password')}
            placeholderText={intl.msg('RegistrationForm.ConfirmPassword', 'Confirm Password')}
          />
        </Field>
      )}

      {fields.includes('title') && (
        <Field>
          <Dropdown
            id={`${idPrefix}_title`}
            {...register('title')}
            control={control}
            isRequired={isRequired(schema, 'title', false)}
            requiredLabelText={requiredLabelText(intl)}
            value={data?.title}
            labelText={intl.msg('RegistrationForm.Title', 'Title')}
            placeholderText={intl.msg('RegistrationForm.Title', 'Title')}
            items={titles}
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
              labelText={intl.msg('RegistrationForm.YourPhonenumber', 'Your phone number')}
              placeholderText={intl.msg('RegistrationForm.phonenumber', 'Phone number')}
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
              labelText={intl.msg('RegistrationForm.YourPhonenumber', 'Your phone number')}
              placeholderText={intl.msg('RegistrationForm.phonenumber', 'Phone number')}
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
              loadItems={addressSearch!.search}
            />
          </Field>
        </FieldPanel>
      )}

      {fields.includes('address1') && (
        <FieldPanel title={intl.msg('RegistrationForm.Address', 'Address')}>
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
                labelText={intl.msg('RegistrationForm.YourAddress', 'Your address')}
                placeholderText={intl.msg('RegistrationForm.Address', 'Address')}
              />
            </Field>
          )}

          {fields.includes('address2') && (
            <Field>
              <TextInput
                id={`${idPrefix}_address2`}
                {...register('address2', { minLength: 3 })}
                isRequired={isRequired(schema, 'address2', false)}
                requiredLabelText={requiredLabelText(intl)}
                control={control}
                value={data?.address2}
                labelText={intl.msg('address2.label', 'Additional address line')}
                errorText={intl.error(formState.errors.address2)}
                placeholderText={intl.msg('address2.placeholder', 'Address line 2')}
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
                    labelText={intl.msg('RegistrationForm.Country', 'Country')}
                    placeholderText={intl.msg('RegistrationForm.Country', 'Country')}
                  />
                </Field>
              )}

              {countries !== undefined && (
                <Field>
                  <Dropdown
                    id={`${idPrefix}_country`}
                    {...register('country')}
                    control={control}
                    isRequired={isRequired(schema, 'country', false)}
                    requiredLabelText={requiredLabelText(intl)}
                    value={data?.country}
                    errorText={intl.error(formState.errors.country)}
                    labelText={intl.msg('RegistrationForm.Country', 'Country')}
                    placeholderText={intl.msg('RegistrationForm.Country', 'Country')}
                    items={countries}
                  />
                </Field>
              )}
            </>
          )}

          {(fields.includes('city') || fields.includes('state') || fields.includes('zip')) && (
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
                  labelText={intl.msg('RegistrationForm.City', 'City')}
                  placeholderText={intl.msg('RegistrationForm.City', 'City')}
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
                      labelText={intl.msg('RegistrationForm.Stateprovince', 'State/province')}
                      placeholderText={intl.msg('RegistrationForm.Stateprovince', 'State/province')}
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
                  labelText={intl.msg('RegistrationForm.Postalzipcode', 'Postal/Zip Code')}
                  placeholderText={intl.msg('RegistrationForm.Postalzipcode', 'Postal/Zip Code')}
                />
              )}
            </FieldRow>
          )}
        </FieldPanel>
      )}

      {(fields.includes('termsAndConditions') || fields.includes('integrityPolicy')) && (
        <Field>
          {fields.includes('integrityPolicy') && (
            <Checkbox
              id={`${idPrefix}_integrityPolicy`}
              {...register('integrityPolicy', { required: true })}
              control={control}
              isRequired={isRequired(schema, 'integrityPolicy', true)}
              requiredLabelText={requiredLabelText(intl)}
              value={data?.integrityPolicy}
              labelText={intl.msg(
                'integrityPolicy.label',
                'I´ve read and agreed to <link>our integrity policy</link>',
                {
                  // eslint-disable-next-line jsx-a11y/anchor-is-valid, no-restricted-syntax
                  link: str => (
                    <a key="integrityPolicy" href={integrityPolicyLink}>
                      {str}
                    </a>
                  )
                }
              )}
              errorText={intl.error(formState.errors.integrityPolicy)}
            />
          )}

          {fields.includes('termsAndConditions') && (
            <Checkbox
              id={`${idPrefix}_termsAndConditions`}
              {...register('termsAndConditions', { required: true })}
              control={control}
              isRequired={isRequired(schema, 'termsAndConditions', true)}
              requiredLabelText={requiredLabelText(intl)}
              value={data?.termsAndConditions}
              labelText={intl.msg(
                'RegistrationForm.Aggrement',
                'I´ve read and agreed to <link>our terms and conditions</link>',
                {
                  // eslint-disable-next-line jsx-a11y/anchor-is-valid, no-restricted-syntax
                  link: str => (
                    <a key="termsAndConditions" href={termsAndConditionsLink}>
                      {str}
                    </a>
                  )
                }
              )}
              errorText={intl.error(formState.errors.termsAndConditions)}
            />
          )}
        </Field>
      )}

      {fields.includes('communicationPreference') && (
        <Field>
          <RadioButtonGroup
            id={`${idPrefix}_communicationPreference`}
            {...register('communicationPreference', { required: true })}
            control={control}
            value={data?.communicationPreference}
            isRequired={isRequired(schema, 'communicationPreference', true)}
            requiredLabelText={requiredLabelText(intl)}
            labelText={intl.msg('communicationPreference.label', 'Communication preferences')}
            errorText={intl.error(formState.errors.communicationPreference)}
            items={[
              {
                value: 'sms',
                name: intl.msg('communicationPreference.sms', 'SMS')
              },
              {
                value: 'email',
                name: intl.msg('communicationPreference.email', 'Email')
              }
            ]}
          />
        </Field>
      )}

      {children}
    </BaseForm>
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
  renderBody?: (state: any) => React.ReactElement;
  mode?: Mode;
  schema?: ObjectSchema;
  data?: Data;
  fields?: string[];
  titles?: {
    name: string;
    value: string;
  }[];
  integrityPolicyLink?: string;
  termsAndConditionsLink?: string;
  idPrefix?: string;
  addressSearch?: AddressSearch;
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
  name?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  title?: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
  address1?: string;
  address2?: string;
  city?: string;
  zip?: string;
  country?: string;
  province?: string;
  integrityPolicy?: boolean;
  termsAndConditions?: boolean;
  communicationPreference?: string;
};

type AddressSearch = {
  search: (q: string) => Promise<any>;
  lookup: (q: string) => Promise<any>;
};
