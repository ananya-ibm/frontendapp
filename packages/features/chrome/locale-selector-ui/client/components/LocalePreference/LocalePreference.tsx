/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useState, useEffect, useRef } from 'react';
import { Flag } from '@exo/frontend-components-core';
import { Action, Modal } from '@exo/frontend-components-base';
import { BaseForm, Dropdown, Field, requiredLabelText } from '@exo/frontend-components-forms';
import { useForm } from 'react-hook-form';
import { useIntl } from '@exo/frontend-common-i18n';

const byISOCodeOrFirst = <T extends { isoCode: string }>(entries: T[], code: string): T =>
  entries.find((e) => e.isoCode === code) ?? entries[0];

const getValidCountry = (countries: Country[], country: string) =>
  byISOCodeOrFirst(countries, country);

const getValidLanguage = (countries: Country[], country: string, language: string) =>
  byISOCodeOrFirst(getValidCountry(countries, country)?.languages ?? [], language);

const getValidCurrency = (countries: Country[], country: string, currency: string) =>
  byISOCodeOrFirst(getValidCountry(countries, country)?.currencies ?? [], currency);

export const LocalePreference = ({
  countries,
  onSave,
  onClose,
  country = 'US',
  language = 'en',
  currency = 'USD'
}: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const intl = useIntl('localePreference');

  const { setValue, register, handleSubmit, formState, control, watch, reset } = useForm({
    mode: 'onChange'
  });

  const [selectedCountry, setCountry] = useState<string>('');
  const [selectedLanguage, setLanguage] = useState<string>('');
  const [selectedCurrency, setCurrency] = useState<string>('');

  const formData = watch();

  const updateState = (newCountry, newLanguage, newCurrency) => {
    const c = getValidCountry(countries, newCountry)?.isoCode ?? 'US';
    if (c !== selectedCountry) setCountry(c);
    if (c !== formData.country) setValue('country', c);

    const l = getValidLanguage(countries, newCountry, newLanguage)?.isoCode ?? 'en';
    if (l !== selectedLanguage) setLanguage(l);
    if (l !== formData.language) setValue('language', l);

    const cur = getValidCurrency(countries, newCountry, newCurrency)?.isoCode ?? 'USD';
    if (cur !== selectedCurrency) setCurrency(cur);
    if (cur !== formData.currency) setValue('currency', cur);
  };

  useEffect(
    () => updateState(formData.country, formData.language, formData.currency),
    [formData.country, formData.language, formData.currency]
  );
  useEffect(() => updateState(country, language, currency), [country, language, currency]);

  return (
    <>
      <Modal
        isOpen
        aria-label="modal"
        title="Set your Country, Language and Currency Preferences"
        buttons={[
          {
            label: 'Save',
            onClick: () => {
              // commented this as RequestSubmit does not submit the form for Safari.
              //  formRef.current!.requestSubmit();
              onSave({
                country: formData.country,
                currency: formData.currency,
                language: formData.language
              });

              onClose();
            }
          },

          { label: 'Cancel', onClick: () => onClose() }
        ]}
        onClose={() => onClose()}
      >
        <BaseForm
          ref={formRef}
          form={{ reset, handleSubmit, formState }}
          renderFooter={() => undefined}
        >
          <Field>
            <Dropdown
              id="country_dropdown"
              {...register('country')}
              control={control}
              value={selectedCountry}
              isRequired={true}
              requiredLabelText={requiredLabelText(intl)}
              labelText={intl.msg('country.label', 'Select your country')}
              items={countries.map((c) => ({ name: c.name, value: c.isoCode })) ?? []}
            />
          </Field>

          <Field>
            <Dropdown
              id="language_dropdown"
              {...register('language')}
              control={control}
              value={selectedLanguage}
              isRequired={true}
              requiredLabelText={requiredLabelText(intl)}
              labelText={intl.msg('language.label', 'Select your language')}
              items={
                countries
                  ?.find((c) => c.isoCode === selectedCountry)
                  ?.languages?.map((c) => ({ name: c.name, value: c.isoCode })) ?? []
              }
            />
          </Field>

          <Field>
            <Dropdown
              id="currency_dropdown"
              {...register('currency')}
              control={control}
              value={selectedCurrency}
              isRequired={true}
              requiredLabelText={requiredLabelText(intl)}
              labelText={intl.msg('currency.label', 'Select your currency')}
              items={
                countries
                  .find((c) => c.isoCode === selectedCountry)
                  ?.currencies?.map((c) => ({ name: c.name, value: c.isoCode })) ?? []
              }
            />
          </Field>
        </BaseForm>
      </Modal>
    </>
  );
};

LocalePreference.Skeleton = () => {
  return (
    <>
      <Action onClick={() => {}} label="..." icon={<Flag.Skeleton />} />
    </>
  );
};

type Country = {
  name: string;
  isoCode: string;
  languages?: {
    name: string;
    isoCode: string;
  }[];
  currencies?: {
    name: string;
    isoCode: string;
  }[];
};

type Props = {
  countries: Country[];
  country?: string;
  language?: string;
  currency?: string;
  onSave: (args: { country: string; language: string; currency: string }) => void;
  onClose: () => void;
};
